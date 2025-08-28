// pages/_app.js
import Head from 'next/head';
import '../styles/globals.css'; // Optional: if you have global styles

function AuraHarvestApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Aura Harvest – Discover Jobs, Unlock Opportunity</title>
        <meta name="description" content="Referral-powered job board with ad-free unlocks and community-driven growth." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Plausible Analytics */}
    <script defer data-domain="aura-harvest.vercel.app" src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"></script>
<script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }</script>

      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default AuraHarvestApp;