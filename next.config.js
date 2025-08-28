/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // other settings...
};


module.exports = {
  trailingSlash: true,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};
