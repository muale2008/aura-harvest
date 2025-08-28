export default function ReferralWidget({ invites }) {
  return (
    <div className="p-4 border rounded shadow-sm">
      <h3 className="font-bold">Your Referrals</h3>
      <p>{invites.length} verified invites</p>
      {invites.length >= 3 && <span className="text-green-600">🎉 Ad-free slot unlocked!</span>}
    </div>
  );
}