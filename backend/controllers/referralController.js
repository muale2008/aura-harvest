if (urlRef) {
  fetch('/api/referral/track', {
    method: 'POST',
    body: JSON.stringify({ referrer: urlRef }),
    headers: { 'Content-Type': 'application/json' },
  });
}