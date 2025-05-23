"use client"

import React, { useState, useEffect } from "react";
import { PhoneCall, Mail, MessageCircle, ChevronUp } from "lucide-react";

export default function BottomBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Small delay before showing the bar for a better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    // Function to handle scroll events
    const handleScroll = () => {
      // Show scroll-to-top button when user has scrolled down 2000px
      if (window.scrollY > 2000) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup functions
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll to top
  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Scroll to top button - fixed position */}
      <button
        onClick={scrollToTop}
        className={`fixed top-4 right-4 z-50 bg-blue-900 border rounded-full shadow-lg flex items-center justify-center p-3 text-white transition-all duration-300 ease-in-out hover:bg-blue-800 ${
          showScrollTop 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      {/* Mobile bottom action bar */}
      <nav
        className={`fixed bottom-4 right-4 z-50 bg-white border shadow-lg flex items-center justify-center rounded-full py-2 px-6 text-blue-900 transition-all duration-500 ease-in-out ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-16"
        }`}
        role="navigation"
        aria-label="Quick actions"
      >
        {/* Call */}
        <a
          href="tel:+14709151599"
          className="flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 rounded-full py-1.5 px-3 mx-1 text-center"
          aria-label="Call us"
        >
          <PhoneCall className="h-5 w-5 mb-0.5" />
          <span className="text-xs font-medium">Call</span>
        </a>
        
        {/* Text */}
        <a
          href="sms:+14709151599"
          className="flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 rounded-full py-1.5 px-3 mx-1 text-center"
          aria-label="Text us"
        >
          <MessageCircle className="h-5 w-5 mb-0.5" />
          <span className="text-xs font-medium">Text</span>
        </a>
        
        {/* Email */}
        <a
          href="mailto:americantoproofingllc@gmail.com"
          className="flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 rounded-full py-1.5 px-3 mx-1 text-center"
          aria-label="Email us"
        >
          <Mail className="h-5 w-5 mb-0.5" />
          <span className="text-xs font-medium">Email</span>
        </a>
      </nav>
    </>
  );
} 