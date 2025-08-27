import Link from "next/link";
export default function NavBar() {
  return (
    <nav style={{ borderBottom: "1px solid rgba(148,163,184,0.3)", marginBottom: 16 }}>
      <div className="container" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/"><img src="/assets/logo.svg" alt="Aura Harvest" width="28" height="28" /></Link>
        <Link href="/">Home</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/resume">Resume</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}
