import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function RoutePage() {
  const [referrer, setReferrer] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlRef = new URLSearchParams(window.location.search).get('ref');
      const storedRef = localStorage.getItem('referrer');

      if (urlRef) {
        localStorage.setItem('referrer', urlRef);
        setReferrer(urlRef);
      } else if (storedRef) {
        setReferrer(storedRef);
      }
    }
  }, []);

  return (
    <main>
      <h1>Route Page</h1>
      <p>Referrer: {referrer || 'None'}</p>
    </main>
  );
}