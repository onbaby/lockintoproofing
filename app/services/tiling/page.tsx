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

export default function TilingPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    service: "tiling", // Pre-fill service
    message: "",
  })

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    // service: false, // No need to validate pre-filled service
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
      // service validation removed
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
              Professional Tiling Services
            </motion.h1>
            <motion.p
              className="mb-8 max-w-3xl text-lg text-gray-200 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Expert tile installation for floors, walls, backsplashes, and more with precision and attention to detail.
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
            <Image src="/images/tiling.jpeg" alt="Tiling Services" fill className="object-cover" priority />
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
                <h2 className="mb-6 text-3xl font-bold">Professional Tiling Services</h2>
                <p className="mb-4 text-lg text-gray-700">
                  Transform your space with beautiful, durable tile work from Top American Roofing and Restoration. Our
                  expert team provides professional tile installation for floors, walls, backsplashes, showers, and
                  more, creating stunning surfaces that enhance the beauty and value of your home.
                </p>
                <p className="mb-4 text-lg text-gray-700">
                  Whether you're renovating a bathroom, updating your kitchen, or adding tile to any other area of your
                  home, we deliver exceptional craftsmanship and attention to detail for results that will stand the
                  test of time.
                </p>
              </div>

              <div className="mb-12">
                <h3 className="mb-4 text-2xl font-bold">Our Tiling Services</h3>
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
                <h3 className="mb-4 text-2xl font-bold">Our Tiling Process</h3>
                <ol className="mb-6 space-y-6 text-lg text-gray-700">
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      1
                    </span>
                    <div>
                      <h4 className="font-bold">Consultation and Design</h4>
                      <p>
                        We discuss your vision, needs, and preferences to help you select the perfect tile and layout.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      2
                    </span>
                    <div>
                      <h4 className="font-bold">Surface Preparation</h4>
                      <p>We properly prepare the substrate to ensure a level, stable surface for tile installation.</p>
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
                      <h4 className="font-bold">Tile Installation</h4>
                      <p>
                        Our skilled technicians install your tiles with precision, ensuring proper spacing and
                        alignment.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      5
                    </span>
                    <div>
                      <h4 className="font-bold">Grouting and Sealing</h4>
                      <p>We apply grout and sealants to protect your tile and enhance its appearance.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="rounded-lg bg-blue-50 p-8">
                <h3 className="mb-4 text-2xl font-bold text-center">
                  Ready to Transform Your Space with Beautiful Tile?
                </h3>
                <p className="mb-6 text-center text-lg">
                  Contact us today to schedule your free consultation and estimate for professional tiling services.
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
