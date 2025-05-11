#!/bin/bash

# Create a backup directory if it doesn't exist
mkdir -p public/images/originals

# Array of images to test (these had the largest size reductions)
declare -a test_images=(
  "tiling.jpeg"
  "roofrepair.jpeg" 
  "guards.jpeg"
  "replacement.jpeg"
  "gutterinstall.jpeg"
)

echo "Replacing selected images with compressed WebP versions..."

for img in "${test_images[@]}"; do
  # Check if original image exists
  if [ -f "public/images/$img" ]; then
    # Create backup of original
    echo "Backing up: public/images/$img to public/images/originals/$img"
    cp "public/images/$img" "public/images/originals/$img"
    
    # Get base name without extension
    base_name="${img%.*}"
    
    # Copy the WebP version to replace the original
    echo "Replacing with compressed version: $base_name.webp"
    cp "public/images-compressed/$base_name.webp" "public/images/$base_name.webp"
    
    # Get file sizes for comparison
    original_size=$(du -h "public/images/originals/$img" | cut -f1)
    new_size=$(du -h "public/images/$base_name.webp" | cut -f1)
    echo "Replaced: $original_size → $new_size"
  else
    echo "Warning: public/images/$img not found. Skipping."
  fi
done

echo ""
echo "Now you need to update your code to reference .webp instead of the original extensions."
echo "Here are the files you need to modify:"
echo "- app/services/gutter-guards/page.tsx: change guards.jpeg to guards.webp"
echo "- app/services/gutter-guards/metadata.ts: change guards.jpeg to guards.webp"
echo "- app/services/roof-replacement/page.tsx: change replacement.jpeg to replacement.webp"
echo "- app/page.tsx: change roofrepair.jpeg, gutterinstall.jpeg to .webp"
echo "- app/services/tiling/metadata.ts: change tiling.jpeg to tiling.webp"
echo "- app/services/tiling/page.tsx: change tiling.jpeg to tiling.webp"
echo ""
echo "After testing, run restore-original-images.sh to revert these changes." 