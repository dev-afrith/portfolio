import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="aw-hero">
      <div className="aw-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p className="aw-label">404 — NOT FOUND</p>
        <h1 className="aw-h2" style={{ marginTop: "16px" }}>
          Page not found
        </h1>
        <p style={{ color: "var(--ink-2)", marginTop: "12px" }}>
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="aw-btn-primary" style={{ marginTop: "28px" }}>
          Back to home
        </Link>
      </div>
    </main>
  );
}

