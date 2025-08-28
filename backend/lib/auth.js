export function isAdmin(req) {
  const token = req.cookies?.auth_token
  return token === process.env.ADMIN_TOKEN
}