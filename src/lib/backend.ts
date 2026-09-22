/**
 * Backend — نقطة توافق خلفية (compatibility barrel)
 * كل المنطق الحقيقي مفصول معياريًا في lib/api/*.
 * الملفات القديمة التي تستورد من هنا تعمل دون تغيير.
 */

export * from "./api/auth";
export * from "./api/catalog";
export * from "./api/profile";
export * from "./api/penalty";
