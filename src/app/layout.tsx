import type { Metadata } from "next";
import { Inter_Tight, Inter, JetBrains_Mono } from "next/font/google";
import AmbientBg from "@/components/AmbientBg";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Muhammad Afrith — Full-Stack & Mobile Developer",
    template: "%s — Muhammad Afrith",
  },
  description:
    "Third-year Computer Science student and full-stack developer in Dharmapuri, India. Nine shipped projects across healthcare, food rescue and AI, built with TypeScript, React, Flutter and Python.",
  authors: [{ name: "Muhammad Afrith" }],
  creator: "Muhammad Afrith",
  metadataBase: new URL("https://muhammadafrithportfolio.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://muhammadafrithportfolio.vercel.app/",
    title: "Muhammad Afrith — Full-Stack & Mobile Developer",
    description:
      "Third-year Computer Science student and full-stack developer in Dharmapuri, India. Nine shipped projects across healthcare, food rescue and AI, built with TypeScript, React, Flutter and Python.",
    siteName: "Muhammad Afrith",
    images: [
      {
        url: "https://muhammadafrithportfolio.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Afrith — Full-Stack & Mobile Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Afrith — Full-Stack & Mobile Developer",
    description:
      "Third-year Computer Science student and full-stack developer in Dharmapuri, India. Nine shipped projects across healthcare, food rescue and AI, built with TypeScript, React, Flutter and Python.",
    images: ["https://muhammadafrithportfolio.vercel.app/og.png"],
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
    canonical: "https://muhammadafrithportfolio.vercel.app/",
  },
  verification: {
    google: "h5UKHIdVvphAYlYERjqpj3elpjWFVtQ5tduglAl62nA",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Afrith",
  jobTitle: "Full-Stack and Mobile App Developer",
  url: "https://muhammadafrithportfolio.vercel.app/",
  image: "https://muhammadafrithportfolio.vercel.app/og.png",
  email: "mailto:afrithafrith1507@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dharmapuri",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: ["https://github.com/dev-afrith"],
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "TanStack Start",
    "Flutter",
    "Kotlin",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Python",
    "LLM tooling",
    "Figma",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Muhammad Afrith",
  url: "https://muhammadafrithportfolio.vercel.app/",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ backgroundColor: "#08080A" }}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <noscript>
          <style>
            {"[data-reveal],.aw-fade-up,.aw-word,.aw-eyebrow-rule{opacity:1!important;transform:none!important;animation:none!important;}"}
          </style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#08080A" />
      </head>
      <body style={{ backgroundColor: "#08080A", color: "#F5F3EF" }}>
        <a href="#main-content" className="aw-skip-link">
          Skip to content
        </a>
        <AmbientBg />
        {children}
        <script src="/afrith-agent.js" data-endpoint="/api/chat" data-formspree="https://formspree.io/f/mojkqbgy" defer></script>
      </body>
    </html>
  );
}
