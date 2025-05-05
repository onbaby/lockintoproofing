import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PhoneCall, ChevronLeft } from "lucide-react";
import Footer from "../../components/Footer";
import ServicePageHeader from "../../components/ServicePageHeader";
import { MotionDiv } from "@/app/components/MotionWrappers";

export const metadata: Metadata = {
  title: "Gutter Repair Services | American Top Roofing",
  description: "American Top Roofing offers professional gutter repair services across Georgia. Fix leaks, clogs & sagging gutters statewide. Free Estimate!",
  keywords: ["gutter repair", "gutter services", "rain gutters", "gutter maintenance", "Georgia", "Forsyth County", "Cumming", "Buford", "Suwanee", "Gainesville", "Alpharetta", "Atlanta", "roofing contractor", "American Top Roofing"],
};

export default function GutterRepairsPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <ServicePageHeader />

      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 bg-black/50" />
          <MotionDiv
            className="relative mx-auto flex min-h-[400px] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center text-white md:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <MotionDiv {...fadeInUp}>
              <h1
                className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              >
                Gutter Repair Services in Georgia
              </h1>
            </MotionDiv>
            <MotionDiv {...fadeInUp} transition={{ delay: 0.2, ...fadeInUp.transition }}>
              <p
                className="mb-8 max-w-3xl text-lg text-gray-200 sm:text-xl"
              >
                Reliable gutter repairs available statewide in Georgia to prevent water damage and protect your home's foundation.
              </p>
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
            <Image
              src="/images/gutter-repair-service.webp"
              alt="Gutter repair service in Forsyth County by American Top Roofing"
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
                <h2 className="mb-6 text-3xl font-bold">Your Trusted Gutter Repair Experts in Georgia</h2>
                <p className="mb-4 text-lg text-gray-700">
                  Damaged or malfunctioning gutters can lead to significant water damage to your home's foundation, siding,
                  and landscaping. At American Top Roofing and Restoration, we provide expert gutter repair services across Georgia to
                  ensure your gutter system functions properly and protects your property investment from costly water damage.
                </p>
                <p className="mb-4 text-lg text-gray-700">
                  Our experienced technicians can quickly diagnose and fix a comprehensive range of gutter issues, from minor leaks and
                  clogs to significant structural problems impacting homes anywhere in Georgia. We utilize high-quality materials and proven repair techniques to deliver durable,
                  lasting repairs that will keep your gutters performing effectively for years to come, safeguarding your home.
                </p>
              </div>

              <div className="mb-12">
                <h3 className="mb-4 text-2xl font-bold">Common Gutter Problems We Fix Across Georgia</h3>
                <ul className="mb-6 space-y-3 text-lg text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Leaking gutter seams and joints causing foundation saturation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Gutters sagging or pulling away from the roofline due to weight or damage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Clogged gutters and downspouts leading to overflows and water backup</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Holes, cracks, and rust spots compromising gutter integrity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Improperly pitched gutters causing water pooling and ineffective drainage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✓</span>
                    <span>Damaged, disconnected, or missing downspouts affecting water diversion</span>
                  </li>
                </ul>
              </div>

              <div className="mb-12">
                <h3 className="mb-4 text-2xl font-bold">Our Georgia Gutter Repair Process</h3>
                <ol className="mb-6 space-y-6 text-lg text-gray-700">
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      1
                    </span>
                    <div>
                      <h4 className="font-bold">Thorough Inspection</h4>
                      <p>We conduct a comprehensive assessment of your entire gutter system anywhere in Georgia to identify all issues accurately.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      2
                    </span>
                    <div>
                      <h4 className="font-bold">Detailed Repair Plan & Estimate</h4>
                      <p>
                        We provide a clear, detailed explanation of the problems found and recommend the most effective, cost-efficient repair
                        solutions for your Georgia home.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      3
                    </span>
                    <div>
                      <h4 className="font-bold">Professional Gutter Repairs</h4>
                      <p>Our skilled technicians perform efficient repairs using top-quality materials and industry-leading techniques, ensuring longevity.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                      4
                    </span>
                    <div>
                      <h4 className="font-bold">System Testing & Cleanup</h4>
                      <p>We thoroughly test the repaired gutter system to guarantee proper water flow and drainage, followed by a meticulous site cleanup.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="mb-12">
                <h3 className="mb-4 text-2xl font-bold">Benefits of Professional Gutter Repairs in Georgia</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg border p-6">
                    <h4 className="mb-2 text-xl font-bold">Prevent Costly Water Damage</h4>
                    <p className="text-gray-700">
                      Properly functioning gutters are crucial for directing water away from your home, preventing expensive damage to your
                      foundation, siding, roof fascia, and landscaping in areas prone to heavy rain.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h4 className="mb-2 text-xl font-bold">Extend Gutter System Lifespan</h4>
                    <p className="text-gray-700">
                      Timely repairs and routine maintenance can significantly extend the operational life of your gutter system, saving
                      you money on premature replacement costs.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h4 className="mb-2 text-xl font-bold">Prevent Pest Infestations</h4>
                    <p className="text-gray-700">
                      Clogged or damaged gutters create attractive damp environments for pests like mosquitoes and termites. Prompt repairs eliminate these potential breeding grounds.
                    </p>
                  </div>
                  <div className="rounded-lg border p-6">
                    <h4 className="mb-2 text-xl font-bold">Enhance Curb Appeal & Value</h4>
                    <p className="text-gray-700">
                      Well-maintained, functional gutters significantly enhance the overall appearance of your home and contribute positively to its resale value.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-8">
                <h3 className="mb-4 text-2xl font-bold text-center">Need Gutter Repairs Anywhere in Georgia?</h3>
                <p className="mb-6 text-center text-lg">
                   Contact us today for your free gutter inspection and detailed repair estimate!
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
