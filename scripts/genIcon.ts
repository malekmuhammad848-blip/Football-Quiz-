/**
 * genIcon — يولّد أيقونات TiQ من src/assets/icon.svg عبر sharp
 * يكتب public/icon.png + icon.png + resources-icon-1024.png (كلها مطابقة 1024×1024)
 * التشغيل: bun scripts/genIcon.ts
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";

const svg = readFileSync("src/assets/icon.svg", "utf8");

const buf = await sharp(Buffer.from(svg), { density: 96 })
  .resize(1024, 1024)
  .png()
  .toBuffer();

await sharp(buf).toFile("public/icon.png");
await sharp(buf).toFile("icon.png");
await sharp(buf).toFile("resources-icon-1024.png");

// تحقق من ألوان البكسلات
const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
const px = (x: number, y: number) => {
  const i = (y * info.width + x) * info.channels;
  return [data[i]!, data[i + 1]!, data[i + 2]!];
};

const bg = px(512, 995);
const border = px(28, 512);
const white = px(285, 850);
const green = px(728, 640);
const gold = px(512, 118);

console.log({ bg, border, white, green, gold });
console.log(
  white[0]! > 200 && white[1]! > 200 && green[1]! > 180
    ? "✅ الأيقونة الثلاثية جاهزة (public + root + resources)"
    : "💥 الألوان غير متطابقة",
);
