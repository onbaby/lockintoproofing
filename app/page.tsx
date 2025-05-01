"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { PhoneCall, Mail, Clock, MapPin, Star, Menu, Award, Shield, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    message: "",
  })

  // Form errors state
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    service: false,
  })

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formValid, setFormValid] = useState(false)

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target

    // For phone field, format the input
    if (id === "phone") {
      const formattedPhone = formatPhoneNumber(value)
      setFormData((prev) => ({ ...prev, phone: formattedPhone }))
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }))
    }

    // Clear error for this field if it has a value
    if (value.trim()) {
      setFormErrors((prev) => ({ ...prev, [id]: false }))
    }
  }

  // Format phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, "")

    // Format based on length
    if (phoneNumber.length < 4) {
      return phoneNumber
    } else if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
  }

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate form
  const validateForm = () => {
    const errors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      email: !formData.email.trim() || !isValidEmail(formData.email),
      phone: !formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 10,
      address: !formData.address.trim(),
      service: !formData.service.trim(),
    }

    setFormErrors(errors)

    // Form is valid if no errors
    const valid = !Object.values(errors).some((error) => error)
    setFormValid(valid)

    return valid
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to send email');
        }

        // Form is valid, proceed with submission
        console.log("Form submitted:", formData);
        setFormSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        // You might want to show an error message to the user here
      }
    }
  };

  // Smooth scroll function for anchor links
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

  // Additional services for text slider
  const additionalServices = [
    { name: "Siding", link: "/services/siding" },
    { name: "Gutter Guards", link: "/services/gutter-guards" },
    { name: "Tiling", link: "/services/tiling" },
  ]

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Auto-rotate services in the slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % additionalServices.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Floating CTA Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 sm:flex-row"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.a
          href="tel:+14709151599"
          className="flex items-center justify-center rounded-full bg-green-600 p-3 text-white shadow-lg hover:bg-green-700 sm:hidden transition-all duration-300 ease-in-out hover:scale-105"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            animate={{
              rotate: [-10, 10, -10, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 3,
            }}
          >
            <PhoneCall className="h-6 w-6" />
          </motion.div>
        </motion.a>
        <a
          href="/#contact"
          onClick={(e) => handleAnchorClick(e, "/#contact")}
          className="flex items-center justify-center rounded-full bg-blue-500 px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-blue-600 sm:text-base transition-all duration-300 ease-in-out hover:scale-105"
        >
          GET A FREE QUOTE
        </a>
      </motion.div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-20 items-center justify-between px-4 pt-2 md:px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/new-logo.png"
              width={140}
              height={45}
              alt="American Top Roofing and Restoration Logo"
              className="h-auto w-[140px]"
            />
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-4">
              <a
                href="tel:+14709151599"
                className="flex items-center gap-2 text-sm font-bold text-blue-800 hover:text-blue-600"
              >
                <PhoneCall className="h-4 w-4" />
                (470) 915-1599
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
                <Image
                  src="/images/new-logo.png"
                  width={120}
                  height={40}
                  alt="American Top Roofing and Restoration Logo"
                  className="h-auto w-[120px]"
                />
              </div>
              <nav className="flex flex-col gap-4 py-6">
                <a
                  href="#services"
                  onClick={(e) => handleAnchorClick(e, "services")}
                  className="text-lg font-medium hover:text-blue-500"
                >
                  Services
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleAnchorClick(e, "how-it-works")}
                  className="text-lg font-medium hover:text-blue-500"
                >
                  How It Works
                </a>
                <a
                  href="#testimonials"
                  onClick={(e) => handleAnchorClick(e, "testimonials")}
                  className="text-lg font-medium hover:text-blue-500"
                >
                  Testimonials
                </a>
                <a
                  href="#gallery"
                  onClick={(e) => handleAnchorClick(e, "gallery")}
                  className="text-lg font-medium hover:text-blue-500"
                >
                  Gallery
                </a>
                <a
                  href="#faq"
                  onClick={(e) => handleAnchorClick(e, "faq")}
                  className="text-lg font-medium hover:text-blue-500"
                >
                  FAQ
                </a>
                <div className="mt-4 flex flex-col gap-4">
                  <motion.a
                    href="tel:+14709151599"
                    className="flex items-center gap-2 text-lg font-bold text-blue-800 hover:text-blue-600"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{
                        rotate: [-10, 10, -10, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        repeatDelay: 3,
                      }}
                    >
                      <PhoneCall className="h-5 w-5" />
                    </motion.div>
                    (470) 915-1599
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
          <div className="absolute inset-0 bg-black/60 z-10" />
          <motion.div
            className="relative z-20 mx-auto flex min-h-[600px] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center text-white md:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl" {...fadeInUp}>
              Quality Roofing Solutions <br className="hidden sm:inline" />
              For Your Home
            </motion.h1>
            <motion.p
              className="mb-8 max-w-3xl text-lg text-gray-200 sm:text-xl"
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Protect your biggest investment with Top American Roofing and Restoration. We provide professional,
              reliable, and affordable roofing services.
            </motion.p>
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              {...fadeInUp}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <a
                href="/#contact"
                onClick={(e) => handleAnchorClick(e, "/#contact")}
                className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105"
              >
                GET A FREE QUOTE
              </a>
              <a
                href="tel:+14709151599"
                className="flex items-center justify-center gap-2 rounded-md bg-blue-800 px-8 py-3 text-lg font-bold text-white hover:bg-blue-700 transition-all duration-300 ease-in-out hover:scale-105"
              >
                <PhoneCall className="h-5 w-5" />
                CALL US NOW
              </a>
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <video
              src="/videos/sequence 01_6.MP4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-gray-50 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Roofing Services</h2>
              <p className="mx-auto max-w-3xl text-gray-600">
                We offer a comprehensive range of roofing and restoration services to meet all your needs, from repairs
                to complete replacements.
              </p>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Roof Replacement",
                  description: "Durable, weather-resistant installs using premium materials — done fast, done right.",
                  image: "/images/roofreplacement.jpeg",
                  link: "/services/roof-replacement",
                },
                {
                  title: "Roof Repairs",
                  description:
                    "Expert repairs for leaks, damaged shingles, and other issues with quick response times.",
                  image: "/images/roofrepair.jpeg",
                  link: "/services/roof-repairs",
                },
                {
                  title: "Gutter Repairs",
                  description: "Professional gutter repair services to prevent water damage and foundation issues.",
                  image: "/images/gutterinstall.jpeg",
                  link: "/services/gutter-repairs",
                },
                {
                  title: "Bathroom Remodeling",
                  description:
                    "Complete bathroom renovation services including fixtures, tiling, plumbing, and custom designs.",
                  image: "/images/bathroom-remodeling.jpeg",
                  link: "/services/bathroom-remodeling",
                },
                {
                  title: "Flooring",
                  description:
                    "Professional installation of hardwood, laminate, tile, and vinyl flooring for any room in your home.",
                  image: "/images/flooring-installation.jpeg",
                  link: "/services/flooring",
                },
                {
                  title: "Painting",
                  description: "Interior and exterior painting services to enhance and protect your property.",
                  image: "/images/paintingjob.jpg",
                  link: "/services/painting",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                >
                  <div className="relative h-0 w-full pb-[66.67%] overflow-hidden rounded-t-lg">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="absolute inset-0 h-full w-full object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-center text-2xl font-bold">{service.title}</h3>
                    <p className="mb-6 flex-1 text-center text-gray-600">{service.description}</p>
                    {service.title === "Bathroom Remodeling" || service.title === "Flooring" ? (
                      <Link
                        href={service.link}
                        onClick={() => window.scrollTo(0, 0)}
                        className="mx-auto mt-auto rounded-md bg-blue-500 px-6 py-2 text-center font-medium text-white transition-colors hover:bg-blue-600"
                      >
                        Learn more
                      </Link>
                    ) : (
                      <Link
                        href={service.link}
                        className="mx-auto mt-auto rounded-md bg-blue-500 px-6 py-2 text-center font-medium text-white transition-colors hover:bg-blue-600"
                      >
                        Learn more
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              className="mt-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-center">Additional Services We Offer</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {additionalServices.map((service, index) => (
                    <Link
                      key={index}
                      href={service.link}
                      className="bg-white px-6 py-3 rounded-md shadow-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a
                href="/#contact"
                onClick={(e) => handleAnchorClick(e, "/#contact")}
                className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105"
              >
                GET YOUR FREE QUOTE TODAY
              </a>
            </motion.div>
          </div>
        </section>

        {/* Trusted & Certified Section */}
        <section className="py-16 bg-white border-y md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Trusted & Certified</h2>
              <p className="mx-auto max-w-3xl text-gray-600">
                We maintain the highest standards of quality and professionalism in the industry
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center">
              {/* Certification Item 1: BBB */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.4,
                }}
              >
                <div className="relative h-32 w-32 mb-4">
                  <Image
                    src="/images/bbb-accredited.webp"
                    alt="BBB Accredited Business"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-center">BBB Accredited</h3>
                <p className="text-sm text-center text-gray-600">Licensed in Georgia #RLC123456</p>
              </motion.div>

              {/* Certification Item 2: Google Guaranteed */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.5,
                }}
              >
                <div className="relative h-32 w-64 mb-4">
                  <Image src="/images/google-guaranteed.png" alt="Google Guaranteed" fill className="object-contain" />
                </div>
                <h3 className="text-lg font-bold text-center">Google Guaranteed</h3>
                <p className="text-sm text-center text-gray-600">Fully Bonded for Your Protection</p>
              </motion.div>

              {/* Certification Item 3: GAF Certified */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.6,
                }}
              >
                <div className="relative h-32 w-32 mb-4">
                  <Image
                    src="/images/gaf-certified.png"
                    alt="GAF Certified Contractor"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-center">GAF Certified</h3>
                <p className="text-sm text-center text-gray-600">$2M General Liability Insurance</p>
              </motion.div>
            </div>

            <motion.div
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.div
                className="flex items-center justify-center gap-3 rounded-full bg-blue-50 px-6 py-4 shadow-md"
                whileInView={{
                  x: [-20, 0],
                  opacity: [0, 1],
                }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Shield className="h-8 w-8 text-blue-500" />
                <span className="text-lg font-medium">5 Year Warranty</span>
              </motion.div>

              <motion.div
                className="flex items-center justify-center gap-3 rounded-full bg-blue-50 px-6 py-4 shadow-md"
                whileInView={{
                  x: [-20, 0],
                  opacity: [0, 1],
                }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <CheckCircle className="h-8 w-8 text-blue-500" />
                <span className="text-lg font-medium">Licensed & Insured</span>
              </motion.div>

              <motion.div
                className="flex items-center justify-center gap-3 rounded-full bg-blue-50 px-6 py-4 shadow-md"
                whileInView={{
                  x: [-20, 0],
                  opacity: [0, 1],
                }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <Award className="h-8 w-8 text-blue-500" />
                <span className="text-lg font-medium">Award-Winning Service</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mx-auto max-w-3xl text-gray-600">
                Our simple process makes getting your roof repaired or replaced easy and stress-free.
              </p>
            </motion.div>

            <div className="mx-auto max-w-5xl">
              <div className="relative">
                <motion.div
                  className="absolute left-[15px] top-0 h-full w-0.5 bg-gray-200 md:left-1/2 md:-ml-0.5"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                ></motion.div>

                {[
                  {
                    title: "Contact Us",
                    description:
                      "Reach out to us by phone or fill out our online form to schedule a free consultation and estimate.",
                    image: "/images/contact-us.jpeg",
                  },
                  {
                    title: "Free Inspection",
                    description:
                      "Our roofing experts will visit your property to assess your roofing needs and provide a detailed estimate.",
                    image: "/images/free-inspection.jpeg",
                  },
                  {
                    title: "Choose Your Options",
                    description:
                      "We'll help you select the best materials and solutions for your specific needs and budget.",
                    image: "/images/choose-options-new.jpeg",
                  },
                  {
                    title: "Professional Installation",
                    description:
                      "Our experienced team will complete your roofing project with the highest standards of quality and safety.",
                    image: "/images/professional-installation-new.jpeg",
                  },
                  {
                    title: "Final Inspection",
                    description:
                      "We'll conduct a thorough inspection to ensure everything meets our high standards of quality.",
                    image: "/images/final-inspection.jpeg",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative mb-8 md:mb-12"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 50,
                    }}
                  >
                    <div className="flex md:items-center md:justify-center">
                      <motion.div
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white md:absolute md:left-1/2 md:-ml-4"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.2 + 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        {index + 1}
                      </motion.div>
                    </div>

                    <div
                      className={`relative ml-12 rounded-lg bg-white p-6 shadow-md md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
                    >
                      <div className="mb-4 overflow-hidden rounded-lg aspect-[3/2]">
                        <Image
                          src={step.image || "/placeholder.svg"}
                          alt={step.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <a
                href="/#contact"
                onClick={(e) => handleAnchorClick(e, "/#contact")}
                className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105"
              >
                START YOUR PROJECT NOW
              </a>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-blue-900 py-16 text-white md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Customers Say</h2>
              <p className="mx-auto max-w-3xl text-blue-100">
                Don't just take our word for it. Here's what our satisfied customers have to say about our roofing
                services.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "David Joseph",
                  location: "Forsyth County, GA",
                  quote:
                    "American Top Roofing & Restoration LLC wrapped my home in stunning vinyl siding, boosting its curb appeal and energy efficiency. Their crew's precision and dedication to detail are truly impressive.",
                  rating: 5,
                  avatar: "/images/david-joseph.jpeg",
                },
                {
                  name: "Jacqueline May",
                  location: "Fulton County, GA",
                  quote:
                    "Had an inspection done on my roof by American Top Roofing. They found some minor issues and fixed them on the spot. I was impressed by how thorough and knowledgeable the team was. They also gave me tips on how to maintain my roof. Will be calling them again for future needs.",
                  rating: 5,
                  avatar: "/images/jacqueline-may.jpeg",
                },
                {
                  name: "Beverly Hill",
                  location: "Gwinnett County, GA",
                  quote:
                    "American Top Roofing delivered exceptional service. My new roof is flawless, and the crew was professional and efficient. Highly recommend!",
                  rating: 5,
                  avatar: "/images/lewis-parker.jpeg",
                },
                {
                  name: "Lewis Parker",
                  location: "Cherokee County, GA",
                  quote:
                    "We had American Top Roofing paint our house and replace the siding. They were punctual and did a wonderful job. The house looks like new. The crew was friendly and cleaned up thoroughly after the job was done. Highly recommend them for any exterior work.",
                  rating: 5,
                  avatar: "/images/beverly-hill.jpeg",
                },
                {
                  name: "Seraphina Chase",
                  location: "Cobb County, GA",
                  quote:
                    "Fast roof repair! They quickly fixed the leak and left my roof looking great. Professional service!",
                  rating: 5,
                  avatar: "/images/seraphina-chase.jpeg",
                },
                {
                  name: "David Brown",
                  location: "DeKalb County, GA",
                  quote:
                    "After having issues with clogged gutters, I decided to install new gutters and gutter guards with American Top Roofing. The process was seamless. They provided a detailed quote and completed the work quickly. The guards work perfectly, and I no longer have to clean out my gutters. Excellent service all around",
                  rating: 5,
                  avatar: "/images/david-brown.jpeg",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col rounded-lg bg-blue-800 p-6 shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <Star key={i + testimonial.rating} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <div className="mb-4 flex items-center">
                    <motion.div
                      className="mr-4 overflow-hidden rounded-full border-2 border-blue-400"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                    >
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="h-12 w-12 object-cover rounded-full"
                      />
                    </motion.div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-blue-200">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="flex-1 text-blue-100">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <a
                href="/#contact"
                onClick={(e) => handleAnchorClick(e, "/#contact")}
                className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-white hover:text-blue-900"
              >
                JOIN OUR SATISFIED CUSTOMERS
              </a>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Work</h2>
              <p className="mx-auto max-w-3xl text-gray-600">
                Browse through our gallery of completed roofing projects to see the quality of our work.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  image: "/images/gallery/gallery1.jpg",
                  title: "Roof Replacement Project"
                },
                {
                  image: "/images/gallery/gallery2.jpg",
                  title: "Roof Repair Project"
                },
                {
                  image: "/images/gallery/gallery3.jpg",
                  title: "Gutter Installation Project"
                },
                {
                  image: "/images/gallery/gallery4.jpg",
                  title: "Roof Inspection Project"
                },
                {
                  image: "/images/gallery/gallery5.jpg",
                  title: "Siding Installation Project"
                },
                {
                  image: "/images/gallery/gallery6.jpg",
                  title: "Gutter Repairs Project"
                },
                {
                  image: "/images/gallery/gallery7.jpg",
                  title: "Storm Damage Project"
                },
                {
                  image: "/images/gallery/gallery8.jpg",
                  title: "Commercial Roofing Project"
                }
              ].map((project, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => {
                    setSelectedImage(project.image);
                    setLightboxOpen(true);
                  }}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain bg-gray-100"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
                onClick={() => setLightboxOpen(false)}
              >
                <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
                  <button
                    className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
                    onClick={() => setLightboxOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={selectedImage}
                      alt="Enlarged view"
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <a
                href="#contact"
                onClick={(e) => handleAnchorClick(e, "/#contact")}
                className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-blue-600"
              >
                GET YOUR FREE ROOF INSPECTION
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-gray-50 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600">
                Find answers to common questions about our roofing services.
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "How long does a typical roof replacement take?",
                    answer:
                      "Most residential roof replacements can be completed in 1-3 days, depending on the size and complexity of your roof. Larger homes or those with complex roof designs may take longer. We'll provide you with a specific timeline during your consultation.",
                  },
                  {
                    question: "Do you offer warranties on your roofing work?",
                    answer:
                      "Yes, we offer manufacturer warranties on materials (typically 25-50 years depending on the product) and our own workmanship warranty. Our standard workmanship warranty is 10 years, giving you peace of mind that your investment is protected.",
                  },
                  {
                    question: "How do I know if I need a roof repair or a complete replacement?",
                    answer:
                      "Several factors determine whether you need a repair or replacement, including the age of your roof, extent of damage, and your long-term plans for the property. Our experts will assess your roof's condition and provide honest recommendations based on what makes the most sense for your situation.",
                  },
                  {
                    question: "Will you help with insurance claims for storm damage?",
                    answer:
                      "We have extensive experience working with insurance companies and can help guide you through the claims process. Our team will document all damage, provide detailed estimates, and work directly with your insurance adjuster to ensure you receive the coverage you're entitled to.",
                  },
                  {
                    question: "What types of roofing materials do you offer?",
                    answer:
                      "We offer a wide range of roofing materials including asphalt shingles, metal roofing, tile, slate, and flat roofing systems. During your consultation, we'll discuss the pros and cons of each option based on your home's architecture, your aesthetic preferences, and your budget.",
                  },
                  {
                    question: "Do you offer financing options?",
                    answer:
                      "Yes, we offer several financing options to make your roofing project affordable. We partner with reputable financing companies to provide competitive rates and flexible payment plans. Our team can help you explore these options during your consultation.",
                  },
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-12 flex justify-center">
              <a
                href="/#contact"
                onClick={(e) => handleAnchorClick(e, "/#contact")}
                className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-blue-600"
              >
                STILL HAVE QUESTIONS? CONTACT US
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Get Your Free Quote</h2>
              <p className="mx-auto max-w-3xl text-gray-600">
                Fill out the form below or call us directly to schedule your free roof inspection and estimate.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
              <div className="rounded-lg bg-white p-8 shadow-md">
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-gray-600 max-w-md">
                      Your quote request has been submitted successfully. One of our representatives will contact you
                      shortly.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="first-name" className="mb-2 block text-sm font-medium">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full rounded-md border ${formErrors.firstName ? "border-red-500" : "border-gray-300"} px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          required
                        />
                        {formErrors.firstName && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" /> First name is required
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="last-name" className="mb-2 block text-sm font-medium">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full rounded-md border ${formErrors.lastName ? "border-red-500" : "border-gray-300"} px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          required
                        />
                        {formErrors.lastName && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" /> Last name is required
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full rounded-md border ${formErrors.email ? "border-red-500" : "border-gray-300"} px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          required
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" /> Valid email is required
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(123) 456-7890"
                          className={`w-full rounded-md border ${formErrors.phone ? "border-red-500" : "border-gray-300"} px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          required
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" /> Valid phone number is required
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="mb-2 block text-sm font-medium">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full rounded-md border ${formErrors.address ? "border-red-500" : "border-gray-300"} px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        required
                      />
                      {formErrors.address && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" /> Address is required
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="service" className="mb-2 block text-sm font-medium">
                        Service Needed <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className={`w-full rounded-md border ${formErrors.service ? "border-red-500" : "border-gray-300"} px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="roof-replacement">Roof Replacement</option>
                        <option value="roof-repair">Roof Repair</option>
                        <option value="gutter-repairs">Gutter Repairs</option>
                        <option value="fire-water-restoration">Fire/Water Restoration</option>
                        <option value="mold-removal">Mold Removal</option>
                        <option value="painting">Painting</option>
                        <option value="inspection">Roof Inspection</option>
                        <option value="emergency">Emergency Service</option>
                        <option value="other">Other</option>
                      </select>
                      {formErrors.service && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" /> Please select a service
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium">
                        Additional Information
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-md bg-blue-500 px-6 py-3 text-lg font-bold text-white hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105"
                    >
                      GET MY FREE QUOTE
                    </button>
                  </form>
                )}
              </div>

              <div className="flex flex-col justify-between rounded-lg bg-blue-900 p-8 text-white shadow-md">
                <div>
                  <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <PhoneCall className="mr-4 h-6 w-6 text-blue-300" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+14709151599" className="text-xl font-bold hover:underline">
                          (470) 915-1599
                        </a>
                        <p className="text-sm text-blue-200"></p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="mr-4 h-6 w-6 text-blue-300" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:americantoproofingllc@gmail.com" className="hover:underline">
                          americantoproofingllc@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="mr-4 h-6 w-6 text-blue-300" />
                      <div>
                        <p className="font-medium">Address</p>
                        <address className="not-italic">
                          3332 Stone point way
                        </address>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="mr-4 h-6 w-6 text-blue-300" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p>Monday - Friday: 8am - 7pm</p>
                        <p>Saturday: 8am - 4pm</p>
                        <p>Sunday: Closed </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="mb-4 text-xl font-bold">Service Areas</h4>
                  <p className="mb-2">
                    We proudly serve the following counties in Georgia and surrounding communities:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <span>Forsyth County</span>
                    <span>Fulton County</span>
                    <span>Gwinnett County</span>
                    <span>Cherokee County</span>
                    <span>Cobb County</span>
                    <span>DeKalb County</span>
                    <span>Hall County</span>
                    <span>Dawson County</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#111827] py-16 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
            {/* Column 1: Company Info */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Image
                  src="/images/logowhiteversion.PNG"
                  width={150}
                  height={50}
                  alt="American Top Roofing and Restoration Logo"
                  className="h-auto w-[150px]"
                />
              </div>
              <p className="mb-6 text-gray-400">
                Professional roofing services you can trust. Serving homeowners and businesses since 2005.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61555812785754&sk=reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/american_top_roofing_llc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.353.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="mb-6 text-xl font-bold">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleAnchorClick(e, "services")}
                    className="text-gray-400 hover:text-white"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    onClick={(e) => handleAnchorClick(e, "how-it-works")}
                    className="text-gray-400 hover:text-white"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    onClick={(e) => handleAnchorClick(e, "testimonials")}
                    className="text-gray-400 hover:text-white"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    onClick={(e) => handleAnchorClick(e, "gallery")}
                    className="text-gray-400 hover:text-white"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => handleAnchorClick(e, "faq")}
                    className="text-gray-400 hover:text-white"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => handleAnchorClick(e, "contact")}
                    className="text-gray-400 hover:text-white"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h3 className="mb-6 text-xl font-bold">Services</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/services/roof-replacement" className="text-gray-400 hover:text-white">
                    Roof Replacement
                  </Link>
                </li>
                <li>
                  <Link href="/services/roof-repairs" className="text-gray-400 hover:text-white">
                    Roof Repairs
                  </Link>
                </li>
                <li>
                  <Link href="/services/gutter-repairs" className="text-gray-400 hover:text-white">
                    Gutter Repairs
                  </Link>
                </li>
                <li>
                  <Link href="/services/tiling" className="text-gray-400 hover:text-white">
                    Tiling
                  </Link>
                </li>
                <li>
                  <Link href="/services/siding" className="text-gray-400 hover:text-white">
                    Siding
                  </Link>
                </li>
                <li>
                  <Link href="/services/painting" className="text-gray-400 hover:text-white">
                    Painting
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div>
              <h3 className="mb-6 text-xl font-bold">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <PhoneCall className="mr-3 h-5 w-5 text-blue-400" />
                  <a href="tel:+14709151599" className="text-gray-200 hover:text-white">
                    (470) 915-1599
                  </a>
                </li>
                <li className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-blue-400" />
                  <a href="mailto:americantoproofingllc@gmail.com" className="text-gray-200 hover:text-white">
                    americantoproofingllc@gmail.com
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-blue-400" />
                  <span className="text-gray-200">
                    3332 Stone point way
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-center text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Top American Roofing &amp; Restoration. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
