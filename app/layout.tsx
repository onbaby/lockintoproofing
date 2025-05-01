import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Top American Roofing - Professional Roofing Services",
  description:
    "Top American Roofing provides professional roofing services including roof replacement, repairs, and emergency services. Get a free quote today!",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon/house-logo-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/house-logo-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/house-logo-180x180.png', sizes: '180x180', type: 'image/png' },
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
        <link rel="icon" type="image/png" sizes="180x180" href="/favicon/house-logo-180x180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/house-logo-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/house-logo-180x180.png" />
        <link rel="shortcut icon" href="/favicon/house-logo-180x180.png" />
        <meta name="msapplication-TileImage" content="/favicon/house-logo-180x180.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
