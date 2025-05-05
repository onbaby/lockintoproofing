#!/bin/bash

# Check if backup directory exists
if [ ! -d "public/images/originals" ]; then
  echo "Error: Backup directory public/images/originals not found."
  echo "Original images may not have been backed up."
  exit 1
fi

# Array of images to restore
declare -a test_images=(
  "tiling.jpeg"
  "roofrepair.jpeg" 
  "guards.jpeg"
  "replacement.jpeg"
  "gutterinstall.jpeg"
)

echo "Restoring original images..."

for img in "${test_images[@]}"; do
  # Check if backup image exists
  if [ -f "public/images/originals/$img" ]; then
    # Restore original
    echo "Restoring: public/images/originals/$img to public/images/$img"
    cp "public/images/originals/$img" "public/images/$img"
    
    # Get base name without extension
    base_name="${img%.*}"
    
    # Remove WebP version if it exists
    if [ -f "public/images/$base_name.webp" ]; then
      echo "Removing: public/images/$base_name.webp"
      rm "public/images/$base_name.webp"
    fi
  else
    echo "Warning: Backup for $img not found in public/images/originals/. Cannot restore."
  fi
done

echo ""
echo "Original images have been restored."
echo "Remember to change image extensions back to their original types in your code."
echo "Files that were modified:"
echo "- app/services/gutter-guards/page.tsx"
echo "- app/services/gutter-guards/metadata.ts"
echo "- app/services/roof-replacement/page.tsx"
echo "- app/page.tsx"
echo "- app/services/tiling/metadata.ts"
echo "- app/services/tiling/page.tsx" 