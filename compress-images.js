const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const inputDirs = ['public/images', 'public/images/gallery'];
const outputBaseDir = 'public/images-compressed';

// Ensure output directories exist
if (!fs.existsSync(outputBaseDir)) {
  fs.mkdirSync(outputBaseDir);
}
if (!fs.existsSync(path.join(outputBaseDir, 'gallery'))) {
  fs.mkdirSync(path.join(outputBaseDir, 'gallery'));
}

// Function to get all image files in a directory
async function getImageFiles(dir) {
  try {
    const files = fs.readdirSync(dir);
    return files
      .filter(file => 
        /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(file) && 
        fs.statSync(path.join(dir, file)).isFile()
      )
      .map(file => path.join(dir, file));
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
}

async function processImage(inputPath) {
  try {
    const filename = path.basename(inputPath);
    const isInGallery = inputPath.includes('gallery');
    
    // Determine output path based on whether it's in gallery subfolder
    const outputPath = isInGallery 
      ? path.join(outputBaseDir, 'gallery', filename.replace(/\.[^.]+$/, '.webp'))
      : path.join(outputBaseDir, filename.replace(/\.[^.]+$/, '.webp'));
    
    console.log(`Processing: ${inputPath} -> ${outputPath}`);
    
    // Install sharp if needed
    try {
      await execPromise('npx -y sharp');
    } catch (err) {
      console.log('Installing sharp...');
      await execPromise('npm install sharp --no-save');
    }
    
    // Use sharp via npx to ensure it's installed
    const sharpCommand = `npx sharp -i "${inputPath}" -o "${outputPath}" --format webp --quality 80`;
    await execPromise(sharpCommand);
    
    // Get file sizes for comparison
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savingsPercent = ((inputSize - outputSize) / inputSize * 100).toFixed(2);
    
    console.log(`Compressed ${filename}: ${(inputSize/1024/1024).toFixed(2)}MB -> ${(outputSize/1024/1024).toFixed(2)}MB (${savingsPercent}% savings)`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err);
  }
}

async function main() {
  try {
    console.log('Starting image compression...');
    
    // Process all images
    for (const dir of inputDirs) {
      console.log(`Processing directory: ${dir}`);
      
      // Find all image files
      const imageFiles = await getImageFiles(dir);
      console.log(`Found ${imageFiles.length} images in ${dir}`);
      
      // Process each image
      for (const file of imageFiles) {
        await processImage(file);
      }
    }
    
    console.log('Image compression completed!');
  } catch (err) {
    console.error('Error:', err);
  }
}

main(); 