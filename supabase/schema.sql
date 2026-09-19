-- =============================================================
-- Football Quiz — مخطط قاعدة البيانات (Supabase / Postgres)
-- شغّل هذا الملف كاملًا في: Supabase Dashboard > SQL Editor
-- =============================================================

-- 1) جدول الملفات الشخصية (سجل واحد لكل مستخدم)
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  display_name  text,
  streak        integer not null default 0,
  best          integer not null default 0,
  correct_count integer not null default 0,
  played_count  integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 2) إنشاء صف تلقائيًا عند تسجيل مستخدم جديد
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, split_part(new.email, '@', 1))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3) سجل الإجابات اليومية (سجل واحد لكل مستخدم/يوم)
create table if not exists public.daily_answers (
  user_id    uuid not null references auth.users(id) on delete cascade,
  answer_day date not null,
  selected   integer not null,
  is_correct boolean not null,
  primary key (user_id, answer_day)
);

-- 4) تفعيل أمان الصفوف (RLS)
alter table public.profiles enable row level security;
alter table public.daily_answers enable row level security;

create policy "users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "users read own answers"
  on public.daily_answers for select
  using (auth.uid() = user_id);

create policy "users insert own answers"
  on public.daily_answers for insert
  with check (auth.uid() = user_id);

create policy "users update own answers"
  on public.daily_answers for update
  using (auth.uid() = user_id);

-- 5) فهرس مفيد
create index if not exists daily_answers_user_day_idx
  on public.daily_answers (user_id, answer_day desc);

-- 6) لوحة الترتيب الأسبوعي (محسوبة من profiles)
create or replace view public.weekly_leaderboard
with (security_invoker = true) as
select
  p.id           as user_id,
  coalesce(p.display_name, split_part(p.email, '@', 1)) as display_name,
  p.streak,
  p.best,
  p.correct_count,
  p.played_count,
  rank() over (order by p.correct_count desc, p.streak desc) as pos
from public.profiles p;

grant select on public.weekly_leaderboard to authenticated;

-- =============================================================
-- v4 — الترجيح الحي + الفعاليات + التخصيص الديناميكي
-- =============================================================

-- 7) بنك أسئلة الترجيح (ديناميكي بالكامل — يُدار من لوحة Supabase)
create table if not exists public.penalty_questions (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  active     boolean not null default true,
  difficulty text not null default 'medium' check (difficulty in ('easy','medium','hard')),
  ar_q text not null, ar_a text not null, ar_b text not null, ar_c text not null, ar_d text not null,
  en_q text not null, en_a text not null, en_b text not null, en_c text not null, en_d text not null,
  correct    smallint not null check (correct between 1 and 4)
);
create index if not exists penalty_questions_active_idx on public.penalty_questions (active) where active;

-- 8) غرف المباريات (ترجيح 1v1 في الزمن الحقيقي)
create table if not exists public.penalty_rooms (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  status        text not null default 'waiting' check (status in ('waiting','shooting','finished','abandoned')),
  -- اللاعبان
  p1            uuid not null references auth.users(id) on delete cascade,
  p1_name       text not null default 'Player 1',
  p1_score      integer not null default 0,
  p1_answer     smallint,
  p1_time_ms    integer,
  -- اللاعب الثاني (يمتلئ عند الانضمام)
  p2            uuid references auth.users(id) on delete cascade,
  p2_name       text,
  p2_score      integer not null default 0,
  p2_answer     smallint,
  p2_time_ms    integer,
  -- السؤال الحالي وسلسلة الأسئلة
  question_id   uuid references public.penalty_questions(id),
  question_ids  uuid[] not null default '{}',
  round         smallint not null default 1,
  total_rounds  smallint not null default 5,
  deadline      timestamptz,          -- نهاية نافذة التسديد (5 ثوانٍ)
  winner        uuid references auth.users(id)
);
create index if not exists penalty_rooms_waiting_idx on public.penalty_rooms (status, created_at);
create index if not exists penalty_rooms_players_idx on public.penalty_rooms (p1, p2);

