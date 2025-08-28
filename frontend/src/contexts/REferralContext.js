import { createContext, useState, useEffect } from 'react'

export const ReferralContext = createContext()

export function ReferralProvider({ children }) {
  const [referrals, setReferrals] = useState([])

  useEffect(() => {
    fetch('/api/referral')
      .then(res => res.json())
      .then(data => setReferrals(data))
  }, [])

  return (
    <ReferralContext.Provider value={{ referrals }}>
      {children}
    </ReferralContext.Provider>
  )
}