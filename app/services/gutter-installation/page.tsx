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

export default function GutterInstallationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    service: "gutter-installation", // Pre-fill service
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
              Gutter Installation Services
            </motion.h1>
            <motion.p
              className="mb-8 max-w-3xl text-lg text-gray-200 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Professional gutter systems to protect your home from water damage and foundation issues.
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
            <Image
              src="/placeholder.svg?height=600&width=1600&text=Gutter+Installation"
              alt="Gutter Installation"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <Link href="/#services" className="mb-8 flex items-center text-blue-500 hover:text-blue-600">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to all services
              </Link>

              <div className="mb-12">
                <h2 className="mb-6 text-3xl font-bold">Professional Gutter Installation</h2>
                <p className="mb-4 text-lg text-gray-700">
                  Properly functioning gutters are essential for protecting your home from water damage. At Top American
                  Roofing and Restoration, we provide expert gutter installation services to ensure your home is
                  protected from the damaging effects of rainwater and melting snow.
                </p>
                <p className="mb-4 text-lg text-gray-700">
                  Our professional gutter systems are designed to efficiently channel water away from your home's
                  foundation, preventing erosion, basement flooding, and damage to your landscaping. We offer a variety
                  of gutter styles, materials, and colors to complement your home's architecture and meet your specific
                  needs.
                </p>
              </div>

              <div className="mb-12">
                <h3 className="mb-4 text-2xl font-bold">Why Quality Gutters Matter</h3>
                <ul className="mb-6 space-y-3 text-lg text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Protect your foundation from water damage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Prevent soil erosion around your property</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Reduce basement flooding risks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Preserve your landscaping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Prevent staining on brick and stone masonry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Reduce the risk of ice dams in winter</span>
                  </li>
                </ul>
              </div>

              <div className="mb-12">
                <h3 className="mb-4 text-2xl font-bold">Our Gutter Installation Process</h3>
                <ol className="mb-6 space-y-6 text-lg text-gray-700">
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      1
                    </span>
                    <div>
                      <h4 className="font-bold">Thorough Assessment</h4>
                      <p>
                        We evaluate your home's specific needs, considering factors like roof size, local rainfall
                        patterns, and property layout.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      2
                    </span>
                    <div>
                      <h4 className="font-bold">Custom Measurements</h4>
                      <p>We take precise measurements to ensure your gutters fit perfectly along your roofline.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      3
                    </span>
                    <div>
                      <h4 className="font-bold">Material Selection</h4>
                      <p>We help you choose the right materials and colors to complement your home's exterior.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      4
                    </span>
                    <div>
                      <h4 className="font-bold">Professional Installation</h4>
                      <p>
                        Our experienced team installs your new gutters with proper pitch and secure fastening for
                        optimal performance.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      5
                    </span>
                    <div>
                      <h4 className="font-bold">Downspout Placement</h4>
                      <p>We strategically place downspouts to effectively direct water away from your foundation.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      6
                    </span>
                    <div>
                      <h4 className="font-bold">Final Inspection</h4>
                      <p>We thoroughly inspect the completed installation to ensure everything functions properly.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="mb-4 text-2xl font-bold">Gutter Options We Offer</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    className="rounded-lg border p-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <h4 className="mb-2 text-xl font-bold">Seamless Gutters</h4>
                    <p className="text-gray-700">
                      Custom-made on-site to fit your home perfectly, reducing leaks and maintenance.
                    </p>
                  </motion.div>
                  <motion.div
                    className="rounded-lg border p-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <h4 className="mb-2 text-xl font-bold">K-Style Gutters</h4>
                    <p className="text-gray-700">
                      Decorative front design that resembles crown molding, offering higher water capacity.
                    </p>
                  </motion.div>
                  <motion.div
                    className="rounded-lg border p-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <h4 className="mb-2 text-xl font-bold">Half-Round Gutters</h4>
                    <p className="text-gray-700">
                      Classic, semi-circular design that complements historic and traditional homes.
                    </p>
                  </motion.div>
                  <motion.div
                    className="rounded-lg border p-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    <h4 className="mb-2 text-xl font-bold">Gutter Guards</h4>
                    <p className="text-gray-700">
                      Protection systems that prevent leaves and debris from clogging your gutters.
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <div className="mb-12">
                <h3 className="mb-4 text-2xl font-bold">Available Materials</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border p-6 text-center">
                    <h4 className="mb-2 text-xl font-bold">Aluminum</h4>
                    <p className="text-gray-700">Lightweight, rust-resistant, and available in many colors</p>
                  </div>
                  <div className="rounded-lg border p-6 text-center">
                    <h4 className="mb-2 text-xl font-bold">Copper</h4>
                    <p className="text-gray-700">Premium, long-lasting material with a distinctive appearance</p>
                  </div>
                  <div className="rounded-lg border p-6 text-center">
                    <h4 className="mb-2 text-xl font-bold">Steel</h4>
                    <p className="text-gray-700">Durable and strong, ideal for areas with severe weather</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-8">
                <h3 className="mb-4 text-2xl font-bold text-center">Protect Your Home with Quality Gutters</h3>
                <p className="mb-6 text-center text-lg">
                  Contact us today to schedule your free consultation and estimate for professional gutter installation.
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
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer handleAnchorClick={handleAnchorClick} />    </div>
  )
}
