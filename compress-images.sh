#!/bin/bash

# Create output directories
mkdir -p public/images-compressed
mkdir -p public/images-compressed/gallery

# Process main images directory
echo "Processing images in public/images..."
for img in public/images/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
  if [ -f "$img" ]; then
    filename=$(basename "$img")
    extension="${filename##*.}"
    filename="${filename%.*}"
    output_path="public/images-compressed/${filename}.webp"
    
    echo "Converting $img to $output_path"
    convert "$img" -strip -quality 80% "$output_path"
    
    # Print size comparison
    original_size=$(du -h "$img" | cut -f1)
    new_size=$(du -h "$output_path" | cut -f1)
    echo "Compressed: $original_size → $new_size"
  fi
done

# Process gallery directory
echo "Processing images in public/images/gallery..."
for img in public/images/gallery/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
  if [ -f "$img" ]; then
    filename=$(basename "$img")
    extension="${filename##*.}"
    filename="${filename%.*}"
    output_path="public/images-compressed/gallery/${filename}.webp"
    
    echo "Converting $img to $output_path"
    convert "$img" -strip -quality 80% "$output_path"
    
    # Print size comparison
    original_size=$(du -h "$img" | cut -f1)
    new_size=$(du -h "$output_path" | cut -f1)
    echo "Compressed: $original_size → $new_size"
  fi
done

echo "Image compression completed!" 