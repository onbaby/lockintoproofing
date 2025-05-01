"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { PhoneCall, Mail, Clock, MapPin, Star, Menu, CheckCircle, AlertCircle, ChevronLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { useState } from "react"
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

export default function RoofReplacementPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    service: "roof-replacement",
    message: "",
  })

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

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

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\\D/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const errors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      email: !formData.email.trim() || !isValidEmail(formData.email),
      phone: !formData.phone.trim() || formData.phone.replace(/\\D/g, "").length < 10,
      address: !formData.address.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

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
      {/* Header */}
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            className="relative mx-auto flex min-h-[400px] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center text-white md:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Roof Replacement Services
            </motion.h1>
            <motion.p
              className="mb-8 max-w-3xl text-lg text-gray-200 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Durable, weather-resistant installs using premium materials — done fast, done right.
            </motion.p>
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
          </motion.div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image src="/images/replacement.jpeg" alt="Roof Replacement" fill className="object-cover" priority />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Link href="/#services" className="mb-8 flex items-center text-blue-500 hover:text-blue-600">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to all services
                </Link>
              </motion.div>

              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="mb-6 text-3xl font-bold">Professional Roof Replacement</h2>
                <p className="mb-4 text-lg text-gray-700">
                  At Top American Roofing and Restoration, we specialize in complete roof replacements that provide
                  lasting protection for your home. Our experienced team uses only the highest quality materials and
                  follows industry-best installation practices to ensure your new roof will stand the test of time.
                </p>
                <p className="mb-4 text-lg text-gray-700">
                  Whether your roof has been damaged by severe weather, is showing signs of age, or you simply want to
                  upgrade the appearance of your home, our roof replacement services offer the perfect solution.
                </p>
              </motion.div>

              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="mb-4 text-2xl font-bold">Why Choose Our Roof Replacement Services?</h3>
                <ul className="mb-6 space-y-3 text-lg text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Premium materials from trusted manufacturers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Expert installation by certified professionals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Comprehensive warranties on materials and workmanship</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Efficient project completion with minimal disruption</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Thorough cleanup after project completion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Financing options available</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="mb-4 text-2xl font-bold">Our Roof Replacement Process</h3>
                <ol className="mb-6 space-y-6 text-lg text-gray-700">
                  <motion.li
                    className="flex"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      1
                    </span>
                    <div>
                      <h4 className="font-bold">Free Inspection and Consultation</h4>
                      <p>
                        We begin with a thorough inspection of your current roof to assess its condition and discuss
                        your needs and preferences.
                      </p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      2
                    </span>
                    <div>
                      <h4 className="font-bold">Detailed Proposal</h4>
                      <p>
                        We provide a comprehensive proposal outlining the scope of work, materials to be used, timeline,
                        and cost.
                      </p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      3
                    </span>
                    <div>
                      <h4 className="font-bold">Material Selection</h4>
                      <p>
                        We help you select the right roofing materials based on your home's architecture, your aesthetic
                        preferences, and your budget.
                      </p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      4
                    </span>
                    <div>
                      <h4 className="font-bold">Preparation and Installation</h4>
                      <p>
                        Our team carefully removes your old roof, prepares the surface, and installs your new roofing
                        system according to manufacturer specifications.
                      </p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                  >
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      5
                    </span>
                    <div>
                      <h4 className="font-bold">Final Inspection and Cleanup</h4>
                      <p>
                        We conduct a thorough inspection of the completed work and clean up your property, leaving it in
                        better condition than we found it.
                      </p>
                    </div>
                  </motion.li>
                </ol>
              </motion.div>

              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h3 className="mb-4 text-2xl font-bold">Available Roofing Materials</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    className="rounded-lg border p-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.3 }}
                  >
                    <h4 className="mb-2 text-xl font-bold">Asphalt Shingles</h4>
                    <p className="text-gray-700">
                      Affordable, versatile, and available in a wide range of colors and styles.
                    </p>
                  </motion.div>
                  <motion.div
                    className="rounded-lg border p-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.4 }}
                  >
                    <h4 className="mb-2 text-xl font-bold">Metal Roofing</h4>
                    <p className="text-gray-700">
                      Durable, energy-efficient, and environmentally friendly with a long lifespan.
                    </p>
                  </motion.div>
                  <motion.div
                    className="rounded-lg border p-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.5 }}
                  >
                    <h4 className="mb-2 text-xl font-bold">Tile Roofing</h4>
                    <p className="text-gray-700">
                      Elegant appearance with excellent durability and weather resistance.
                    </p>
                  </motion.div>
                  <motion.div
                    className="rounded-lg border p-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.6 }}
                  >
                    <h4 className="mb-2 text-xl font-bold">Slate Roofing</h4>
                    <p className="text-gray-700">Premium natural material with unmatched beauty and longevity.</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="rounded-lg bg-blue-50 p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.7 }}
              >
                <h3 className="mb-4 text-2xl font-bold text-center">Ready to Replace Your Roof?</h3>
                <p className="mb-6 text-center text-lg">
                  Contact us today to schedule your free roof inspection and consultation.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/#contact"
                    className="rounded-md bg-blue-500 px-8 py-3 text-center text-lg font-bold text-white hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    GET A FREE QUOTE
                  </Link>
                  <a
                    href="tel:+18001234567"
                    className="flex items-center justify-center gap-2 rounded-md bg-blue-800 px-8 py-3 text-lg font-bold text-white hover:bg-blue-700 transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    <PhoneCall className="h-5 w-5" />
                    CALL US NOW
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer handleAnchorClick={handleAnchorClick} />
    </div>
  )
}
