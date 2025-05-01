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
    <div className="flex min-h-screen flex-col">
      {/* Header START */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-20 items-center justify-between px-4 pt-2 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/new-logo.png"
              width={140}
              height={45}
              alt="American Top Roofing and Restoration Logo"
              className="h-auto w-[140px]"
            />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-4">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-2 text-sm font-bold text-blue-800 hover:text-blue-600"
              >
                <PhoneCall className="h-4 w-4" />
                (800) 123-4567
              </a>
              <a
                href="/#contact"
                onClick={(e) => handleAnchorClick(e, "/#contact")}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600"
              >
                GET A FREE QUOTE
              </a>
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
               <div className="flex items-center gap-3 mb-6">
                 <Link href="/">
                  <Image
                    src="/images/new-logo.png"
                    width={120}
                    height={40}
                    alt="American Top Roofing and Restoration Logo"
                    className="h-auto w-[120px]"
                   />
                 </Link>
                </div>
              <nav className="flex flex-col gap-4 py-6">
                 <a href="/#services" onClick={(e) => handleAnchorClick(e, "/#services")} className="text-lg font-medium hover:text-blue-500">Services</a>
                 <a href="/#how-it-works" onClick={(e) => handleAnchorClick(e, "/#how-it-works")} className="text-lg font-medium hover:text-blue-500">How It Works</a>
                 <a href="/#testimonials" onClick={(e) => handleAnchorClick(e, "/#testimonials")} className="text-lg font-medium hover:text-blue-500">Testimonials</a>
                 <a href="/#gallery" onClick={(e) => handleAnchorClick(e, "/#gallery")} className="text-lg font-medium hover:text-blue-500">Gallery</a>
                 <a href="/#faq" onClick={(e) => handleAnchorClick(e, "/#faq")} className="text-lg font-medium hover:text-blue-500">FAQ</a>
                <div className="mt-4 flex flex-col gap-4">
                  <motion.a
                    href="tel:+18001234567"
                    className="flex items-center gap-2 text-lg font-bold text-blue-800 hover:text-blue-600"
                    whileHover={{ scale: 1.05 }}
                  >
                     <motion.div
                      animate={{ rotate: [-10, 10, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", repeatDelay: 3 }}
                    >
                      <PhoneCall className="h-5 w-5" />
                    </motion.div>
                    (800) 123-4567
                  </motion.a>
                  <a
                    href="/#contact"
                    onClick={(e) => handleAnchorClick(e, "/#contact")}
                    className="rounded-md bg-blue-500 px-4 py-2 text-center text-lg font-bold text-white hover:bg-blue-600"
                  >
                    GET A FREE QUOTE
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      {/* Header END */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="relative z-20 container mx-auto px-4 py-24 text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Professional Flooring Services
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-200 sm:text-xl mb-8">
              Transform your home with beautiful, durable flooring installed by our expert team.
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
            <Image
              src="/images/flooring-service.jpeg"
              alt="Flooring Installation"
              fill
              className="object-cover"
              priority
            />
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
                <h2 className="text-3xl font-bold mb-6">Our Flooring Services</h2>
                <p className="text-gray-600 mb-4">
                  At Top American Roofing and Restoration, we offer comprehensive flooring services to enhance the
                  beauty, comfort, and value of your home. Whether you're looking to update a single room or your entire
                  house, our experienced team delivers exceptional results.
                </p>
                <p className="text-gray-600 mb-4">
                  We work with a wide range of high-quality flooring materials to suit any style, budget, and lifestyle
                  needs, ensuring your new floors will look beautiful and perform well for years to come.
                </p>
                <h3 className="text-xl font-bold mt-8 mb-4">Our flooring services include:</h3>
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
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Custom flooring solutions
                  </li>
                </ul>
                <Link
                  href="#contact"
                  className="inline-block rounded-md bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-600"
                >
                  SCHEDULE A CONSULTATION
                </Link>
              </div>
              <div className="space-y-8">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/images/flooring-service.jpeg"
                    alt="Flooring Installation"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Why Choose Us for Your Flooring Project?</h3>
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

        {/* Types of Flooring Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Types of Flooring We Offer</h2>
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
                  unique design possibilities.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Carpet</h3>
                <p className="text-gray-600 mb-4">
                  Soft, warm, and comfortable underfoot. Available in various fibers, pile heights, and styles to suit
                  any room and preference.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Engineered Hardwood</h3>
                <p className="text-gray-600 mb-4">
                  Real wood with enhanced stability and moisture resistance. Perfect for areas where solid hardwood
                  isn't recommended.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Floors?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Contact us today to schedule a free consultation and estimate for your flooring project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#contact"
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
      </main>

      {/* Footer */}
      <Footer handleAnchorClick={handleAnchorClick} />    </div>
  )
}
