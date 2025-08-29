import { useState, useEffect } from "react";
import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Admin() {
  const [adFreq, setAdFreq] = useState("standard");
  const [msg, setMsg] = useState("");
  const [ann, setAnn] = useState([]);

  async function saveAdConfig() {
    await axios.post(`${API}/api/admin/ad-config`, { defaultFrequency: adFreq, perJobType: [] });
    alert("Ad config saved");
  }
  async function postAnnouncement() {
    await axios.post(`${API}/api/admin/announcement`, { message: msg });
    setMsg("");
    loadAnnouncements();
  }
  async function loadAnnouncements() {
    const { data } = await axios.get(`${API}/api/admin/announcement`);
    setAnn(data || []);
  }
  useEffect(() => { loadAnnouncements(); }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="card">
        <h3>Ad Frequency</h3>
        <select value={adFreq} onChange={e=>setAdFreq(e.target.value)}>
          <option value="none">none</option>
          <option value="minimal">minimal</option>
          <option value="standard">standard</option>
        </select>
        <button className="btn" onClick={saveAdConfig} style={{ marginLeft: 8 }}>Save</button>
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Announcements</h3>
        <textarea rows={3} style={{ width: "100%" }} value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Message..." />
        <button className="btn" onClick={postAnnouncement} style={{ marginTop: 8 }}>Post</button>
        <ul>
          {ann.map(a => <li key={a._id}>{a.message}</li>)}
        </ul>
      </div>
    </div>
  );
}
