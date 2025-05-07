import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Bathroom Remodeling Services | American Top Roofing",
  description: "Transform your bathroom with expert remodeling services from American Top Roofing, serving homeowners across Georgia. Get a free quote today!",
  keywords: ["bathroom remodeling", "bathroom renovation", "bathroom design", "shower replacement", "tub replacement", "vanity installation", "tile installation", "Georgia", "Atlanta", "Forsyth County", "Cumming", "Buford", "Suwanee", "Gainesville", "Alpharetta", "American Top Roofing"],
}

export default function BathroomRemodelingLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
} 