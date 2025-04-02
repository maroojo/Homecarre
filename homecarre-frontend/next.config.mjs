/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "http://localhost:3000/:path*", // เปลี่ยนเป็น port admin 
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
