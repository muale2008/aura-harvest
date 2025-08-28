import { useEffect, useState } from 'react';
import { extractRefFromURL, getReferrer, setReferrer } from '@/lib/referral';

export default function RoutePage() {
  const [referrer, setReferrerState] = useState<string | null>(null);

  useEffect(() => {
    const urlRef = extractRefFromURL();
    const storedRef = getReferrer();

    if (urlRef) {
      setReferrer(urlRef);
      setReferrerState(urlRef);
    } else if (storedRef) {
      setReferrerState(storedRef);
    }
  }, []);

  return <p>Referrer: {referrer || 'None'}</p>;
}