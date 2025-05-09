import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { PhoneCall, Mail, Clock, MapPin, Star, Menu, CheckCircle, AlertCircle, ChevronLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Footer from "../../components/Footer"
import { Metadata } from 'next'
import RoofReplacementContactForm from "./RoofReplacementContactForm"
import { MotionDiv, MotionLink } from "@/app/components/MotionWrappers"

// Page-specific Metadata
export const metadata: Metadata = {
  title: "Roof Replacement Services | Georgia | American Top Roofing",
  description: "Need a new roof in Georgia? American Top Roofing offers expert roof replacement services with quality materials and warranties. Get your free estimate!",
  keywords: ["roof replacement", "new roof", "roof installation", "georgia roofing", "georgia roof replacement", "american top roofing"],
  alternates: {
    canonical: 'https://www.americantoproofingandrestoration.com/services/roof-replacement'
  }
};

export default function RoofReplacementPage() {
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
              src="/images/atrar3flag.png"
              width={140}
              height={45}
              alt="American Top Roofing and Restoration Logo"
              className="h-auto w-[140px]"
            />
          </Link>

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
                    src="/images/atrar3flag.png"
                    width={120}
                    height={40}
                    alt="American Top Roofing and Restoration Logo"
                    className="h-auto w-[120px]"
                  />
                </Link>
              </div>
              <nav className="flex flex-col gap-4 py-6">
                <a href="/#services" className="text-lg font-medium hover:text-blue-500">Services</a>
                <a href="/#how-it-works" className="text-lg font-medium hover:text-blue-500">How It Works</a>
                <a href="/#testimonials" className="text-lg font-medium hover:text-blue-500">Testimonials</a>
                <a href="/#gallery" className="text-lg font-medium hover:text-blue-500">Gallery</a>
                <a href="/#faq" className="text-lg font-medium hover:text-blue-500">FAQ</a>
                <div className="mt-4 flex flex-col gap-4">
                  <MotionLink
                    href="tel:+14709151599"
                    className="flex items-center gap-2 text-lg font-bold text-blue-800 hover:text-blue-600"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MotionDiv
                      animate={{ rotate: [-10, 10, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", repeatDelay: 3 }}
                    >
                      <PhoneCall className="h-5 w-5" />
                    </MotionDiv>
                    (470) 915-1599
                  </MotionLink>
                  <a
                    href="/#contact"
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
          <MotionDiv
            className="relative mx-auto flex min-h-[400px] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center text-white md:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <MotionDiv
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl hero-title tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Roof Replacement Experts Serving All of Georgia
            </MotionDiv>
            <MotionDiv
              className="mb-8 max-w-3xl text-lg text-gray-200 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Protect your home with a high-quality new roof from American Top Roofing.
              Durable, weather-resistant roof installations using premium materials — done fast, done right.
            </MotionDiv>
            <MotionDiv
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
            </MotionDiv>
          </MotionDiv>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image src="/images/replacement.webp" alt="Professional roof replacement service in Georgia" fill className="object-cover" priority />
          </div>
        </section>

        {/* Main Content H1 */}
        <h1 className="sr-only">Roof Replacement Services in Georgia - American Top Roofing and Restoration</h1>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-8">
                  <Link href="/#services" className="flex items-center text-blue-500 hover:text-blue-600">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to all services
                  </Link>
                </div>

                <h2 className="text-3xl font-bold tracking-tight mb-6 sm:text-4xl">Your Trusted Roof Replacement Contractor in Georgia</h2>
                <p className="mb-6 text-lg text-gray-700">
                  We provide comprehensive roof replacement services throughout Georgia. We pride ourselves on quality workmanship, top-tier materials, and customer satisfaction.
                </p>

                <h3 className="text-2xl font-bold tracking-tight mb-4 mt-8">Signs You Might Need a New Roof</h3>
                <ul className="list-disc space-y-2 pl-6 mb-6 text-gray-700">
                  <li>Roof age exceeding 20-25 years (for typical asphalt shingles)</li>
                  <li>Widespread curling, cracking, or missing shingles</li>
                  <li>Significant granule loss (check gutters for shingle granules)</li>
                  <li>Evidence of water damage or leaks in your attic or ceilings</li>
                  <li>Sagging roof deck or rafters</li>
                  <li>Storm damage (hail, wind) affecting a large portion of the roof</li>
                </ul>
                <p className="mb-6 text-gray-700">
                  If you notice any of these signs, contact American Top Roofing for a <Link href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">free roof inspection</Link> in Georgia. We'll provide an honest assessment and recommend the best course of action, whether it's repair or a full replacement.
                </p>

                <h3 className="text-2xl font-bold tracking-tight mb-4 mt-8">Our Roof Replacement Process in Georgia</h3>
                <ol className="list-decimal space-y-4 pl-6 mb-6 text-gray-700">
                  <li>
                    <strong>Free Consultation & Estimate:</strong> We discuss your needs, inspect your current roof thoroughly, and provide a detailed, transparent estimate for your new roof installation.
                  </li>
                  <li>
                    <strong>Material Selection:</strong> Choose from a wide range of high-quality roofing materials (asphalt shingles, metal, etc.) that suit your home's style and budget. We partner with leading manufacturers like GAF.
                  </li>
                  <li>
                    <strong>Preparation:</strong> We protect your property (landscaping, siding, etc.) before carefully removing your old roof down to the decking.
                  </li>
                  <li>
                    <strong>Deck Inspection & Repair:</strong> We inspect the roof decking for any damage and make necessary repairs to ensure a solid foundation for your new roof.
                  </li>
                  <li>
                    <strong>Installation:</strong> Our certified crews install underlayment, flashing, and your chosen roofing materials according to manufacturer specifications and best practices.
                  </li>
                  <li>
                    <strong>Cleanup & Final Inspection:</strong> We thoroughly clean the job site, removing all debris. A final inspection ensures everything meets our high standards and your satisfaction.
                  </li>
                </ol>

                <h3 className="text-2xl font-bold tracking-tight mb-4 mt-8">Benefits of a New Roof Installation</h3>
                <ul className="list-disc space-y-2 pl-6 mb-6 text-gray-700">
                  <li>Enhanced Protection: Superior defense against leaks, wind, hail, and other weather elements.</li>
                  <li>Improved Energy Efficiency: Modern materials can reduce heat transfer, potentially lowering energy bills.</li>
                  <li>Increased Home Value: A new roof is a significant selling point and can boost your property value.</li>
                  <li>Boosted Curb Appeal: Update your home's look with fresh, modern roofing materials.</li>
                  <li>Peace of Mind: Enjoy years of worry-free protection backed by material and workmanship warranties.</li>
                </ul>

                <h3 className="text-2xl font-bold tracking-tight mb-4 mt-8">Roofing Materials We Offer</h3>
                <p className="mb-6 text-gray-700">
                  We offer a variety of high-quality roofing materials for your replacement project in Georgia, including:
                </p>
                <ul className="list-disc space-y-2 pl-6 mb-6 text-gray-700">
                  <li><strong>Asphalt Shingles:</strong> The most popular choice, available in various styles and colors (including architectural shingles). Brands like GAF offer excellent durability and warranties.</li>
                  <li><strong>Metal Roofing:</strong> Known for longevity, energy efficiency, and modern aesthetics. Available in standing seam and other profiles.</li>
                </ul>
                <p className="mb-8 text-gray-700">
                  Our team will help you choose the best material based on your budget, desired look, and home's architectural style.
                </p>

                <h3 className="text-2xl font-bold tracking-tight mb-4 mt-8">Why Choose American Top Roofing for Your Replacement?</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                    <div>
                      <h4 className="font-bold">Local Expertise</h4>
                      <p className="text-gray-600">Deep knowledge of Georgia building codes and weather patterns.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                    <div>
                      <h4 className="font-bold">Quality Materials</h4>
                      <p className="text-gray-600">We partner with top manufacturers like GAF for durable, long-lasting roofs.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                    <div>
                      <h4 className="font-bold">Certified Installers</h4>
                      <p className="text-gray-600">Our experienced crews ensure proper installation for maximum performance.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                    <div>
                      <h4 className="font-bold">Warranty Protection</h4>
                      <p className="text-gray-600">Strong manufacturer and workmanship warranties for peace of mind.</p>
                    </div>
                  </div>
                </div>
                <MotionDiv
                  className="mt-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Link
                    href="/#contact"
                    className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    Get Your Free Roof Replacement Estimate Today!
                  </Link>
                </MotionDiv>
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-service" className="bg-gray-50 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Request Your Free Roof Replacement Estimate</h2>
              <p className="mt-4 text-lg text-gray-600">Fill out the form below, and our Georgia roofing team will contact you shortly.</p>
            </div>
            <div className="mx-auto max-w-xl">
              <RoofReplacementContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
