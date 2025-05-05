"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { PhoneCall, Menu, ChevronLeft, Paintbrush } from "lucide-react"
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
  } else {
    // Handle other links (like tel:) or potentially full page navigations
    window.location.href = href;
  }
};

// Add structured data for the painting service
const paintingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Professional Painting Services",
  "description": "Expert interior and exterior painting services for residential and commercial properties",
  "provider": {
    "@type": "Organization",
    "name": "American Top Roofing and Restoration",
    "url": "https://americantoproofing.com",
    "logo": "https://americantoproofing.com/images/new-logo.png"
  },
  "serviceType": ["Interior Painting", "Exterior Painting"],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "40.7128",
      "longitude": "-74.0060"
    },
    "geoRadius": "50000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Painting Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Interior Painting",
          "description": "Professional interior painting services for walls, ceilings, trim, and more"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Exterior Painting",
          "description": "Expert exterior painting services for siding, trim, decks, and more"
        }
      }
    ]
  }
}

export default function PaintingPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    service: "painting",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(paintingServiceSchema) }}
      />
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
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl hero-title tracking-wider">
                Professional Painting Services in Georgia
              </h1>
              <motion.p
                className="mb-8 max-w-3xl text-lg text-gray-200 sm:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Interior and exterior painting services to enhance and protect your property.
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
              <Image src="/images/painting-service-new.webp" alt="Professional painting services in Forsyth County" fill className="object-cover" priority />
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
                  <h2 className="mb-6 text-3xl font-bold">Professional Painting Services</h2>
                  <p className="mb-4 text-lg text-gray-700">
                    A fresh coat of paint can transform your home or business, enhancing its appearance and protecting it
                    from the elements. At Top American Roofing and Restoration, we provide professional interior and
                    exterior painting services that deliver beautiful, long-lasting results.
                  </p>
                  <p className="mb-4 text-lg text-gray-700">
                    Our experienced painting team uses premium paints and materials, combined with meticulous preparation
                    and application techniques, to ensure a flawless finish that will stand the test of time. Whether
                    you're looking to update a single room or completely transform your property, we have the expertise to
                    bring your vision to life.
                  </p>
                </div>

                <div className="mb-12 grid gap-8 md:grid-cols-2">
                  <motion.div
                    className="rounded-lg bg-blue-50 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <h3 className="mb-4 text-xl font-bold">Interior Painting</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">✓</span>
                        <span>Walls, ceilings, and trim</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">✓</span>
                        <span>Cabinets and built-ins</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">✓</span>
                        <span>Doors and windows</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">✓</span>
                        <span>Accent walls and decorative finishes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">✓</span>
                        <span>Color consultation and design advice</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    className="rounded-lg bg-blue-50 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <h3 className="mb-4 text-xl font-bold">Exterior Painting</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">✓</span>
                        <span>Siding and trim</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">✓</span>
                        <span>Doors and windows</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">✓</span>
                        <span>Decks, porches, and fences</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">✓</span>
                        <span>Garages and outbuildings</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">✓</span>
                        <span>Weather-resistant coatings and sealants</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>

                <div className="mb-12">
                  <h3 className="mb-4 text-2xl font-bold">Our Painting Process</h3>
                  <ol className="mb-6 space-y-6 text-lg text-gray-700">
                    <motion.li
                      className="flex"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                        1
                      </span>
                      <div>
                        <h4 className="font-bold">Consultation and Color Selection</h4>
                        <p>
                          We discuss your vision, preferences, and provide expert color recommendations to achieve your
                          desired look.
                        </p>
                      </div>
                    </motion.li>
                    <motion.li
                      className="flex"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                        2
                      </span>
                      <div>
                        <h4 className="font-bold">Surface Preparation</h4>
                        <p>
                          We thoroughly clean, repair, and prepare all surfaces to ensure proper paint adhesion and a
                          flawless finish.
                        </p>
                      </div>
                    </motion.li>
                    <motion.li
                      className="flex"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                        3
                      </span>
                      <div>
                        <h4 className="font-bold">Protection and Masking</h4>
                        <p>
                          We carefully protect your furniture, floors, fixtures, and landscaping to prevent any paint
                          damage.
                        </p>
                      </div>
                    </motion.li>
                    <motion.li
                      className="flex"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                        4
                      </span>
                      <div>
                        <h4 className="font-bold">Priming</h4>
                        <p>
                          When necessary, we apply high-quality primers to ensure proper adhesion and a uniform finish.
                        </p>
                      </div>
                    </motion.li>
                    <motion.li
                      className="flex"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                        5
                      </span>
                      <div>
                        <h4 className="font-bold">Paint Application</h4>
                        <p>
                          Our skilled painters apply premium paints using professional techniques to achieve a beautiful,
                          durable finish.
                        </p>
                      </div>
                    </motion.li>
                    <motion.li
                      className="flex"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                        6
                      </span>
                      <div>
                        <h4 className="font-bold">Final Inspection and Cleanup</h4>
                        <p>
                          We conduct a thorough inspection of all painted surfaces and clean up completely, leaving your
                          space ready to enjoy.
                        </p>
                      </div>
                    </motion.li>
                  </ol>
                </div>

                <div className="mb-12">
                  <h3 className="mb-4 text-2xl font-bold">Why Choose Our Painting Services</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <Paintbrush className="h-10 w-10 text-blue-500" />
                      </div>
                      <h4 className="mb-2 text-xl font-bold">Quality Materials</h4>
                      <p className="text-gray-700">
                        We use premium paints and materials that provide superior coverage and longevity.
                      </p>
                    </div>
                    <div className="rounded-lg border p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-10 w-10 text-blue-500"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <h4 className="mb-2 text-xl font-bold">Experienced Team</h4>
                      <p className="text-gray-700">
                        Our painters have years of experience and a commitment to excellence.
                      </p>
                    </div>
                    <div className="rounded-lg border p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-10 w-10 text-blue-500"
                        >
                          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"></path>
                        </svg>
                      </div>
                      <h4 className="mb-2 text-xl font-bold">Attention to Detail</h4>
                      <p className="text-gray-700">
                        We focus on the details to ensure a flawless finish that exceeds your expectations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Warranty Section */}
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
                      We stand behind our work with a comprehensive 1-year warranty on all our painting services. If you experience any issues with our workmanship within the first year, we'll come back and fix it at no additional cost to you.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-8">
                  <h3 className="mb-4 text-2xl font-bold text-center">Transform Your Space with Professional Painting</h3>
                  <p className="mb-6 text-center text-lg">
                    Contact us today to schedule your free painting consultation and estimate.
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
        <Footer handleAnchorClick={handleAnchorClick} />
      </div>
    </>
  )
}
