#!/bin/bash

# Install required tools if not already installed
if ! command -v cwebp &> /dev/null; then
    echo "Installing webp tools..."
    brew install webp
fi

# Create compressed directory if it doesn't exist
mkdir -p public/images-compressed

# Function to compress an image
compress_image() {
    local input=$1
    local output=$2
    local quality=$3
    
    echo "Compressing $input..."
    cwebp -q $quality "$input" -o "$output"
}

# Compress each image with appropriate quality settings
compress_image "public/images/paintingjob.webp" "public/images-compressed/paintingjob.webp" 80
compress_image "public/images/roofrepair.webp" "public/images-compressed/roofrepair.webp" 80
compress_image "public/images/gutterinstall.webp" "public/images-compressed/gutterinstall.webp" 80
compress_image "public/images/roofreplacement.webp" "public/images-compressed/roofreplacement.webp" 80
compress_image "public/images/bathroom-remodeling.webp" "public/images-compressed/bathroom-remodeling.webp" 80
compress_image "public/images/flooring-installation.webp" "public/images-compressed/flooring-installation.webp" 80
compress_image "public/images/new-logo.webp" "public/images-compressed/new-logo.webp" 90
compress_image "public/images/logowhiteversion.webp" "public/images-compressed/logowhiteversion.webp" 90

echo "Compression complete!" 