/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@portfolio/shared'],
    images: {
        domains: ['localhost'],
        unoptimized: true,
    },
};

export default nextConfig;