-- 9) إحصائيات الترجيح لكل لاعب
create table if not exists public.penalty_stats (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  wins       integer not null default 0,
  losses     integer not null default 0,
  shots      integer not null default 0,
  goals      integer not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.penalty_stats enable row level security;
create policy "penalty stats readable by all"
  on public.penalty_stats for select using (true);
create policy "penalty stats writable by owner"
  on public.penalty_stats for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 10) RLS للغرف: اللاعبان فقط يرaban غرفتهما؛ القارئ العام يرى الغرف المنتظرة
alter table public.penalty_rooms enable row level security;
create policy "anyone can read rooms"
  on public.penalty_rooms for select using (true);
create policy "creator inserts room"
  on public.penalty_rooms for insert with check (auth.uid() = p1);
create policy "players update their room"
  on public.penalty_rooms for update
  using (auth.uid() = p1 or auth.uid() = p2)
  with check (auth.uid() = p1 or auth.uid() = p2);

-- 11) الفعاليات والجوائز الأسبوعية (تُدار من لوحة Supabase — لا تحديث تطبيق)
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  active      boolean not null default true,
  kind        text not null default 'tournament' check (kind in ('tournament','challenge','reward','season')),
  title_ar    text not null,
  title_en    text not null,
  desc_ar     text,
  desc_en     text,
  emoji       text not null default '🏆',
  accent      text not null default '#fbbf24',
  starts_at   timestamptz not null default now(),
  ends_at     timestamptz not null default now() + interval '7 days',
  reward_ar   text,
  reward_en   text,
  cta_label_ar text default 'شارك الآن',
  cta_label_en text default 'Join now'
);
create index if not exists events_active_idx on public.events (active, starts_at, ends_at);

-- 12) التخصيص الديناميكي: أفاتارات وتاغات (كتالوجات من قاعدة البيانات)
create table if not exists public.avatar_catalog (
  id        text primary key,
  label_ar  text not null,
  label_en  text not null,
  emoji     text not null,
  min_xp    integer not null default 0,
  sort      integer not null default 0
);

create table if not exists public.tag_catalog (
  id        text primary key,
  label_ar  text not null,
  label_en  text not null,
  emoji     text not null default '🏷️',
  min_xp    integer not null default 0,
  sort      integer not null default 0
);

-- أعمدة اختيار المستخدم في profiles
alter table public.profiles
  add column if not exists avatar_id text,
  add column if not exists tag_id text,
  add column if not exists email text;

-- 13) سياسات كتالوجات التخصيص (قراءة عامة — لا كتابة من العميل)
alter table public.avatar_catalog enable row level security;
alter table public.tag_catalog enable row level security;
create policy "avatars public read" on public.avatar_catalog for select using (true);
create policy "tags public read" on public.tag_catalog for select using (true);
create policy "penalty questions public read" on public.penalty_questions for select using (active);
create policy "events public read" on public.events for select using (true);

-- السماح بقراءة البريد من الملفات للترتيب
create policy "profiles readable by all"
  on public.profiles for select using (true);

