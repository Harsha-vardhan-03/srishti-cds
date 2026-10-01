import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents clickjacking — page cannot be iframed by other origins
          { key: "X-Frame-Options", value: "DENY" },
          // Prevents MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Limits how much referrer info is sent to external sites
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restricts browser feature access (camera, mic, location)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;