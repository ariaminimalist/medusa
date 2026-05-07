const checkEnvVariables = require("./check-env-variables")
const path = require("path")

checkEnvVariables()

const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: [
        // local dev
        "localhost:8000",
        "10.0.1.124:8000",
        // production
        "ortholabcenter.com",
        "www.ortholabcenter.com",
        // Cloudflare Workers preview / Pages preview
        "*.workers.dev",
        "*.pages.dev",
      ],
    },
  },
  turbopack: {
    // pnpm monorepo root — ensures Turbopack can resolve symlinked packages
    root: path.resolve(__dirname, "../.."),
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Cloudflare's Image Optimization is wired via wrangler.jsonc → "images" binding.
    // Set unoptimized: false only after verifying the IMAGES binding works end-to-end.
    unoptimized: true,
    remotePatterns: [
      { protocol: "http",  hostname: "localhost" },
      { protocol: "https", hostname: "*.s3.*.amazonaws.com" },
      { protocol: "https", hostname: "*.s3.amazonaws.com" },
      { protocol: "https", hostname: "ortholabcenter.com" },
      { protocol: "https", hostname: "*.ortholabcenter.com" },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [{ protocol: "https", hostname: S3_HOSTNAME, pathname: S3_PATHNAME }]
        : []),
    ],
  },
}

module.exports = nextConfig

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev())
