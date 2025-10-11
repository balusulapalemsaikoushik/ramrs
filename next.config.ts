import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        "source": "/api/:path*",
        "destination": process.env.API_ENDPOINT + "/:path*",
        "permanent": true,
      },
    ]
  }
};

export default nextConfig;
