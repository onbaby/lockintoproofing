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
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [scale, setScale] = useState(1);
  const [isPinching, setIsPinching] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    console.log('Input changed:', id, value);

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
    setSubmitError(null);

    if (isSubmitting) return; // Prevent multiple submissions

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit form');
        }

        // Form submitted successfully
        setFormSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
        setFormSubmitted(false);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Smooth scroll function for sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Updated anchor click handler
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Extract section ID from href
    const sectionId = href.replace(/^[\/#]+/, ''); // Remove leading / and # characters

    // If we're on the homepage, just scroll
    if (window.location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      // If we're on another page, navigate to homepage and scroll
      window.location.href = `/?section=${sectionId}`;
    }
  };

  // Handle section scrolling on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section) {
      // Small delay to ensure the page is fully loaded
      setTimeout(() => {
        scrollToSection(section);
        // Clean up the URL without refreshing the page
        window.history.replaceState({}, '', '/');
      }, 100);
    }
  }, []);

  // Additional services for text slider
  const additionalServices: { name: string; link: string }[] = []

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Auto-rotate services in the slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % additionalServices.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Add pinch-to-zoom effect for the lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    
    let initialDistance = 0;
    let initialScale = 1;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        initialDistance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        initialScale = scale;
        setIsPinching(true);
        e.preventDefault();
      } else if (e.touches.length === 1 && scale > 1) {
        setIsDragging(true);
        setDragStart({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y
        });
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && isPinching) {
        const currentDistance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        
        const ratio = currentDistance / initialDistance;
        const newScale = Math.min(Math.max(initialScale * ratio, 1), 3);
        
        setScale(newScale);
        
        const img = document.getElementById('lightbox-image');
        if (img) {
          img.style.transform = `scale(${newScale}) translate(${position.x}px, ${position.y}px)`;
        }
        
        e.preventDefault();
      } else if (e.touches.length === 1 && isDragging && scale > 1) {
        // Calculate new position with boundaries based on scale
        const maxTranslate = 100 * (scale - 1);
        const newX = Math.min(maxTranslate, Math.max(-maxTranslate, e.touches[0].clientX - dragStart.x));
        const newY = Math.min(maxTranslate, Math.max(-maxTranslate, e.touches[0].clientY - dragStart.y));
        
        setPosition({ x: newX, y: newY });
        
        const img = document.getElementById('lightbox-image');
        if (img) {
          img.style.transform = `scale(${scale}) translate(${newX}px, ${newY}px)`;
        }
        
        e.preventDefault();
      }
    };
    
    const handleTouchEnd = () => {
      setIsPinching(false);
      setIsDragging(false);
      
      // If scale is back to 1, reset position
      if (scale <= 1) {
        setPosition({ x: 0, y: 0 });
        const img = document.getElementById('lightbox-image');
        if (img) {
          img.style.transform = 'scale(1) translate(0px, 0px)';
        }
      }
    };
    
    // Handle mouse events for desktop as well
    const handleMouseDown = (e: MouseEvent) => {
      if (scale > 1) {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y
        });
        e.preventDefault();
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && scale > 1) {
        // Calculate new position with boundaries based on scale
        const maxTranslate = 100 * (scale - 1);
        const newX = Math.min(maxTranslate, Math.max(-maxTranslate, e.clientX - dragStart.x));
        const newY = Math.min(maxTranslate, Math.max(-maxTranslate, e.clientY - dragStart.y));
        
        setPosition({ x: newX, y: newY });
        
        const img = document.getElementById('lightbox-image');
        if (img) {
          img.style.transform = `scale(${scale}) translate(${newX}px, ${newY}px)`;
        }
        
        e.preventDefault();
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    // Prevent scroll/zoom on the entire page when lightbox is open
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };
    
    const lightboxElement = document.getElementById('gallery-lightbox');
    const imageElement = document.getElementById('lightbox-image-container');
    
    if (lightboxElement) {
      lightboxElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      lightboxElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      lightboxElement.addEventListener('touchend', handleTouchEnd);
      
      // Prevent default zoom behavior on double-tap
      lightboxElement.addEventListener('gesturestart', preventDefault);
      lightboxElement.addEventListener('gesturechange', preventDefault);
      lightboxElement.addEventListener('gestureend', preventDefault);
    }
    
    if (imageElement) {
      imageElement.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    // Double tap to reset zoom
    let lastTap = 0;
    const handleDoubleTap = (e: TouchEvent) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        if (scale > 1) {
          // Reset zoom
          setScale(1);
          setPosition({ x: 0, y: 0 });
          const img = document.getElementById('lightbox-image');
          if (img) {
            img.style.transform = 'scale(1) translate(0px, 0px)';
          }
        } else {
          // Zoom to 2x at touch position
          setScale(2);
          const img = document.getElementById('lightbox-image');
          if (img) {
            img.style.transform = 'scale(2) translate(0px, 0px)';
          }
        }
        e.preventDefault();
      }
      lastTap = currentTime;
    };
    
    if (imageElement) {
      imageElement.addEventListener('touchend', handleDoubleTap);
    }
    
    return () => {
      if (lightboxElement) {
        lightboxElement.removeEventListener('touchstart', handleTouchStart);
        lightboxElement.removeEventListener('touchmove', handleTouchMove);
        lightboxElement.removeEventListener('touchend', handleTouchEnd);
        lightboxElement.removeEventListener('gesturestart', preventDefault);
        lightboxElement.removeEventListener('gesturechange', preventDefault);
        lightboxElement.removeEventListener('gestureend', preventDefault);
      }
      
      if (imageElement) {
        imageElement.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        imageElement.removeEventListener('touchend', handleDoubleTap);
      }
    };
  }, [lightboxOpen, isPinching, isDragging, scale, position, dragStart]);
  
  // Reset scale and position when closing lightbox
  useEffect(() => {
    if (!lightboxOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [lightboxOpen]);

  return (
    <>
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
          <div className="container relative flex h-20 items-center px-4 pt-2 md:px-6">
            {/* Logo - left */}
            <div className="flex items-center gap-3 z-10">
              <Image
                src="/images/americantoof.png"
                alt="Company Logo"
                width={130}
                height={40}
                priority
                loading="eager"
                className="h-auto w-[130px]"
              />
            </div>

            {/* Nav - absolute center on desktop */}
            <div className="hidden md:flex absolute left-[48%] top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8">
              <a
                href="/#services"
                onClick={(e) => handleAnchorClick(e, "/#services")}
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                SERVICES
              </a>
              <a
                href="/#how-it-works"
                onClick={(e) => handleAnchorClick(e, "/#how-it-works")}
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                HOW IT WORKS
              </a>
              <a
                href="/#testimonials"
                onClick={(e) => handleAnchorClick(e, "/#testimonials")}
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                TESTIMONIALS
              </a>
              <a
                href="/#gallery"
                onClick={(e) => handleAnchorClick(e, "/#gallery")}
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                GALLERY
              </a>
              <a
                href="/#faq"
                onClick={(e) => handleAnchorClick(e, "/#faq")}
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                FAQ
              </a>
            </div>

            {/* Contact - right */}
            <div className="hidden md:flex items-center gap-4 z-10 ml-auto">
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

            {/* Hamburger menu - right on mobile */}
            <div className="flex md:hidden ml-auto z-10">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex items-center gap-3 mb-6">
                    <Image
                      src="/images/americantoof.png"
                      width={130}
                      height={40}
                      alt="American Top Roofing and Restoration Mobile Menu Logo"
                      className="h-auto w-[130px]"
                    />
                  </div>
                  <nav className="flex flex-col gap-4 py-6">
                    <a
                      href="/#services"
                      onClick={(e) => handleAnchorClick(e, "/#services")}
                      className="text-lg font-medium hover:text-blue-500"
                    >
                      Services
                    </a>
                    <a
                      href="/#how-it-works"
                      onClick={(e) => handleAnchorClick(e, "/#how-it-works")}
                      className="text-lg font-medium hover:text-blue-500"
                    >
                      How It Works
                    </a>
                    <a
                      href="/#testimonials"
                      onClick={(e) => handleAnchorClick(e, "/#testimonials")}
                      className="text-lg font-medium hover:text-blue-500"
                    >
                      Testimonials
                    </a>
                    <a
                      href="/#gallery"
                      onClick={(e) => handleAnchorClick(e, "/#gallery")}
                      className="text-lg font-medium hover:text-blue-500"
                    >
                      Gallery
                    </a>
                    <a
                      href="/#faq"
                      onClick={(e) => handleAnchorClick(e, "/#faq")}
                      className="text-lg font-medium hover:text-blue-500"
                    >
                      FAQ
                    </a>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
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
              <motion.h1 className="mb-6 text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl hero-title tracking-wider" {...fadeInUp}>
                QUALITY ROOFING SOLUTIONS <br className="hidden sm:inline" />
                FOR YOUR HOME
              </motion.h1>
              <motion.p
                className="mb-8 max-w-3xl text-lg text-gray-200 sm:text-xl"
                {...fadeInUp}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Protect and restore your biggest investment with American Top Roofing and Restoration, your trusted partner in GA. We do it better.
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
            <div className="absolute inset-0 -z-10 overflow-hidden hero-video-container">
              <iframe
                src="https://www.youtube.com/embed/JN1tuwH0k6w?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=JN1tuwH0k6w&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full object-cover"
                title="American Top Roofing and Restoration"
                loading="eager"
                style={{ border: 'none', position: 'relative', zIndex: 1 }}
              ></iframe>
              <img 
                src="/images/hero-poster.webp" 
                alt="American Top Roofing and Restoration" 
                className="absolute inset-0 h-full w-full object-cover" 
                style={{ zIndex: 0 }}
              />
            </div>
          </section>

          {/* Trusted & Certified Badges - Horizontal Row */}
          <section className="py-8 md:py-12 bg-white border-y">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center">
                <h2 className="mb-8 text-xl md:text-2xl font-medium text-center">TRUSTED & CERTIFIED</h2>
                
                {/* Logos Row - Horizontal Scroll on Mobile */}
                <div className="flex flex-row items-center justify-center gap-8 md:gap-16 w-full overflow-x-auto pb-4 px-2">
                  {/* BBB Logo */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative h-20 w-20 md:h-24 md:w-24 mb-2">
                      <Image
                        src="/images/bbb-accredited.webp"
                        alt="BBB Accredited Business"
                        fill
                        className="object-contain"
                      />
                    </div>
                    
                  </div>

                  {/* Google Guaranteed */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative h-20 w-48 md:h-24 md:w-56 mb-2">
                      <Image 
                        src="/images/google-guaranteed.webp" 
                        alt="Google Guaranteed Roofing Contractor" 
                        fill 
                        className="object-contain" 
                      />
                    </div>
                  
                  </div>

                  {/* GAF Certified */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative h-20 w-20 md:h-24 md:w-24 mb-2">
                      <Image
                        src="/images/gaf-certified.webp"
                        alt="GAF Certified Roofing Contractor"
                        fill
                        className="object-contain"
                      />
                    </div>
                    
                  </div>
                </div>

                {/* Badges Row */}
                <div className="flex flex-row flex-wrap justify-center gap-4 md:gap-8 mt-6 w-full">
                  <div className="flex items-center justify-center gap-2 bg-blue-50 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-sm">
                    <Shield className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
                    <span className="text-sm md:text-base font-medium">Warranty Provided</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 bg-blue-50 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-sm">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
                    <span className="text-sm md:text-base font-medium">Licensed & Insured</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 bg-blue-50 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-sm">
                    <Award className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
                    <span className="text-sm md:text-base font-medium">Award-Winning Service</span>
                  </div>
                </div>
              </div>
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
                <h2 className="mb-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">OUR ROOFING SERVICES</h2>
                <p className="mx-auto max-w-3xl text-gray-600">
                  We offer a comprehensive range of roofing and restoration services to meet all your needs, from repairs
                  to complete replacements.
                </p>
              </motion.div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "ROOF REPLACEMENT",
                    description: "Durable, weather-resistant roof installations using premium materials for Georgia homes — done fast, done right.",
                    image: "/images-compressed/roofreplacement.webp",
                    link: "/services/roof-replacement",
                    alt: "Professional roof replacement service in Georgia by American Top Roofing",
                  },
                  {
                    title: "ROOF REPAIRS",
                    description:
                      "Expert roof repairs in Georgia for leaks, damaged shingles, and other issues with quick response times.",
                    image: "/images-compressed/roofrepair.webp",
                    link: "/services/roof-repairs",
                    alt: "Expert roof repair service for leaks and shingles in Georgia",
                  },
                  {
                    title: "GUTTER SERVICES",
                    description: "Professional gutter installation, repairs, and gutter guard systems to protect your home from water damage.",
                    image: "/images-compressed/gutterinstall.webp",
                    link: "/services/gutter-services",
                    alt: "Professional gutter installation and repair services in Georgia",
                  },
                  {
                    title: "BATHROOM REMODELING",
                    description:
                      "Complete bathroom renovation services including fixtures, tiling, plumbing, and custom designs.",
                    image: "/images-compressed/bathroom-remodeling.webp",
                    link: "/services/bathroom-remodeling",
                    alt: "Complete bathroom remodeling service in Georgia",
                  },
                  {
                    title: "FLOORING",
                    description:
                      "Professional installation of hardwood, laminate, tile, and vinyl flooring for any room in your home.",
                    image: "/images-compressed/flooring-installation.webp",
                    link: "/services/flooring",
                    alt: "Hardwood, laminate, tile, and vinyl flooring installation in Georgia",
                  },
                  {
                    title: "PAINTING",
                    description: "Interior and exterior painting services to enhance and protect your property.",
                    image: "/images-compressed/paintingjob.webp",
                    link: "/services/painting",
                    alt: "Interior and exterior home painting service in Georgia",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="relative h-0 w-full pb-[66.67%] overflow-hidden rounded-t-lg">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.alt || service.title}
                        fill
                        className="absolute inset-0 h-full w-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-2 text-center text-2xl font-medium hero-title tracking-wider">{service.title}</h3>
                      <p className="mb-6 flex-1 text-center text-gray-600">{service.description}</p>
                      <Link
                        href={service.link}
                        className="mx-auto mt-auto rounded-md bg-blue-500 px-6 py-2 text-center font-medium text-white transition-colors hover:bg-blue-600"
                      >
                        Learn more
                      </Link>
                    </div>
                  </div>
                ))}
                
                {/* Siding service card - centered on desktop */}
                <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg lg:col-start-2 lg:col-span-1 sm:col-span-2 sm:mx-auto lg:mx-0">
                  <div className="relative h-0 w-full pb-[66.67%] overflow-hidden rounded-t-lg">
                    <Image
                      src="/images/siding.jpeg"
                      alt="Professional siding installation and repair services in Georgia"
                      fill
                      className="absolute inset-0 h-full w-full object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-center text-2xl font-medium hero-title tracking-wider">SIDING</h3>
                    <p className="mb-6 flex-1 text-center text-gray-600">Professional siding installation, repair, and replacement to boost curb appeal and energy efficiency.</p>
                    <Link
                      href="/services/siding"
                      className="mx-auto mt-auto rounded-md bg-blue-500 px-6 py-2 text-center font-medium text-white transition-colors hover:bg-blue-600"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>

              <motion.div
                className="mt-8 mb-8"
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {additionalServices.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-medium mb-4 text-center">ADDITIONAL SERVICES</h3>
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
                )}
              </motion.div>

              {/* Call to Action Section */}
              <motion.div
                className="mt-12 mx-auto max-w-3xl bg-blue-50 rounded-lg p-8 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="text-center">
                  <h3 className="mb-4 text-2xl font-bold">Ready to Transform Your Home?</h3>
                  <p className="mb-6 text-lg text-gray-700">
                    From roofing and gutters to bathroom remodeling, flooring, painting, and siding—we've got all your home improvement needs covered under one roof.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/#contact"
                      onClick={(e) => handleAnchorClick(e, "/#contact")}
                      className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105"
                    >
                      GET YOUR FREE QUOTE TODAY
                    </a>
                    <a
                      href="tel:+14709151599"
                      className="flex items-center justify-center gap-2 rounded-md bg-blue-800 px-8 py-3 text-lg font-bold text-white hover:bg-blue-700 transition-all duration-300 ease-in-out hover:scale-105"
                    >
                      <PhoneCall className="h-5 w-5" />
                      CALL US NOW
                    </a>
                  </div>
                </div>
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
                <h2 className="mb-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">HOW IT WORKS</h2>
                <p className="mx-auto max-w-3xl text-gray-600">
                  Our simple process makes getting your roof repaired or replaced easy and stress-free.
                </p>
              </motion.div>

              <div className="mx-auto max-w-5xl">
                <div className="relative">
                  <motion.div
                    className="absolute left-[15px] top-0 h-full w-[1px] bg-gray-200 md:left-1/2"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                  ></motion.div>

                  {[
                    {
                      title: "CONTACT US",
                      description:
                        "Reach out to us by phone or fill out our online form to schedule a free consultation and estimate.",
                      image: "/images/contact-us.webp",
                      alt: "Step 1: Contact American Top Roofing for a free estimate",
                    },
                    {
                      title: "FREE INSPECTION",
                      description:
                        "Our roofing experts will visit your property to assess your roofing needs and provide a detailed estimate.",
                      image: "/images/free-inspection.webp",
                      alt: "Step 2: Free roof inspection in Georgia",
                    },
                    {
                      title: "CHOOSE YOUR OPTIONS",
                      description:
                        "We'll help you select the best materials and solutions for your specific needs and budget.",
                      image: "/images/choose-options-new.webp",
                      alt: "Step 3: Choose roofing materials and options",
                    },
                    {
                      title: "PROFESSIONAL INSTALLATION",
                      description:
                        "Our experienced team will complete your roofing project with the highest standards of quality and safety.",
                      image: "/images/professional-installation-new.webp",
                      alt: "Step 4: Professional roof installation by American Top Roofing",
                    },
                    {
                      title: "FINAL INSPECTION",
                      description:
                        "We'll conduct a thorough inspection to ensure everything meets our high standards of quality.",
                      image: "/images/final-inspection.webp",
                      alt: "Step 5: Final roof inspection and quality check",
                    },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      className="relative mb-8 md:mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 50,
                      }}
                    >
                      <div className="flex md:items-center md:justify-center">
                        <motion.div
                          className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white md:absolute md:left-[calc(50%-16px)]"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
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
                            alt={step.alt || step.title}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <h3 className="mb-2 text-xl font-medium">{step.title}</h3>
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
          <section id="testimonials" className="bg-blue-900 py-16 text-white md:py-24">
            <div className="container px-4 md:px-6">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">WHAT OUR CUSTOMERS SAY</h2>
                <p className="mx-auto max-w-3xl text-blue-100">
                  Don't just take our word for it. Here's what our satisfied customers have to say about our roofing
                  services.
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "David Joseph",
                    location: "Georgia",
                    quote:
                      "American Top Roofing & Restoration LLC wrapped my home in stunning vinyl siding, boosting its curb appeal and energy efficiency. Their crew's precision and dedication to detail are truly impressive.",
                    rating: 5,
                    avatar: "/images/david-joseph.webp",
                  },
                  {
                    name: "Jacqueline May",
                    location: "Georgia",
                    quote:
                      "Had an inspection done on my roof by American Top Roofing. They found some minor issues and fixed them on the spot. I was impressed by how thorough and knowledgeable the team was. They also gave me tips on how to maintain my roof. Will be calling them again for future needs.",
                    rating: 5,
                    avatar: "/images/jacqueline-may.webp",
                  },
                  {
                    name: "Beverly Hill",
                    location: "Georgia",
                    quote:
                      "American Top Roofing delivered exceptional service. My new roof is flawless, and the crew was professional and efficient. Highly recommend!",
                    rating: 5,
                    avatar: "/images/lewis-parker.webp",
                  },
                  {
                    name: "Lewis Parker",
                    location: "Georgia",
                    quote:
                      "We had American Top Roofing paint our house and replace the siding. They were punctual and did a wonderful job. The house looks like new. The crew was friendly and cleaned up thoroughly after the job was done. Highly recommend them for any exterior work.",
                    rating: 5,
                    avatar: "/images/beverly-hill.webp",
                  },
                  {
                    name: "Seraphina Chase",
                    location: "Georgia",
                    quote:
                      "Fast roof repair! They quickly fixed the leak and left my roof looking great. Professional service!",
                    rating: 5,
                    avatar: "/images/seraphina-chase.webp",
                  },
                  {
                    name: "David Brown",
                    location: "Georgia",
                    quote:
                      "After having issues with clogged gutters, I decided to install new gutters and gutter guards with American Top Roofing. The process was seamless. They provided a detailed quote and completed the work quickly. The guards work perfectly, and I no longer have to clean out my gutters. Excellent service all around",
                    rating: 5,
                    avatar: "/images/david-brown.webp",
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
                          alt={`Customer testimonial from ${testimonial.name}`}
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
                  className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-white hover:text-blue-900 text-center"
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
                <h2 className="mb-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">OUR WORK</h2>
                <p className="mx-auto max-w-3xl text-gray-600">
                  Browse through our gallery of completed roofing projects to see the quality of our work.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[
                  {
                    image: "/images/gallery/gallery1.webp",
                    title: "Roof Replacement Project",
                    alt: "Gallery Image: Completed roof replacement by American Top Roofing in Georgia"
                  },
                  {
                    image: "/images/gallery/gallery2.webp",
                    title: "Roof Repair Project",
                    alt: "Gallery Image: Completed roof repair project in Georgia"
                  },
                  {
                    image: "/images/gallery/gallery3.webp",
                    title: "Gutter Installation Project",
                    alt: "Gallery Image: New gutter installation in Georgia"
                  },
                  {
                    image: "/images/gallery/gallery4.webp",
                    title: "Roof Inspection Project",
                    alt: "Gallery Image: Thorough roof inspection process"
                  },
                  {
                    image: "/images/gallery/gallery5.webp",
                    title: "Siding Installation Project",
                    alt: "Gallery Image: New siding installation project in Georgia"
                  },
                  {
                    image: "/images/gallery/gallery6.webp",
                    title: "Gutter Repairs Project",
                    alt: "Gallery Image: Professional gutter repair work"
                  },
                  {
                    image: "/images/gallery/gallery7.webp",
                    title: "Storm Damage Project",
                    alt: "Gallery Image: Roof repair after storm damage in Georgia"
                  },
                  {
                    image: "/images/gallery/gallery8.webp",
                    title: "Commercial Roofing Project",
                    alt: "Gallery Image: Commercial roofing project example"
                  }
                ].map((project, index) => (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden rounded-lg cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onClick={() => {
                      setSelectedImage(project.image);
                      setLightboxOpen(true);
                    }}
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={project.image}
                        alt={project.alt || project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover bg-gray-100 transition-shadow duration-300 group-hover:shadow-xl"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Lightbox */}
              {lightboxOpen && (
                <div 
                  id="gallery-lightbox"
                  className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 touch-none overscroll-none"
                  onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
                >
                  <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
                    <div 
                      className="relative w-full h-full flex items-center justify-center overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 bg-black/60 rounded-full p-2 transition-colors duration-200"
                        onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
                        style={{ pointerEvents: 'auto' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      
                      {/* Add zoom controls */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-50 bg-black/60 rounded-full p-2">
                        <button 
                          className="text-white hover:text-gray-300 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setScale(1);
                            setPosition({ x: 0, y: 0 });
                            const img = document.getElementById('lightbox-image');
                            if (img) {
                              img.style.transform = 'scale(1) translate(0px, 0px)';
                            }
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                          </svg>
                        </button>
                        <button 
                          className="text-white hover:text-gray-300 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setScale(2);
                            setPosition({ x: 0, y: 0 });
                            const img = document.getElementById('lightbox-image');
                            if (img) {
                              img.style.transform = 'scale(2) translate(0px, 0px)';
                            }
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </button>
                        <button 
                          className="text-white hover:text-gray-300 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setScale(3);
                            setPosition({ x: 0, y: 0 });
                            const img = document.getElementById('lightbox-image');
                            if (img) {
                              img.style.transform = 'scale(3) translate(0px, 0px)';
                            }
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </button>
                      </div>
                      
                      <div id="lightbox-image-container" className="w-full h-full flex items-center justify-center touch-pan-y">
                        <img
                          id="lightbox-image"
                          src={selectedImage}
                          alt="Enlarged gallery image view - American Top Roofing work example"
                          className="max-h-[90vh] max-w-[90vw] object-contain transform transition-none"
                          style={{ transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)` }}
                          onTouchStart={(e) => {
                            // Prevent default pinch behavior
                            if (e.touches.length > 1) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-12 flex justify-center">
                <a
                  href="#contact"
                  onClick={(e) => handleAnchorClick(e, "/#contact")}
                  className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-blue-600 whitespace-nowrap text-center"
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
                <h2 className="mb-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                  FREQUENTLY ASKED QUESTIONS
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
                        "Yes! All roofing services (roof repairs, roof replacement, etc.) come with a 5-year workmanship warranty, in addition to any manufacturer warranties on materials (typically 25-50 years depending on the product). For all other services—such as flooring, painting, bathroom remodeling, and similar work—we provide a 1-year workmanship warranty. Your investment is protected, and we stand behind the quality of our work.",
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
                  className="rounded-md bg-blue-500 px-6 py-3 text-lg font-bold text-white hover:bg-blue-600 text-center max-w-[90%] mx-auto"
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
                <h2 className="mb-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">GET YOUR FREE QUOTE</h2>
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
                          <option value="gutter-services">Gutter Services</option>
                          <option value="bathroom-remodeling">Bathroom Remodeling</option>
                          <option value="flooring">Flooring & Tiling</option>
                          <option value="painting">Painting</option>
                          <option value="siding">Siding</option>
                          <option value="gutter-guards">Gutter Guards</option>
                          <option value="inspection">Roof Inspection</option>
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

                      {submitError && (
                        <p className="mt-2 text-sm text-red-500">Please fix the errors above</p>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full rounded-md px-6 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out hover:scale-105 ${
                          isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                        {isSubmitting ? 'PROCESSING...' : 'GET MY FREE QUOTE'}
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
                      Proudly serving all of Georgia with quality roofing, restoration, and home improvement services.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <span>Georgia</span>
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
                    src="/images/atrrwhite.png"
                    alt="Company Logo White"
                    width={160}
                    height={50}
                    priority
                    loading="eager"
                    className="h-auto w-[160px]"
                  />
                </div>
                <p className="mb-6 text-gray-400">
                  Professional roofing services in Georgia you can trust. Serving homeowners and businesses throughout the state since 2005.
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
                    <Link href="/services/gutter-services" className="text-gray-400 hover:text-white">
                      Gutter Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/flooring" className="text-gray-400 hover:text-white">
                      Flooring & Tiling
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
    </>
  );
}
