/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@portfolio/shared'],
    images: {
        domains: ['localhost'],
        unoptimized: true,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://static.cloudflareinsights.com",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "font-src 'self' https://fonts.gstatic.com data:",
                            "img-src 'self' data: blob: https:",
                            "frame-src 'self' https://challenges.cloudflare.com",
                            "connect-src 'self' http://localhost:* https://challenges.cloudflare.com https://cloudflareinsights.com https://static.cloudflareinsights.com",
                        ].join('; '),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
