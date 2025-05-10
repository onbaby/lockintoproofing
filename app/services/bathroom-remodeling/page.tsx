"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { PhoneCall, ChevronLeft } from "lucide-react"
import Footer from "../../components/Footer"
import Header from "@/app/components/Header"
import { MotionDiv } from "@/app/components/MotionWrappers"
import Script from "next/script"

// Add type declaration for the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'img-comparison-slider': any;
    }
  }
}

const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault(); // Prevent default link navigation

  // Check if it's an internal anchor link for the homepage
  if (href.startsWith('/#')) {
    const targetId = href.substring(2); // Get the ID part (e.g., "services")
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // If element exists on the current page (likely only on homepage itself), scroll smoothly
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If element doesn't exist on current page, navigate to the homepage URL with the hash
      // The browser will handle scrolling to the anchor upon loading the homepage.
      window.location.href = href; // e.g., navigate to '/#services'
    }
  } else if (href.startsWith('#')) {
    // Handle simple hash links for the *current* page
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth'});
    }
  } else {
    // Handle other links (like tel:) or potentially full page navigations
    window.location.href = href;
  }
};

export default function BathroomRemodelingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Use the main Header component */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/60 z-10" />
          {/* Use MotionDiv wrapper */}
          <MotionDiv
            className="relative z-20 container mx-auto px-4 py-24 text-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <MotionDiv {...fadeInUp}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                Bathroom Remodeling Services in Georgia
              </h1>
            </MotionDiv>
            <MotionDiv {...fadeInUp} transition={{ delay: 0.2, ...fadeInUp.transition }}>
              <p className="max-w-3xl mx-auto text-lg text-gray-200 sm:text-xl mb-8">
                Transform your bathroom into a beautiful, functional space with our professional remodeling services available statewide.
              </p>
            </MotionDiv>
            {/* Use MotionDiv wrapper */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                href="/#contact"
                className="rounded-md bg-blue-500 px-8 py-3 text-center text-lg font-bold text-white hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105"
              >
                GET A FREE QUOTE
              </Link>
            </MotionDiv>
          </MotionDiv>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image src="/images/bathroom-remodeling-service.webp" alt="Bathroom remodeling services in Georgia" fill className="object-cover" priority />
          </div>
        </section>

        {/* Main Content H1 */}
        <h1 className="sr-only">Bathroom Remodeling Services in Georgia - American Top Roofing and Restoration</h1>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Link href="/#services" className="mb-8 flex items-center text-blue-500 hover:text-blue-600">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to all services
            </Link>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Georgia Bathroom Remodeling Services</h2>
                <p className="text-gray-700 mb-4 text-lg">
                  At American Top Roofing and Restoration, we offer comprehensive bathroom remodeling services throughout Georgia to
                  transform your outdated or inefficient bathroom into a beautiful, functional space that meets your
                  needs and enhances your home's value.
                </p>
                <p className="text-gray-700 mb-4 text-lg">
                  Our experienced team handles every aspect of your bathroom renovation, from initial design consultation to final
                  installation, ensuring a seamless process and stunning results for homeowners across the state.
                </p>
                <h3 className="text-xl font-bold mt-8 mb-4">Our bathroom remodeling services include:</h3>
                <ul className="space-y-2 text-gray-700 mb-8 text-lg">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Complete bathroom renovations
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Tub-to-shower conversions & replacements
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Vanity and countertop installation
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Floor and wall tile installation
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Plumbing fixture upgrades (faucets, showerheads)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Lighting and electrical updates
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Accessible bathroom modifications (grab bars, walk-in tubs)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Custom bathroom designs & layouts
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg mt-8 lg:mt-0">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us for Your Georgia Bathroom Remodel?</h3>
                <ul className="space-y-3 text-lg text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">•</span>
                    <span>Experienced, licensed, and insured professionals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">•</span>
                    <span>Commitment to quality materials and superior craftsmanship</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">•</span>
                    <span>Transparent, detailed pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">•</span>
                    <span>Efficient project management for timely completion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">•</span>
                    <span>Comprehensive warranties on labor and materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">•</span>
                    <span>Dedicated customer service from start to finish</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Before & After Section */}
        <section className="py-8 md:py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">See the Transformations: Before & After</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First slider */}
              <div className="max-w-full mx-auto">
                <img-comparison-slider className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    slot="first"
                    src="/images/bathroom-remodel-before.jpg"
                    alt="Before bathroom remodeling"
                    width="4032"
                    height="3024"
                    className="w-full object-contain"
                  />
                  <img
                    slot="second"
                    src="/images/bathroom-remodel-after.webp"
                    alt="After bathroom remodeling"
                    width="1284"
                    height="1709"
                    className="w-full object-contain"
                />
                </img-comparison-slider>
              </div>
              
              {/* Second slider */}
              <div className="max-w-full mx-auto">
                <img-comparison-slider className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    slot="first"
                    src="/images-compressed/imagebefore-rotated.webp"
                    alt="Before transformation"
                    className="w-full object-contain"
                  />
                  <img
                    slot="second"
                    src="/images-compressed/imageafter.webp"
                    alt="After transformation"
                    className="w-full object-contain"
                />
                </img-comparison-slider>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Simple Bathroom Remodeling Process</h2>
            <div className="grid gap-8 md:grid-cols-4">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Consultation</h3>
                <p className="text-gray-600">
                  We discuss your vision, needs, and budget to create a personalized plan for your bathroom remodel in Georgia.
                </p>
              </div>
              {/* Step 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Design & Selection</h3>
                <p className="text-gray-600">
                  Our team helps you visualize the design and select the perfect materials, fixtures, and finishes.
                </p>
              </div>
              {/* Step 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Construction</h3>
                <p className="text-gray-600">
                  Our skilled craftsmen execute the remodel efficiently, focusing on quality workmanship and minimizing disruption.
                </p>
              </div>
              {/* Step 4 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-xl font-bold mb-2">Final Walkthrough</h3>
                <p className="text-gray-600">
                  We conduct a final walkthrough to ensure every detail meets our high standards and your complete satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Georgia Bathroom?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg">
              Contact American Top Roofing today to schedule your free, no-obligation consultation and estimate for your bathroom remodeling project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105"
              >
                GET YOUR FREE QUOTE
              </Link>
              <a
                href="tel:+14709402400"
                className="flex items-center justify-center gap-2 rounded-md bg-white px-8 py-3 text-lg font-bold text-blue-900 hover:bg-gray-100 transition-all duration-300 ease-in-out hover:scale-105"
              >
                <PhoneCall className="h-5 w-5" />
                CALL (470) 940-2400
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer handleAnchorClick={handleAnchorClick} />
      <Script src="https://unpkg.com/img-comparison-slider@7/dist/index.js" strategy="afterInteractive" />
    </div>
  )
}
