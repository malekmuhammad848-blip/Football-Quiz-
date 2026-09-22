/**
 * API Facade — بوابة موحّدة لكل طبقة البيانات
 * المكونات تستورد من هنا فقط — لا أحد يلمس Supabase مباشرة.
 * المعيارية: كل مجال في ملفه (auth / catalog / profile / penalty).
 */

export * from "./auth";
export * from "./catalog";
export * from "./profile";
export * from "./penalty";
