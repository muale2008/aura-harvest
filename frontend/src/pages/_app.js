import "../src/styles/globals.css";
import { AdProvider } from "../src/contexts/AdContext";
import { AuthProvider } from "../src/contexts/AuthContext";
import { ReferralProvider } from "../src/contexts/ReferralContext";
import NavBar from "../src/components/NavBar";
import AnnouncementBar from "../src/components/AnnouncementBar";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AdProvider>
        <ReferralProvider>
          <AnnouncementBar />
          <NavBar />
          <main className="container">
            <Component {...pageProps} />
          </main>
        </ReferralProvider>
      </AdProvider>
    </AuthProvider>
  );
}
