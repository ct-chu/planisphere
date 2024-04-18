/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    output: 'export',
    assetPrefix: isProd ? 'https://ct-chu.github.io/planisphere/' : undefined,
};

export default nextConfig;
