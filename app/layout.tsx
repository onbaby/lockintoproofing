import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import BottomBar from "@/app/components/BottomBar"
import ScrollToTopButton from "@/app/components/ScrollToTopButton"

const inter = Inter({ subsets: ["latin"] })

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "American Top Roofing and Restoration",
  "image": "https://www.americantoproofingandrestoration.com/images/new-logo.png", // Replace with absolute URL if possible
  "@id": "", // Add your website URL here if you have one
  "url": "https://www.americantoproofingandrestoration.com", // Add your website URL here
  "telephone": "+14709151599",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3332 Stone point way",
    "addressLocality": "Buford", // Assuming based on service area, adjust if needed
    "addressRegion": "GA",
    "postalCode": "", // Add zip code if available
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 0, // Add latitude if known
    "longitude": 0 // Add longitude if known
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "16:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "",
      "closes": "" // Closed on Sunday
    }
  ],
  "areaServed": [
      {
        "@type": "State",
        "name": "Georgia"
      },
      {
        "@type": "City",
        "name": "Cumming"
      },
      {
        "@type": "City",
        "name": "Buford"
      },
      {
        "@type": "City",
        "name": "Suwanee"
      },
      {
        "@type": "City",
        "name": "Gainesville"
      },
      {
        "@type": "City",
        "name": "Alpharetta"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Forsyth County"
      }
    ]
};

export const metadata = {
  title: "ATR&R | Roofing & Restoration Services Throughout Georgia",
  description:
    "From Roof Replacement & Gutter Repairs to Bathroom Remodeling—American Top Roofing & Restoration Serves All of Georgia. Get a Free Quote!",
  generator: 'v0.dev',
  metadataBase: new URL('https://americantoproofing.com'),
  alternates: {
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.ico', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: '180x180', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/favicon.ico', sizes: '180x180', type: 'image/png' },
    ],
  },
  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.americantoproofingandrestoration.com',
    siteName: 'American Top Roofing & Restoration',
    title: 'ATR&R | Roofing & Restoration Services Throughout Georgia',
    description: 'From Roof Replacement & Gutter Repairs to Bathroom Remodeling—American Top Roofing & Restoration Serves All of Georgia. Get a Free Quote!',
    images: [
      {
        url: '/images-compressed/new-logo.webp',
        width: 1200,
        height: 630,
        alt: 'American Top Roofing & Restoration',
      },
    ],
    // Facebook specific
    fb: {
      app_id: '61555812785754',
      page_id: '61555812785754',
    },
  },
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'ATR&R | Roofing & Restoration Services Throughout Georgia',
    description: 'From Roof Replacement & Gutter Repairs to Bathroom Remodeling—American Top Roofing & Restoration Serves All of Georgia. Get a Free Quote!',
    images: ['/images-compressed/new-logo.webp'],
    creator: '@americantoproofing',
    site: '@americantoproofing',
  },
  // Additional meta tags
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  keywords: 'roofing, restoration, Georgia, roof replacement, gutter repairs, bathroom remodeling, Georgia roofing, Georgia restoration, Georgia contractors, Georgia home services',
  author: 'American Top Roofing & Restoration',
  publisher: 'American Top Roofing & Restoration',
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  // Social media links
  other: {
    'facebook:page': 'https://www.facebook.com/people/American-Top-Roofing-LLC/61555812785754/?sk=reviews',
    'instagram:page': 'https://www.instagram.com/american_top_roofing_llc/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon/android-chrome-192x192.png" sizes="192x192" />
        <link rel="icon" type="image/png" href="/favicon/android-chrome-512x512.png" sizes="512x512" />
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="canonical" href="https://www.americantoproofingandrestoration.com/" />
        
        {/* Facebook Meta Tags */}
        <meta property="fb:app_id" content="61555812785754" />
        <meta property="fb:page_id" content="61555812785754" />
        <meta property="og:url" content="https://www.americantoproofingandrestoration.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ATR&R | Roofing & Restoration Services Throughout Georgia" />
        <meta property="og:description" content="From Roof Replacement & Gutter Repairs to Bathroom Remodeling—American Top Roofing & Restoration Serves All of Georgia. Get a Free Quote!" />
        <meta property="og:image" content="/images-compressed/new-logo.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="American Top Roofing & Restoration" />
        
        {/* Instagram Meta Tags */}
        <meta property="og:see_also" content="https://www.instagram.com/american_top_roofing_llc/" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
          <SpeedInsights />
          <BottomBar />
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
