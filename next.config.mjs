/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    swcMinify: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
};

export default nextConfig;
