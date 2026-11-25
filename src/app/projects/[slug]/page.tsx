import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  const url = `https://muhammadafrithportfolio.vercel.app/projects/${project.slug}`;
  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${project.title} — ${project.subtitle} | Muhammad Afrith`,
      description: project.seoDescription,
      images: [
        {
          url: "https://muhammadafrithportfolio.vercel.app/og.png",
          width: 1200,
          height: 630,
          alt: project.alt,
        },
      ],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `https://muhammadafrithportfolio.vercel.app/projects/${project.slug}`,
    ...(project.links.github ? { codeRepository: project.links.github } : {}),
    creator: {
      "@type": "Person",
      name: "Muhammad Afrith",
    },
    keywords: project.stack.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="aw-nav-wrap">
        <div className="aw-nav-pill">
          <Link href="/" style={{ fontWeight: 600, fontSize: "15px", letterSpacing: "-0.02em" }}>
            Muhammad Afrith
          </Link>
          <nav className="aw-nav-links" aria-label="Primary">
            <Link href="/#about" className="aw-nav-link">About</Link>
            <Link href="/#projects" className="aw-nav-link is-active">Projects</Link>
            <Link href="/#experience" className="aw-nav-link">Experience</Link>
            <Link href="/#skills" className="aw-nav-link">Skills</Link>
            <Link href="/#contact" className="aw-nav-link">Contact</Link>
          </nav>
        </div>
      </header>

      <main id="main-content" className="aw-section" style={{ paddingTop: "48px" }}>
        <div className="aw-container" style={{ maxWidth: "920px" }}>
          <Link href="/#projects" className="aw-btn-secondary" style={{ height: "42px", padding: "0 18px", fontSize: "14px" }}>
            ← Back to all work
          </Link>

          <div style={{ marginTop: "32px", borderRadius: "20px", overflow: "hidden", border: "1px solid var(--line)" }}>
            <Image
              src={project.cover}
              alt={project.alt}
              width={1200}
              height={750}
              sizes="(max-width: 920px) 100vw, 920px"
              priority
              style={{ width: "100%", height: "auto", maxHeight: "440px", objectFit: "cover", objectPosition: "top", display: "block" }}
            />
          </div>

          <p className="aw-label" style={{ marginTop: "28px" }}>
            {project.idx} — {project.category}
          </p>
          <h1 className="aw-h2" style={{ marginTop: "12px" }}>
            {project.title}
          </h1>
          <p style={{ color: "var(--ink-2)", marginTop: "14px", fontSize: "16px", lineHeight: 1.7 }}>
            {project.overview}
          </p>

          <div className="aw-case-grid">
            <div className="aw-case-card">
              <h2 className="aw-case-label">PROBLEM</h2>
              <p className="aw-case-text">{project.problem}</p>
            </div>
            <div className="aw-case-card">
              <h2 className="aw-case-label">SOLUTION</h2>
              <p className="aw-case-text">{project.solution}</p>
            </div>
            <div className="aw-case-card">
              <h2 className="aw-case-label">IMPLEMENTATION</h2>
              <p className="aw-case-text">{project.implementation}</p>
            </div>
            <div className="aw-case-card">
              <h2 className="aw-case-label">RESULT</h2>
              <ul className="aw-case-list">
                {project.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="aw-label" style={{ color: "#F5F3EF", marginTop: "28px", letterSpacing: "0.18em" }}>
            TECH STACK
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
            {project.stack.map((t) => (
              <span key={t} className="aw-chip">
                {t}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "28px" }}>
            {project.links.apk?.startsWith("https://") && (
              <a href={project.links.apk} target="_blank" rel="noopener noreferrer" className="aw-btn-primary">
                Install APK
              </a>
            )}
            {project.links.live.startsWith("https://") && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="aw-btn-primary">
                Live site ↗
              </a>
            )}
            {project.links.github.startsWith("https://") && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="aw-btn-secondary">
                GitHub ↗
              </a>
            )}
          </div>
          {project.apkMeta && (
            <p className="aw-label" style={{ color: "#6E6A63", marginTop: "12px" }}>
              {project.apkMeta}
            </p>
          )}
        </div>
      </main>
    </>
  );
}

