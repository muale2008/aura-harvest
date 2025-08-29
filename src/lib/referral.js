export const getReferrer = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('referrer');
};

export const setReferrer = (code: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('referrer', code);
};

export const extractRefFromURL = (): string | null => {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('ref');
};