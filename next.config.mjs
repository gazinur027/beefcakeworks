/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for easy preview hosting (Netlify Drop / any static host).
  // Remove "output" when a real backend (API routes) is needed.
  output: "export",
  images: {
    // Required for static export — images are served as-is
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
