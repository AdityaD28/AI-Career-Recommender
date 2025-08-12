import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Career Recommender',
  description: 'Discover your perfect career path with AI-powered recommendations',
  keywords: 'career, AI, recommendations, skills, jobs, professional development',
  authors: [{ name: 'AI Career Recommender Team' }],
  creator: 'AI Career Recommender',
  publisher: 'AI Career Recommender',
  openGraph: {
    title: 'AI Career Recommender',
    description: 'Discover your perfect career path with AI-powered recommendations',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Career Recommender',
    description: 'Discover your perfect career path with AI-powered recommendations',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#3B82F6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased min-h-screen`}>
        <div id="root" className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
