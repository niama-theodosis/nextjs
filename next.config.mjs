import createJiti from "jiti"
import {fileURLToPath} from "node:url"

const jiti = createJiti(fileURLToPath(import.meta.url))

jiti("./src/env/server")
jiti("./src/env/client")

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // reactCompiler: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "niama-theodosis.imgix.net",
        port: "",
        pathname: "/**/**",
      },
    ],
  },
}
export default nextConfig
