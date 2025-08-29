import { useState } from 'react';
import axios from 'axios';

export default function MonetizationTogglePanel() {
  const [settings, setSettings] = useState({
    adEnabled: true,
    affiliateJobsEnabled: false,
    microPaymentsEnabled: false
  });

  const updateSettings = async () => {
    await axios.post('/api/admin/monetization', { ...settings, updatedBy: 'admin' });
  };

  return (
    <div>
      <h2>Monetization Controls</h2>
      <label><input type="checkbox" checked={settings.adEnabled} onChange={e => setSettings(s => ({ ...s, adEnabled: e.target.checked }))} /> Ads</label>
      <label><input type="checkbox" checked={settings.affiliateJobsEnabled} onChange={e => setSettings(s => ({ ...s, affiliateJobsEnabled: e.target.checked }))} /> Affiliate Jobs</label>
      <label><input type="checkbox" checked={settings.microPaymentsEnabled} onChange={e => setSettings(s => ({ ...s, microPaymentsEnabled: e.target.checked }))} /> Micro Payments</label>
      <button onClick={updateSettings}>Save</button>
    </div>
  );
}