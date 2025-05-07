"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import Footer from "../components/Footer"
import ServicePageHeader from "../components/ServicePageHeader"

export default function SitemapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ServicePageHeader />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="mb-8 flex items-center text-blue-500 hover:text-blue-600">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold mb-8">Site Map</h1>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Main Pages */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Main Pages</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-blue-600 hover:text-blue-800">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="text-blue-600 hover:text-blue-800">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-blue-600 hover:text-blue-800">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Services</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/services/roof-repairs" className="text-blue-600 hover:text-blue-800">
                    Roof Repairs
                  </Link>
                </li>
                <li>
                  <Link href="/services/roof-replacement" className="text-blue-600 hover:text-blue-800">
                    Roof Replacement
                  </Link>
                </li>
                <li>
                  <Link href="/services/bathroom-remodeling" className="text-blue-600 hover:text-blue-800">
                    Bathroom Remodeling
                  </Link>
                </li>
                <li>
                  <Link href="/services/kitchen-remodeling" className="text-blue-600 hover:text-blue-800">
                    Kitchen Remodeling
                  </Link>
                </li>
                <li>
                  <Link href="/services/water-damage-restoration" className="text-blue-600 hover:text-blue-800">
                    Water Damage Restoration
                  </Link>
                </li>
                <li>
                  <Link href="/services/storm-damage-repair" className="text-blue-600 hover:text-blue-800">
                    Storm Damage Repair
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information Pages */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Information</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/#how-it-works" className="text-blue-600 hover:text-blue-800">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/#testimonials" className="text-blue-600 hover:text-blue-800">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/#gallery" className="text-blue-600 hover:text-blue-800">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-blue-600 hover:text-blue-800">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 