-- 14) دالة ربط المباراة ( matchmaking ) — تبحث عن غرفة منتظرة أو تنشئ غرفة
create or replace function public.join_penalty_queue(p_name text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_room penalty_rooms;
  v_id uuid;
begin
  if v_uid is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  -- هل اللاعب في غرفة نشطة بالفعل؟
  select * into v_room from public.penalty_rooms
  where (p1 = v_uid or p2 = v_uid) and status in ('waiting','shooting')
  order by created_at desc limit 1;
  if found then
    return v_room.id;
  end if;

  -- انضم لغرفة منتظرة من لاعب آخر (أقدم غرفة)
  select * into v_room from public.penalty_rooms
  where status = 'waiting' and p1 <> v_uid
  order by created_at asc
  for update skip locked
  limit 1;

  if found then
    update public.penalty_rooms
      set p2 = v_uid, p2_name = p_name, status = 'shooting',
          question_ids = coalesce(
            (select array_agg(id) from (
              select id from public.penalty_questions where active order by random() limit 5
            ) s), '{}'),
          question_id = (select id from public.penalty_questions where active order by random() limit 1),
          round = 1,
          deadline = now() + interval '6 seconds'
    where id = v_room.id
    returning * into v_room;
    return v_room.id;
  end if;

  -- لا توجد غرفة — أنشئ غرفة منتظرة
  insert into public.penalty_rooms (p1, p1_name, status)
  values (v_uid, p_name, 'waiting')
  returning * into v_room;
  return v_room.id;
end;
$$;

-- 15) تسديد — يقرر الانتقال للجولة التالية/النهاية، ويعلن الفائز.
-- عند غرفة الحاسوب (p2 خالية) يحسب الحاسوب إجابته فورًا باحتمالية حسب الصعوبة.
create or replace function public.take_penalty_shot(room_id uuid, answer smallint, time_ms integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  r penalty_rooms;
  q penalty_questions;
  v_correct boolean;
  v_answer smallint := answer;
  v_bot_correct boolean;
  v_bot_answer smallint;
  v_winner uuid;
  v_next_q uuid;
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if;

  select * into r from public.penalty_rooms where id = room_id for update;
  if not found then raise exception 'ROOM_NOT_FOUND'; end if;
  if r.status <> 'shooting' then raise exception 'ROOM_NOT_ACTIVE'; end if;
  if r.p1 <> v_uid and (r.p2 is null or r.p2 <> v_uid) then raise exception 'NOT_A_PLAYER'; end if;
  if r.question_id is null then raise exception 'NO_QUESTION'; end if;

  select * into q from public.penalty_questions where id = r.question_id;

  -- تسديد متأخر عن المهلة = إخفاق
  if v_answer is not null and r.deadline is not null and now() > r.deadline then
    v_answer := null;
  end if;
  v_correct := v_answer is not null and q.correct = v_answer;

  if r.p1 = v_uid then
    if r.p1_answer is not null then raise exception 'ALREADY_ANSWERED'; end if;
    update public.penalty_rooms
      set p1_answer = v_answer, p1_time_ms = time_ms,
          p1_score = p1_score + (case when v_correct then 1 else 0 end)
    where id = room_id;
  else
    if r.p2_answer is not null then raise exception 'ALREADY_ANSWERED'; end if;
    update public.penalty_rooms
      set p2_answer = v_answer, p2_time_ms = time_ms,
          p2_score = p2_score + (case when v_correct then 1 else 0 end)
    where id = room_id;
  end if;

  -- إحصائيات التسديد
  insert into public.penalty_stats (user_id, shots, goals)
  values (v_uid, 1, (case when v_correct then 1 else 0 end))
  on conflict (user_id) do update
    set shots = penalty_stats.shots + 1,
        goals = penalty_stats.goals + (case when v_correct then 1 else 0 end),
        updated_at = now();

  -- إعادة قراءة الحالة
  select * into r from public.penalty_rooms where id = room_id;

  -- غرفة الحاسوب: الحاسوب "يسدد" مباشرة بعد اللاعب
  if r.p2 is null and r.p1_answer is not null then
    v_bot_correct := random() < (case q.difficulty when 'easy' then 0.75 when 'medium' then 0.55 else 0.40 end);
    if v_bot_correct then
      v_bot_answer := q.correct;
    else
      v_bot_answer := ((q.correct % 4) + 1);
    end if;
    update public.penalty_rooms
      set p2_answer = v_bot_answer, p2_time_ms = 1500,
          p2_score = p2_score + (case when v_bot_correct then 1 else 0 end)
    where id = room_id;
    select * into r from public.penalty_rooms where id = room_id;
  end if;

  -- الجولة تنتهي عندما يجيب اللاعبان
  if r.p1_answer is not null and r.p2_answer is not null then
    if r.round >= r.total_rounds then
      v_winner := case
        when r.p1_score > r.p2_score then r.p1
        when r.p2_score > r.p1_score then r.p2
        else null end;
      update public.penalty_rooms set winner = v_winner, status = 'finished' where id = room_id;
      if v_winner is not null then
        update public.penalty_stats set wins = wins + 1, updated_at = now() where user_id = v_winner;
        update public.penalty_stats set losses = losses + 1, updated_at = now()
          where user_id = case when v_winner = r.p1 then r.p2 else r.p1 end
          and user_id is not null;
      end if;
    else
      select id into v_next_q
      from public.penalty_questions
      where active and id <> r.question_id
      order by random() limit 1;
      update public.penalty_rooms
        set question_id = v_next_q, round = round + 1,
            p1_answer = null, p2_answer = null,
            p1_time_ms = null, p2_time_ms = null,
            deadline = now() + interval '6 seconds'
      where id = room_id;
    end if;
  end if;
end;
$$;

-- 16) جولة ترجيح ضد حاسوب TiQ — للعب الفوري بدون انتظار لاعب آخر
-- (p2 خالية = الحاسوب يسدد تلقائيًا داخل take_penalty_shot)
create or replace function public.start_bot_match(p_name text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_id uuid;
  v_qids uuid[];
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if;

  -- إنهاء أي غرفة قديمة عالقة لهذا اللاعب
  update public.penalty_rooms
    set status = 'abandoned'
    where (p1 = v_uid or p2 = v_uid) and status in ('waiting','shooting');

  select coalesce(array_agg(id), '{}') into v_qids
  from (select id from public.penalty_questions where active order by random() limit 5) s;

  insert into public.penalty_rooms (p1, p1_name, p2, p2_name, status, question_ids, question_id, round, deadline)
  values (v_uid, p_name, null, 'TiQ Bot', 'shooting', v_qids,
          (select id from public.penalty_questions where active order by random() limit 1),
          1, now() + interval '6 seconds')
  returning id into v_id;
  return v_id;
end;
$$;

-- 17) الإحصائيات العامة للترجيح (للبروفايل)
create or replace view public.penalty_leaderboard
with (security_invoker = true) as
select
  s.user_id,
  coalesce(p.display_name, 'Player') as display_name,
  s.wins, s.losses, s.shots, s.goals,
  case when s.shots > 0 then round(100.0 * s.goals / s.shots) else 0 end as goal_rate
