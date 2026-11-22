import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Muhammad Afrith — Full Stack & Mobile App Developer | Portfolio",
  description:
    "Muhammad Afrith is a Full Stack and Mobile App Developer building scalable, high-performance applications with modern technologies. Portfolio showcasing React, Flutter, Node.js, and full-stack engineering.",
  keywords: [
    "Muhammad Afrith",
    "Muhammad Afrith Portfolio",
    "Afrith Portfolio",
    "Afrith portfolio website",
    "Muhammad Portfolio",
    "Afrith",
    "Muhammad Afrith D",
    "Afrith developer",
    "Afrith full stack developer",
    "Muhammad Afrith Dharmapuri developer",
    "Muhammad Afrith Developer",
    "Muhammad Afrith Web Developer",
    "Muhammad Afrith Mobile App Developer",
    "Muhammad Afrith Software Engineer",
    "Muhammad Afrith Dharmapuri",
    "Muhammad Afrith Tamil Nadu",
    "Full Stack Developer Tamil Nadu",
    "Mobile App Developer India",
    "React Developer Portfolio",
    "Flutter Developer Portfolio",
    "Full Stack Developer India",
    "Web Developer",
    "Mobile App Developer",
  ],
  authors: [{ name: "Muhammad Afrith" }],
  creator: "Muhammad Afrith",
  metadataBase: new URL("https://muhammadafrithportfolio.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://muhammadafrithportfolio.vercel.app",
    title: "Muhammad Afrith — Full Stack & Mobile App Developer | Portfolio",
    description:
      "Building scalable digital experiences through clean design, modern engineering, and immersive product thinking.",
    siteName: "Muhammad Afrith Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Afrith — Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Afrith — Full Stack & Mobile App Developer | Portfolio",
    description:
      "Building scalable digital experiences through clean design, modern engineering, and immersive product thinking.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://muhammadafrithportfolio.vercel.app",
  },
  verification: {
    google: "h5UKHIdVvphAYlYERjqpj3elpjWFVtQ5tduglAl62nA",
  },
};

// JSON-LD Structured Data
const SITE_URL = "https://muhammadafrithportfolio.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Muhammad Afrith",
      alternateName: ["Muhammad Afrith D", "Afrith"],
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      mainEntityOfPage: `${SITE_URL}/#webpage`,
      sameAs: [
        "https://github.com/dev-afrith",
        "https://www.linkedin.com/in/muhammad-afrith-d-661822327/",
      ],
      jobTitle: "Full Stack Developer / Mobile App Developer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dharmapuri",
        addressRegion: "Tamil Nadu",
        addressCountry: "India",
      },
      knowsAbout: [
        "React.js",
        "Next.js",
        "Flutter",
        "Node.js",
        "TypeScript",
        "MongoDB",
        "PostgreSQL",
        "Firebase",
        "Docker",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Muhammad Afrith — Portfolio",
      alternateName: ["Afrith Portfolio", "Muhammad Portfolio"],
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Muhammad Afrith — Full Stack & Mobile App Developer",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} style={{ backgroundColor: "#0a0a0a" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body style={{ backgroundColor: "#0a0a0a" }}>
        <div className="page-aurora" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
