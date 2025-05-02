"use client"

import Image from "next/image"
import Link from "next/link"
import { PhoneCall, Mail, MapPin } from "lucide-react"

// Removed handleAnchorClick from props
// interface FooterProps {
//   handleAnchorClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
// }

// Moved handleAnchorClick inside the component
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

export default function Footer(/* Removed prop: { handleAnchorClick } */) {
  return (
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
                  href="/#services"
                  onClick={(e) => handleAnchorClick(e, "/#services")}
                  className="text-gray-400 hover:text-white"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/#how-it-works"
                  onClick={(e) => handleAnchorClick(e, "/#how-it-works")}
                  className="text-gray-400 hover:text-white"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/#testimonials"
                  onClick={(e) => handleAnchorClick(e, "/#testimonials")}
                  className="text-gray-400 hover:text-white"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/#gallery"
                  onClick={(e) => handleAnchorClick(e, "/#gallery")}
                  className="text-gray-400 hover:text-white"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  onClick={(e) => handleAnchorClick(e, "/#faq")}
                  className="text-gray-400 hover:text-white"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  onClick={(e) => handleAnchorClick(e, "/#contact")}
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
  )
} 