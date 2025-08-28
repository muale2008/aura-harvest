import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) {
      localStorage.setItem("referrer", ref);
      // Future: send to analytics or Resend
    }
  }, []);

  return (
    <main>
      <h1>Welcome to Aura Harvest ??</h1>
      <p>Your referrer: {localStorage.getItem("referrer") || "None"}</p>
    </main>
  );
}