from public.penalty_stats s
left join public.profiles p on p.id = s.user_id
order by s.wins desc, goal_rate desc;

grant select on public.penalty_leaderboard to authenticated;

-- 18) بيانات أولية: 12 سؤال ترجيح + 6 فعاليات + كتالوجات أفاتار وتاغ
insert into public.penalty_questions
  (difficulty, ar_q, ar_a, ar_b, ar_c, ar_d, en_q, en_a, en_b, en_c, en_d, correct)
values
  ('easy',   'من فاز بكأس العالم 2022؟','البرازيل','الأرجنتين','فرنسا','ألمانيا','Who won the 2022 World Cup?','Brazil','Argentina','France','Germany',2),
  ('easy',   'أي نادٍ يُلقّب بـ«الملكي»؟','برشلونة','ريال مدريد','بايرن ميونخ','أياكس','Which club is called "The Royal"?','Barcelona','Real Madrid','Bayern Munich','Ajax',2),
  ('medium', 'من سجل أسرع هدف في تاريخ كأس العالم؟','هاكوان شاكيري','كلينت ديمبسي','دافيد بياتي','فيلمينو','Who scored the fastest World Cup goal?','Hakan Yakin','Clint Dempsey','David Beckham','Falcão',3),
  ('medium', 'كم مرة فازت ألمانيا بكأس العالم؟','3','4','5','6','How many World Cups has Germany won?','3','4','5','6',2),
  ('medium', 'من مدرب مانشستر سيتي الحالي؟','جارديولا','كلوب','أنشيلوتي','تين هاج','Who is Man City''s current manager?','Guardiola','Klopp','Ancelotti','Ten Hag',1),
  ('medium', 'أي نادٍ يلعب في «أنفيلد»؟','إيفرتون','ليفربول','نيوكاسل','أستون فيلا','Which club plays at Anfield?','Everton','Liverpool','Newcastle','Aston Villa',2),
  ('hard',   'من أول لاعب يحصل على حذاء ذهبي في كأس العالم؟','رائد حذاء','لينيل ميسي','رونالدو','فريد باريكروز','First Golden Boot winner in World Cup?','Ronaldo','Lionel Messi','Cristiano Ronaldo','Guillermo Stábile',4),
  ('hard',   'كم عدد كؤوس دوري أبطال آسيا للهلال؟','4','8','9','10','How many AFC Champions League titles for Al-Hilal?','4','8','9','10',2),
  ('hard',   'من حارس مرمى اللمسة «يد الأفندي»؟','رينالدو','إيكر كاسياس','جيانلويجي بوفون','مانويل نوير','Who is "La Mano de Dios" goalkeeper?','Rinat Dasayev','Iker Casillas','Gianluigi Buffon','Manuel Neuer',3),
  ('easy',   'كم لاعبًا في فريق كرة القدم داخل الملعب؟','9','10','11','12','How many players per team on pitch?','9','10','11','12',3),
  ('easy',   'ما لون بطاقة الطرد؟','صفراء','حمراء','زرقاء','سوداء','What color is a sending-off card?','Yellow','Red','Blue','Black',2),
  ('medium', 'من فاز بأول نسخة من كأس العالم؟','الأوروغواي','البرازيل','إيطاليا','الأرجنتين','Who won the first World Cup?','Uruguay','Brazil','Italy','Argentina',1)
