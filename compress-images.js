const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

sharp.cache(false);
sharp.concurrency(1);

const inputDir = "public/portfolio";
const outputDir = "public/optimized";

function getImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getImages(filePath));
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      results.push(filePath);
    }
  });

  return results;
}

async function compress() {
  const images = getImages(inputDir);

  console.log(`Found ${images.length} images`);

  for (const img of images) {
    try {
      const relativePath = path.relative(inputDir, img);
      const outputPath = path.join(
        outputDir,
        relativePath.replace(/\.(jpg|jpeg|png)$/i, ".webp")
      );

      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      await sharp(img, { limitInputPixels: false })
        .resize({
          width: 1600,
          withoutEnlargement: true,
          fit: "inside"
        })
        .rotate()
        .webp({ quality: 75 })
        .toFile(outputPath);

      console.log("Compressed:", img);

    } catch (err) {
      console.log("❌ Skipped:", img);
    }
  }

  console.log("DONE 🚀 All images optimized!");
}

compress();