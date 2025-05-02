"use client"

import type React from "react"
import { useState } from "react" // Keep useState in case of future interaction needs
import Image from "next/image"
import Link from "next/link"
import { PhoneCall, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"

// Smooth scroll handler for anchor links
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


export default function ServicePageHeader() {
  return (
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
              href="tel:+14709402400" // Updated Phone
              className="flex items-center gap-2 text-sm font-bold text-blue-800 hover:text-blue-600"
            >
              <PhoneCall className="h-4 w-4" />
              (470) 940-2400 {/* Updated Phone */}
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
                  href="tel:+14709402400" // Updated Phone
                  className="flex items-center gap-2 text-lg font-bold text-blue-800 hover:text-blue-600"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [-10, 10, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", repeatDelay: 3 }}
                  >
                    <PhoneCall className="h-5 w-5" />
                  </motion.div>
                  (470) 940-2400 {/* Updated Phone */}
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
  )
} 