on conflict do nothing;

insert into public.events (kind, title_ar, title_en, desc_ar, desc_en, emoji, accent, starts_at, ends_at, reward_ar, reward_en, cta_label_ar, cta_label_en) values
  ('tournament','دوري الأسبوع الذهبي','Golden Week League','نافس هذا الأسبوع للوصول لقمة الترتيب الأسبوعي','Compete this week to top the weekly board','🏆','#fbbf24', now(), now() + interval '7 days','أول 3 مراكز يحصلون على شارة كأس ذهبي','Top 3 get a Golden Cup badge','شارك الآن','Join now'),
  ('challenge','تحدي الترجيح المثالي','Perfect Penalty Challenge','سجل 5 أهداف من 5 في الترجيح هذا الأسبوع','Score 5 goals from 5 shots this week','⚽','#34d399', now(), now() + interval '7 days','شارة «الهدّاف الآلي»','"Goal Machine" badge','ابدأ التحدي','Start challenge'),
  ('reward','جوائز السلسلة 7 أيام','7-Day Streak Rewards','أكمل سلسلة 7 أيام هذا الأسبوع لتفادي فقدان التقدم','Complete a 7-day streak this week','🔥','#fb923c', now(), now() + interval '7 days','×2 نقاط لكل إجابة','2× XP per answer','استمر','Keep going'),
  ('season','موسم الأساطير','Legends Season','ارفع نقاطك للمستوى الأقصى قبل نهاية الموسم','Push your XP to max level before season ends','👑','#a78bfa', now() + interval '3 days', now() + interval '30 days','دخول قاعة الأساطير','Legends Hall entry','تعرّف أكثر','Learn more'),
  ('challenge','تحدي الرماة','Sharp Shooters','أعلى دقة في الترجيح خلال 72 ساعة','Best penalty accuracy in 72 hours','🎯','#f472b6', now() + interval '1 day', now() + interval '4 days','تاغ «الرامي»','"Sniper" tag','انضم','Join'),
  ('tournament','كأس العرب','Arab Cup','قسم خاص للأسئلة العربية هذا الأسبوع','Special Arab-football questions this week','🌍','#38bdf8', now() + interval '2 days', now() + interval '9 days','شارة الكأس العربي','Arab Cup badge','شارك','Join')
on conflict do nothing;

insert into public.avatar_catalog (id, label_ar, label_en, emoji, min_xp, sort) values
  ('ball','كرة','Ball','⚽',0,1),
  ('gloves','قفازات','Gloves','🧤',50,2),
  ('boots','كعب ذهبي','Golden Boot','👟',150,3),
  ('whistle','صافرة','Whistle','🎵',300,4),
  ('shield','درع','Shield','🛡️',600,5),
  ('crown','تاج','Crown','👑',1200,6),
  ('dragon','تنين','Dragon','🐉',2500,7)
on conflict (id) do nothing;

insert into public.tag_catalog (id, label_ar, label_en, emoji, min_xp, sort) values
  ('rookie','مبتدئ','Rookie','🌱',0,1),
  ('scout','كشاف','Scout','🔍',100,2),
  ('captain','كابتن','Captain','🎖️',400,3),
  ('legend','أسطورة','Legend','⚡',1500,4)
on conflict (id) do nothing;
