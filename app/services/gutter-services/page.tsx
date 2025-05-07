"use client"

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneCall, ChevronLeft } from "lucide-react";
import Footer from "../../components/Footer";
import ServicePageHeader from "../../components/ServicePageHeader";
import { motion } from "framer-motion";

export default function GutterServicesPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  // This function is for the local anchor links within this page
  const handleLocalAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth'});
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <ServicePageHeader />

      <main className="flex-1">
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
              {...fadeInUp}
            >
              Complete Gutter Solutions
            </motion.h1>
            <motion.p
              className="mb-8 max-w-3xl text-lg text-gray-200 sm:text-xl"
              {...fadeInUp}
              transition={{ delay: 0.2, ...fadeInUp.transition }}
            >
              Professional gutter installation, repairs, and gutter guard systems to protect your Georgia home from water damage.
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
              src="/images/gutter-repair-service.webp"
              alt="Professional gutter services by American Top Roofing"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <Link href="/#services" className="mb-8 flex items-center text-blue-500 hover:text-blue-600">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to all services
              </Link>

              <div className="mb-12">
                <h2 className="mb-6 text-3xl font-bold">Your Complete Gutter Solution Provider in Georgia</h2>
                <p className="mb-4 text-lg text-gray-700">
                  Your gutter system is crucial for protecting your home from water damage. At American Top Roofing and Restoration, we offer comprehensive gutter services including expert installation, repairs, and gutter guard systems to ensure your property remains protected year-round from Georgia's heavy rainfall.
                </p>
                <p className="mb-4 text-lg text-gray-700">
                  Whether you need a brand new seamless gutter system, repairs to your existing gutters, or protection from debris with quality gutter guards, our experienced technicians provide reliable solutions tailored to your home's specific needs. We service properties throughout Georgia, using only premium materials and proven techniques to deliver lasting protection for your investment.
                </p>
              </div>
              
              {/* Services Navigation */}
              <div className="mb-10 flex flex-wrap gap-4 justify-center">
                <a href="#installation" onClick={(e) => handleLocalAnchorClick(e, "#installation")} className="px-5 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors font-medium">
                  Gutter Installation
                </a>
                <a href="#repairs" onClick={(e) => handleLocalAnchorClick(e, "#repairs")} className="px-5 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors font-medium">
                  Gutter Repairs
                </a>
                <a href="#guards" onClick={(e) => handleLocalAnchorClick(e, "#guards")} className="px-5 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors font-medium">
                  Gutter Guards
                </a>
              </div>

              {/* Gutter Installation Section */}
              <div id="installation" className="mb-16 scroll-mt-24">
                <h3 className="mb-4 text-2xl font-bold">Professional Gutter Installation</h3>
                <div className="mb-6">
                  <p className="mb-4 text-lg text-gray-700">
                    Our expert gutter installation services provide a complete solution for protecting your home. We custom-fit durable, seamless gutters that effectively channel water away from your foundation, preventing costly damage to your property.
                  </p>
                  <p className="mb-4 text-lg text-gray-700">
                    Our installation process includes precise measurements, proper pitch calculation, and strategic downspout placement to ensure optimal water flow and drainage.
                  </p>
                </div>
                
                <h4 className="mb-3 text-xl font-medium">Gutter Installation Options:</h4>
                <div className="grid gap-6 mb-8 md:grid-cols-2">
                  <div className="rounded-lg border p-5">
                    <h5 className="mb-2 text-lg font-bold">Seamless Gutters</h5>
                    <p className="text-gray-700">
                      Custom-fabricated on-site to the exact measurements of your home, eliminating joints and reducing leak potential.
                    </p>
                  </div>
                  <div className="rounded-lg border p-5">
                    <h5 className="mb-2 text-lg font-bold">K-Style Gutters</h5>
                    <p className="text-gray-700">
                      Decorative front design resembling crown molding with higher water capacity for areas with heavy rainfall.
                    </p>
                  </div>
                  <div className="rounded-lg border p-5">
                    <h5 className="mb-2 text-lg font-bold">Half-Round Gutters</h5>
                    <p className="text-gray-700">
                      Classic, semi-circular design that complements historic and traditional homes in Georgia.
                    </p>
                  </div>
                  <div className="rounded-lg border p-5">
                    <h5 className="mb-2 text-lg font-bold">Material Options</h5>
                    <p className="text-gray-700">
                      Available in aluminum, copper, and steel with various color options to match your home's exterior.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Gutter Repairs Section */}
              <div id="repairs" className="mb-16 scroll-mt-24">
                <h3 className="mb-4 text-2xl font-bold">Expert Gutter Repairs</h3>
                <p className="mb-4 text-lg text-gray-700">
                  Damaged or malfunctioning gutters can lead to significant water damage to your home's foundation, siding,
                  and landscaping. Our technicians quickly diagnose and fix a comprehensive range of gutter issues, from minor leaks to significant structural problems.
                </p>

                <h4 className="mb-3 text-xl font-medium">Common Gutter Problems We Fix:</h4>
                <ul className="mb-8 space-y-3 text-lg text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Leaking gutter seams and joints causing foundation saturation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Gutters sagging or pulling away from the roofline</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Clogged gutters and downspouts leading to overflows</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Holes, cracks, and rust spots compromising gutter integrity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Improperly pitched gutters causing water pooling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Damaged, disconnected, or missing downspouts</span>
                  </li>
                </ul>
              </div>
              
              {/* Gutter Guards Section */}
              <div id="guards" className="mb-16 scroll-mt-24">
                <h3 className="mb-4 text-2xl font-bold">Premium Gutter Guard Systems</h3>
                <p className="mb-6 text-lg text-gray-700">
                  Stop cleaning gutters forever with our professional gutter guard installation. Our protection systems keep leaves, pine needles, and debris out while allowing water to flow freely through your gutters.
                </p>
                
                <div className="grid gap-6 mb-8 md:grid-cols-2">
                  <div className="rounded-lg bg-blue-50 p-6">
                    <h4 className="mb-3 text-xl font-bold">Benefits of Gutter Guards</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500 font-bold">•</span>
                        <span>Eliminate gutter cleaning maintenance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500 font-bold">•</span>
                        <span>Prevent clogs and water overflow</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500 font-bold">•</span>
                        <span>Reduce risk of rust and corrosion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500 font-bold">•</span>
                        <span>Prevent pest nesting in gutters</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500 font-bold">•</span>
                        <span>Extend the lifespan of your gutter system</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-6">
                    <h4 className="mb-3 text-xl font-bold">Our Guard Systems</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500 font-bold">•</span>
                        <span>Mesh guards for maximum debris blocking</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500 font-bold">•</span>
                        <span>Surface tension systems for seamless protection</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500 font-bold">•</span>
                        <span>Foam inserts for affordable protection</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500 font-bold">•</span>
                        <span>Compatible with all gutter types</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500 font-bold">•</span>
                        <span>Professional installation for optimal performance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="mb-4 text-2xl font-bold">Our Gutter Process</h3>
                <ol className="mb-6 space-y-6 text-lg text-gray-700">
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      1
                    </span>
                    <div>
                      <h4 className="font-bold">Thorough Inspection & Assessment</h4>
                      <p>We evaluate your current gutter system and your home's specific needs, considering factors like roof size, local rainfall patterns, and property layout.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      2
                    </span>
                    <div>
                      <h4 className="font-bold">Detailed Proposal & Estimate</h4>
                      <p>
                        We provide a clear, detailed explanation of our recommended solution with transparent pricing options.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      3
                    </span>
                    <div>
                      <h4 className="font-bold">Professional Installation or Repair</h4>
                      <p>Our skilled technicians perform the work efficiently using premium materials and industry-leading techniques.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      4
                    </span>
                    <div>
                      <h4 className="font-bold">System Testing & Quality Check</h4>
                      <p>We thoroughly test the completed system to ensure proper water flow, followed by a comprehensive cleanup.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="mb-12">
                <h3 className="mb-4 text-2xl font-bold">Benefits of Professional Gutter Services</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg border p-6">
                    <h4 className="mb-2 text-xl font-bold">Prevent Costly Water Damage</h4>
                    <p className="text-gray-700">
                      Properly functioning gutters are crucial for directing water away from your home, preventing expensive damage to your
                      foundation, siding, roof fascia, and landscaping in Georgia's rainy climate.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h4 className="mb-2 text-xl font-bold">Complete Protection System</h4>
                    <p className="text-gray-700">
                      Our integrated approach ensures your gutters, downspouts, and guards work together as a complete system to channel water safely away from your home.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h4 className="mb-2 text-xl font-bold">Maintenance Reduction</h4>
                    <p className="text-gray-700">
                      With proper installation and gutter guards, you'll significantly reduce or eliminate the need for regular gutter cleaning and maintenance.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h4 className="mb-2 text-xl font-bold">Enhance Curb Appeal & Value</h4>
                    <p className="text-gray-700">
                      New or well-maintained gutters enhance the overall appearance of your home and add to its market value.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-8">
                <h3 className="mb-4 text-2xl font-bold text-center">Complete Gutter Solutions for Your Georgia Home</h3>
                <p className="mb-6 text-center text-lg">
                   Contact us today for your free gutter assessment and detailed estimate!
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/#contact"
                    className="rounded-md bg-blue-500 px-8 py-3 text-center text-lg font-bold text-white hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    GET A FREE QUOTE
                  </Link>
                  <a
                    href="tel:+14709402400"
                    className="flex items-center justify-center gap-2 rounded-md bg-blue-800 px-8 py-3 text-lg font-bold text-white hover:bg-blue-700 transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    <PhoneCall className="h-5 w-5" />
                    CALL (470) 940-2400
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 