import { useContext } from "react";
import { AdContext } from "../contexts/AdContext";

export default function AdSlot({ context = {} }) {
  const { shouldShowAds, simulateAdView } = useContext(AdContext);
  if (!shouldShowAds(context)) return null;
  return (
    <div className="card" style={{ margin: "12px 0" }}>
      <p>Sponsored — demo ad slot. Admin controls frequency.</p>
      <button className="btn" onClick={simulateAdView}>Simulate Ad View</button>
    </div>
  );
}
