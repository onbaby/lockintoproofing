import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { PhoneCall, Mail, MapPin, Menu, ChevronLeft, CheckCircle, Home, Wrench, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Footer from "../../components/Footer"
import { Metadata } from 'next'
import { MotionDiv, MotionLink } from "@/app/components/MotionWrappers"

// Page-specific Metadata
export const metadata: Metadata = {
  title: "Roof Repair Services | Forsyth County GA | American Top Roofing",
  description: "Fast & reliable roof repair in Forsyth County (Cumming, Buford, Suwanee). American Top Roofing fixes leaks, missing shingles, storm damage & more. Get a free repair estimate!",
  keywords: ["roof repair", "roof leak repair", "shingle repair", "storm damage roof", "emergency roof repair", "forsyth county roofing repair", "cumming ga roof repair", "buford ga roof repair", "suwanee ga roof repair", "american top roofing"],
};

const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  if (href.startsWith('/#')) {
    const targetId = href.substring(2);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  } else if (href.startsWith('#')) {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    window.location.href = href;
  }
};

export default function RoofRepairsPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header START */}
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
                    src="/images/new-logo.png"
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
      {/* Header END */}

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
              {...fadeInUp}
            >
              Roof Repair Services
            </MotionDiv>
            <MotionDiv
              className="mb-8 max-w-3xl text-lg text-gray-200 sm:text-xl"
              {...fadeInUp} transition={{ delay: 0.2, duration: 0.5 }}
            >
              Expert repairs for leaks, missing shingles, storm damage, and more in Cumming, Buford, Suwanee & surrounding areas. Quick response times!
            </MotionDiv>
            <MotionDiv
              {...fadeInUp} transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                href="/#contact"
                className="rounded-md bg-blue-500 px-8 py-3 text-center text-lg font-bold text-white hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105"
              >
                GET A FREE REPAIR ESTIMATE
              </Link>
            </MotionDiv>
          </MotionDiv>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image src="/images/roof-repair-service.webp" alt="Roof repair technician fixing shingles in Forsyth County" fill className="object-cover" priority />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <MotionDiv {...fadeInUp}>
                <div className="mb-8">
                  <Link href="/#services" className="flex items-center text-blue-500 hover:text-blue-600">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to all services
                  </Link>
                </div>

                <h2 className="text-3xl font-bold tracking-tight mb-6 sm:text-4xl">Common Roof Problems We Repair in Forsyth County</h2>
                <p className="mb-6 text-lg text-gray-700">
                  Don't let minor roof damage turn into major problems! American Top Roofing provides prompt, professional roof repair services across Forsyth County, including Cumming, Buford, Suwanee, Alpharetta, and Gainesville. We handle a wide range of issues to restore the integrity of your roof and protect your home.
                </p>

                <div className="grid gap-8 md:grid-cols-2 mb-8">
                  <div className="flex items-start gap-4">
                    <Wrench className="mt-1 h-8 w-8 flex-shrink-0 text-blue-500" />
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Roof Leak Repair</h3>
                      <p className="text-gray-600">Locating and fixing leaks caused by damaged shingles, flashing issues, or worn sealant to prevent water damage.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Wrench className="mt-1 h-8 w-8 flex-shrink-0 text-blue-500" />
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Missing or Damaged Shingle Replacement</h3>
                      <p className="text-gray-600">Replacing shingles that are cracked, curled, missing, or damaged by wind or hail.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Wrench className="mt-1 h-8 w-8 flex-shrink-0 text-blue-500" />
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Flashing Repair & Replacement</h3>
                      <p className="text-gray-600">Repairing or replacing damaged flashing around chimneys, vents, and skylights to seal vulnerable areas.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Wrench className="mt-1 h-8 w-8 flex-shrink-0 text-blue-500" />
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Storm Damage Repair</h3>
                      <p className="text-gray-600">Addressing damage caused by high winds, hail, or fallen debris, including emergency tarping if needed.</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold tracking-tight mb-4 mt-10">Why Address Roof Repairs Promptly?</h3>
                <ul className="list-disc space-y-2 pl-6 mb-6 text-gray-700">
                  <li><strong>Prevent Further Damage:</strong> Small leaks can lead to mold, rot, and structural issues if ignored.</li>
                  <li><strong>Maintain Energy Efficiency:</strong> Damaged roofs can compromise insulation and increase energy costs.</li>
                  <li><strong>Extend Roof Lifespan:</strong> Timely repairs can help you avoid premature roof replacement.</li>
                  <li><strong>Protect Home Value:</strong> A well-maintained roof is crucial for your property's value.</li>
                </ul>

                <h3 className="text-2xl font-bold tracking-tight mb-4 mt-8">Our Roof Repair Process</h3>
                <ol className="list-decimal space-y-4 pl-6 mb-8 text-gray-700">
                  <li><strong>Inspection:</strong> We thoroughly inspect your roof to identify the source and extent of the damage.</li>
                  <li><strong>Assessment & Quote:</strong> We explain the necessary repairs and provide a clear, upfront estimate.</li>
                  <li><strong>Repair Work:</strong> Our skilled technicians perform the repairs using quality materials and proven techniques.</li>
                  <li><strong>Cleanup:</strong> We ensure the work area is clean and tidy upon completion.</li>
                </ol>

                <div className="mt-12 rounded-lg bg-blue-50 p-8">
                  <h3 className="text-2xl font-bold tracking-tight mb-6 text-center">Why Choose American Top Roofing for Repairs in Forsyth County?</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                      <Clock className="h-10 w-10 mb-3 text-blue-600" />
                      <h4 className="font-semibold mb-1">Fast Response</h4>
                      <p className="text-sm text-gray-600">We prioritize repair calls, especially for active leaks or storm damage.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Shield className="h-10 w-10 mb-3 text-blue-600" />
                      <h4 className="font-semibold mb-1">Quality Workmanship</h4>
                      <p className="text-sm text-gray-600">Experienced technicians ensure repairs are done right the first time.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <CheckCircle className="h-10 w-10 mb-3 text-blue-600" />
                      <h4 className="font-semibold mb-1">Honest Assessments</h4>
                      <p className="text-sm text-gray-600">We recommend only necessary repairs and provide fair pricing.</p>
                    </div>
                  </div>
                </div>

                <MotionDiv
                  className="mt-12 text-center"
                  {...fadeInUp} transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Link
                    href="/#contact"
                    className="rounded-md bg-blue-500 px-8 py-3 text-lg font-bold text-white hover:bg-blue-600 transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    Schedule Your Roof Repair Estimate!
                  </Link>
                </MotionDiv>
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* REMOVED Contact Form Section */}
        {/* <section id="contact-service" className="bg-gray-50 py-16 md:py-24"> ... </section> */}
      </main>

      <Footer />
    </div>
  )
}
