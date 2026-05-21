import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,

  images: {
    localPatterns: [
      {
        pathname: "/portfolio/**",
        search: "",
      },
      {
        pathname: "/*",   // ✅ allow root public images like /reew.png
        search: "",
      },
    ],
  },
};

export default nextConfig;