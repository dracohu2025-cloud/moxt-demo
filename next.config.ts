import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? "/moxt-demo" : "",
  assetPrefix: isGithubPages ? "/moxt-demo/" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
