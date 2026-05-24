const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "public");
const exts = /\.(jpe?g|png)$/i;

function walk(dir) {
  return fs.readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) return walk(full);
    return exts.test(entry) ? [full] : [];
  });
}

async function run() {
  const images = walk(root);
  console.log(`Converting ${images.length} images to WebP...`);

  for (const img of images) {
    const out = img.replace(exts, ".webp");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(img, { limitInputPixels: false })
      .resize({ width: 1600, withoutEnlargement: true, fit: "inside" })
      .rotate()
      .webp({ quality: 75 })
      .toFile(out);
    console.log("Created", path.relative(root, out));
  }

  console.log("DONE");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
