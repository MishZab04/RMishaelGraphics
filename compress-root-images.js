const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

sharp.cache(false);
sharp.concurrency(1);

const publicDir = "public";

async function compressRootImages() {
  try {
    const files = fs.readdirSync(publicDir);
    
    for (const file of files) {
      if (/\.(png|jpg|jpeg)$/i.test(file)) {
        const inputPath = path.join(publicDir, file);
        const outputName = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");
        const outputPath = path.join(publicDir, outputName);
        
        try {
          await sharp(inputPath, { limitInputPixels: false })
            .resize({
              width: 2000,
              withoutEnlargement: true,
              fit: "inside"
            })
            .rotate()
            .webp({ quality: 80 })
            .toFile(outputPath);
          
          console.log(`✓ Compressed: ${file} → ${outputName}`);
          
          // Remove original file
          fs.unlinkSync(inputPath);
          console.log(`  Deleted original: ${file}`);
        } catch (err) {
          console.log(`❌ Skipped ${file}: ${err.message}`);
        }
      }
    }
    
    console.log("✓ DONE! Root images optimized!");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

compressRootImages();
