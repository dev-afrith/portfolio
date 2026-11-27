import type { Metadata } from "next";
import ClientShell from "@/components/ClientShell";
import "./globals.css";

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
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <meta name="theme-color" content="#08080A" />
        <script
          dangerouslySetInnerHTML={{
            __html: "try { if (localStorage.getItem('theme') === 'light') { document.documentElement.classList.remove('dark'); document.querySelector('meta[name=theme-color]').content='#ffffff'; } else { document.documentElement.classList.add('dark'); } } catch(e) { document.documentElement.classList.add('dark'); } document.documentElement.classList.add('js');",
          }}
        />
        <noscript>
          <style>
            {"[data-reveal],.aw-reveal,.aw-fade-up,.aw-word,.aw-eyebrow-rule{opacity:1!important;transform:none!important;animation:none!important;}"}
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
      </head>
      <body>
        <a href="#main-content" className="aw-skip-link">
          Skip to content
        </a>
        <ClientShell>{children}</ClientShell>
        <script src="/afrith-agent.js" data-endpoint="/api/chat" data-formspree="https://formspree.io/f/mojkqbgy" defer></script>
      </body>
    </html>
  );
}
