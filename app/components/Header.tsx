"use client"

import Image from "next/image"
import Link from "next/link"
import { PhoneCall, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Header() {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    { name: "Roof Replacement", href: "/services/roof-replacement" },
    { name: "Roof Repairs", href: "/services/roof-repairs" },
    { name: "Gutter Services", href: "/services/gutter-services" },
    { name: "Bathroom Remodeling", href: "/services/bathroom-remodeling" },
    { name: "Flooring", href: "/services/flooring" },
    { name: "Painting", href: "/services/painting" },
    { name: "Siding", href: "/services/siding" },
  ];

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

  return (
    <motion.header 
      className="sticky top-0 z-40 w-full border-b bg-white"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container relative flex h-20 items-center px-4 pt-2 md:px-6">
        {/* Logo - left */}
        <div className="flex items-center gap-3 z-10">
          <Link href="/">
            <Image
              src="/images/americantoof.png"
              alt="Company Logo"
              width={130}
              height={40}
              priority
              loading="eager"
              className="h-auto w-[130px]"
            />
          </Link>
        </div>

        {/* Nav - absolute center on desktop */}
        <div className="hidden md:flex absolute left-[48%] top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8">
          {/* Services Dropdown */}
          <div 
            className="relative group"
          >
            <div className="flex items-center gap-1">
              <a
                href="/#services"
                onClick={(e) => handleAnchorClick(e, "/#services")}
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                SERVICES
              </a>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </div>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

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
                <Link href="/">
                  <Image
                    src="/images/americantoof.png"
                    width={130}
                    height={40}
                    alt="American Top Roofing and Restoration Mobile Menu Logo"
                    className="h-auto w-[130px]"
                  />
                </Link>
              </div>
              <nav className="flex flex-col gap-4 py-6">
                {/* Mobile Services Dropdown */}
                <div className="space-y-2">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-500"
                  >
                    Services
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isServicesOpen && (
                    <div className="pl-4 space-y-2">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="block text-base text-gray-600 hover:text-blue-500"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

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
    </motion.header>
  )
} 