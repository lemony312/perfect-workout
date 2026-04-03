import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/perfect-workout",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/perfect-workout",
  },
};

export default nextConfig;
