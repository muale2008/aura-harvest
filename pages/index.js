import { useEffect, useState } from "react";

export default function Home() {
  const [referrer, setReferrer] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (ref) {
        localStorage.setItem("referrer", ref);
        setReferrer(ref);
      } else {
        setReferrer(localStorage.getItem("referrer"));
      }
    }
  }, []);

  return (
    <main>
      <h1>Welcome to Aura Harvest 🌱</h1>
      <p>Your referrer: {referrer || "None"}</p>
    </main>
  );
}