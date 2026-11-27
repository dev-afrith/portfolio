import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MobileProjectNav from "@/components/MobileProjectNav";
import ProjectScreenshotGallery from "@/components/ProjectScreenshotGallery";
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

function TechStackIcon({ name }: { name: string }) {
  const s = { width: 17, height: 17, flexShrink: 0 } as const;
  const lower = name.toLowerCase();
  if (lower.includes("react")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    );
  }
  if (lower.includes("next") || lower.includes("vercel")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <polygon points="12,3 22,20 2,20" />
      </svg>
    );
  }
  if (lower.includes("tailwind")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M4 10c2-3 5-3 7 0s5 3 9 0" />
        <path d="M4 16c2-3 5-3 7 0s5 3 9 0" />
      </svg>
    );
  }
  if (lower.includes("vite")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13,2 4,14 11,14 10,22 20,10 13,10" />
      </svg>
    );
  }
  if (lower.includes("flutter")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 3 5 12l3 3L20 3h-6Z" />
        <path d="M14 13 9 18l5 3h6l-6-8Z" />
      </svg>
    );
  }
  if (lower.includes("node") || lower.includes("docker")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
      </svg>
    );
  }
  if (lower.includes("mongo") || lower.includes("mysql") || lower.includes("postgres") || lower.includes("sql") || lower.includes("firebase")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    );
  }
  return (
    <span style={{ fontSize: "13px", fontWeight: 700, lineHeight: 1 }} aria-hidden="true">
      {name.slice(0, 1).toUpperCase()}
    </span>
  );
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
        <MobileProjectNav />
      </header>

      <main id="main-content" className="aw-section" style={{ paddingTop: "48px" }}>
        <div className="aw-container" style={{ maxWidth: "920px" }}>
          <Link href="/#projects" className="aw-btn-secondary" style={{ height: "42px", padding: "0 18px", fontSize: "14px" }}>
            ← Back to all work
          </Link>

          <div className="aw-fade-up aw-project-cover">
            <Image
              src={project.cover}
              alt={project.alt}
              width={1200}
              height={675}
              sizes="(max-width: 920px) 100vw, 920px"
              priority
            />
          </div>

          <ProjectScreenshotGallery
            slug={project.slug}
            title={project.title}
            cover={project.cover}
            alt={project.alt}
          />

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

          <h2 className="aw-label" style={{ color: "#F5F3EF", marginTop: "34px", letterSpacing: "0.18em" }}>
            TECH STACK
          </h2>
          <div className="aw-project-stack-grid">
            {project.stack.map((t) => (
              <div key={t} className="aw-project-stack-card">
                <span className="aw-project-stack-icon">
                  <TechStackIcon name={t} />
                </span>
                <span className="aw-project-stack-name">{t}</span>
              </div>
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

