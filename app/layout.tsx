import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
  title: "American Top Roofing | Forsyth County GA | Cumming, Buford, Suwanee",
  description:
    "Expert roofing services in Forsyth County, GA (Cumming, Buford, Suwanee) & surrounding areas. American Top Roofing offers roof replacement, repairs, gutters & more. Get your free quote!",
  generator: 'v0.dev',
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
        </ThemeProvider>
      </body>
    </html>
  )
}
