// pages/admin/monetization.tsx
import { useState, useEffect } from 'react';

export default function MonetizationPage() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch('/api/admin/monetization')
      .then(res => res.json())
      .then(data => setSettings(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Monetization Settings</h1>
      {settings ? (
        <ul>
          <li>Ads: {settings.adEnabled ? 'Enabled' : 'Disabled'}</li>
          <li>Affiliate Jobs: {settings.affiliateJobsEnabled ? 'Enabled' : 'Disabled'}</li>
          <li>Micro Payments: {settings.microPaymentsEnabled ? 'Enabled' : 'Disabled'}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}