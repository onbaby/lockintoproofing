#!/bin/bash

# List of all service pages
SERVICE_PAGES=(
  "app/services/roof-replacement/page.tsx"
  "app/services/roof-repairs/page.tsx"
  "app/services/gutter-repairs/page.tsx"
  "app/services/gutter-installation/page.tsx"
  "app/services/gutter-guards/page.tsx"
  "app/services/bathroom-remodeling/page.tsx"
  "app/services/flooring/page.tsx"
  "app/services/painting/page.tsx"
  "app/services/tiling/page.tsx"
  "app/services/siding/page.tsx"
  "app/services/roof-inspection/page.tsx"
)

# Function to update a file
update_file() {
  local file=$1
  
  # First, remove any existing Footer imports
  sed -i '' '/import Footer from/d' "$file"
  
  # Add Footer import after the last import statement
  sed -i '' '/^import/ {
    :a
    n
    /^import/ba
    i\
import Footer from "@/components/Footer"
  }' "$file"
  
  # Replace footer section with Footer component
  sed -i '' '/<footer/,/<\/footer>/c\
      <Footer handleAnchorClick={handleAnchorClick} />' "$file"
}

# Update each service page
for page in "${SERVICE_PAGES[@]}"; do
  if [ -f "$page" ]; then
    echo "Updating $page..."
    update_file "$page"
  else
    echo "Warning: $page not found"
  fi
done

echo "Done updating service pages with new Footer component" 