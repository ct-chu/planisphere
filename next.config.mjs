/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    output: 'export',
    assetPrefix: "https://ct-chu.github.io/planisphere/",
    basePath: "https://ct-chu.github.io/planisphere/"
};

export default nextConfig;
