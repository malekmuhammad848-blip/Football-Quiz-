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
