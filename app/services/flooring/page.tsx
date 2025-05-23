"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { PhoneCall, Menu, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import Footer from "../../components/Footer"
import Header from "@/app/components/Header"

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
  }
   else {
    // Handle other links (like tel:) or potentially full page navigations
    window.location.href = href;
  }
};

export default function FlooringPage() {
  // Form state (Copied from app/page.tsx - adjust if contact form is different)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    service: "flooring", // Pre-fill service
    message: "",
  })

  // Form errors state (Copied from app/page.tsx)
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    // service: false, // No need to validate pre-filled service
  })

  // Form submission state (Copied from app/page.tsx)
  const [formSubmitted, setFormSubmitted] = useState(false)

   // Handle form input changes (Copied from app/page.tsx)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, phone: formattedPhone }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
    if (value.trim()) {
      setFormErrors((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Format phone number (Copied from app/page.tsx)
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\\D/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Validate email format (Copied from app/page.tsx)
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate form (Copied and modified from app/page.tsx)
  const validateForm = () => {
    const errors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      email: !formData.email.trim() || !isValidEmail(formData.email),
      phone: !formData.phone.trim() || formData.phone.replace(/\\D/g, "").length < 10,
      address: !formData.address.trim(),
      // service validation removed
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  // Handle form submission (Copied from app/page.tsx)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setFormSubmitted(true);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="relative z-20 container mx-auto px-4 py-24 text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Professional Flooring & Tiling Services
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-200 sm:text-xl mb-8">
              Transform your home with beautiful, durable flooring and premium tile work installed by our expert team.
            </p>
            <motion.div
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
            </motion.div>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image src="/images/flooring-service.webp" alt="Professional flooring installation services in Georgia" fill className="object-cover" priority />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Link href="/#services" className="mb-8 flex items-center text-blue-500 hover:text-blue-600">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to all services
            </Link>
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Comprehensive Flooring Services</h2>
                <p className="text-gray-600 mb-4">
                  At Top American Roofing and Restoration, we offer comprehensive flooring and tiling services to enhance the
                  beauty, comfort, and value of your home. Whether you're looking to update a single room or your entire
                  house, our experienced team delivers exceptional results.
                </p>
                <p className="text-gray-600 mb-4">
                  We work with a wide range of high-quality flooring materials to suit any style, budget, and lifestyle
                  needs, ensuring your new floors will look beautiful and perform well for years to come.
                </p>
                <h3 className="text-xl font-bold mt-8 mb-4">Our services include:</h3>
                <ul className="space-y-2 text-gray-600 mb-8">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Hardwood flooring installation
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Laminate flooring installation
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Luxury vinyl tile and plank installation
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Ceramic and porcelain tile installation
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Custom bathroom and kitchen tiling
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Shower and tub surrounds
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Backsplash installation
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Carpet installation
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Floor repair and refinishing
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Subfloor preparation and repair
                  </li>
                </ul>
                <Link
                  href="/#contact"
                  className="inline-block rounded-md bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-600"
                >
                  SCHEDULE A CONSULTATION
                </Link>
              </div>
              <div className="space-y-8">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src="/images/flooringwidget.jpg"
                    alt="Professional flooring installation in Georgia"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Why Choose Us for Your Flooring & Tiling Project?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <span>Experienced, skilled installers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <span>Premium quality materials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <span>Precise installation techniques</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <span>Detailed waterproofing for wet areas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <span>Competitive pricing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <span>Comprehensive warranties</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <span>Clean, efficient work process</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warranty Section */}
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 rounded-lg bg-blue-50 p-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="mb-4 text-2xl font-bold">1-Year Warranty</h3>
                <p className="max-w-2xl text-lg text-gray-700">
                  We stand behind our work with a comprehensive 1-year warranty on all our flooring and tiling services. If you experience any issues with our workmanship within the first year, we'll come back and fix it at no additional cost to you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Types of Flooring Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Flooring Materials We Offer</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Hardwood Flooring</h3>
                <p className="text-gray-600 mb-4">
                  Classic, durable, and timeless. Hardwood floors add warmth and value to any home. Available in various
                  wood species, finishes, and plank widths.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Laminate Flooring</h3>
                <p className="text-gray-600 mb-4">
                  Affordable and versatile with the look of natural materials. Resistant to scratches, dents, and
                  fading, making it ideal for high-traffic areas.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Luxury Vinyl</h3>
                <p className="text-gray-600 mb-4">
                  Waterproof, durable, and available in tile or plank formats. Perfect for bathrooms, kitchens, and
                  basements while mimicking the look of stone or wood.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Ceramic & Porcelain Tile</h3>
                <p className="text-gray-600 mb-4">
                  Extremely durable and moisture-resistant. Available in countless colors, patterns, and sizes for
                  unique design possibilities in kitchens, bathrooms, and more.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Natural Stone Tile</h3>
                <p className="text-gray-600 mb-4">
                  Luxurious marble, granite, travertine, and slate provide a unique, elegant look with natural variations in each piece for truly one-of-a-kind floors and walls.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Carpet</h3>
                <p className="text-gray-600 mb-4">
                  Soft, warm, and comfortable underfoot. Available in various fibers, pile heights, and styles to suit
                  any room and preference.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tiling Services Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12">
                <h2 className="mb-6 text-3xl font-bold text-center">Specialized Tiling Services</h2>
                <p className="mb-4 text-lg text-gray-700 text-center">
                  Transform your space with beautiful, durable tile work from Top American Roofing and Restoration. Our
                  expert team provides professional tile installation for floors, walls, backsplashes, showers, and
                  more, creating stunning surfaces that enhance the beauty and value of your home.
                </p>
              </div>

              <div className="mb-12">
                <h3 className="mb-4 text-2xl font-bold">Our Specialized Tiling Services</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg border p-6">
                    <h4 className="mb-2 text-xl font-bold">Floor Tiling</h4>
                    <p className="text-gray-700">
                      Expert installation of ceramic, porcelain, natural stone, and other tile materials for kitchens,
                      bathrooms, entryways, and more.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h4 className="mb-2 text-xl font-bold">Wall Tiling</h4>
                    <p className="text-gray-700">
                      Beautiful wall tile installation for bathrooms, kitchens, and accent walls throughout your home.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h4 className="mb-2 text-xl font-bold">Backsplash Installation</h4>
                    <p className="text-gray-700">
                      Custom kitchen and bathroom backsplashes that combine style and functionality.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h4 className="mb-2 text-xl font-bold">Shower and Tub Surrounds</h4>
                    <p className="text-gray-700">
                      Waterproof, beautiful shower and tub surrounds with proper waterproofing and sealing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="mb-4 text-2xl font-bold">Tile Options We Offer</h3>
                <ul className="mb-6 space-y-3 text-lg text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Ceramic and porcelain tiles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Natural stone tiles (marble, granite, travertine, slate)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Glass and mosaic tiles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Large format tiles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Decorative and accent tiles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Specialty tiles (subway, hexagon, penny round)</span>
                  </li>
                </ul>
              </div>

              <div className="mb-12">
                <h3 className="mb-4 text-2xl font-bold">Our Flooring & Tiling Process</h3>
                <ol className="mb-6 space-y-6 text-lg text-gray-700">
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      1
                    </span>
                    <div>
                      <h4 className="font-bold">Consultation and Design</h4>
                      <p>
                        We discuss your vision, needs, and preferences to help you select the perfect materials and layout.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      2
                    </span>
                    <div>
                      <h4 className="font-bold">Surface Preparation</h4>
                      <p>We properly prepare the substrate to ensure a level, stable surface for installation.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      3
                    </span>
                    <div>
                      <h4 className="font-bold">Waterproofing (if needed)</h4>
                      <p>For wet areas, we apply proper waterproofing systems to prevent moisture damage.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      4
                    </span>
                    <div>
                      <h4 className="font-bold">Material Installation</h4>
                      <p>
                        Our skilled technicians install your floors and tiles with precision, ensuring proper spacing and
                        alignment.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      5
                    </span>
                    <div>
                      <h4 className="font-bold">Finishing Touches</h4>
                      <p>We apply grout, sealants, and trim to protect your installation and enhance its appearance.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Contact us today to schedule a free consultation and estimate for your flooring or tiling project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-blue-600"
              >
                GET A FREE QUOTE
              </Link>
              <a
                href="tel:+18001234567"
                className="flex items-center justify-center gap-2 rounded-md bg-white px-8 py-3 text-lg font-bold text-blue-900 hover:bg-gray-100"
              >
                <PhoneCall className="h-5 w-5" />
                (800) 123-4567
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer handleAnchorClick={handleAnchorClick} />
    </>
  )
}
