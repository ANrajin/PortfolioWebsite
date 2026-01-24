/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
    transpilePackages: ['@portfolio/shared'],
    images: {
        remotePatterns: [
            ...(isDev
                ? [{ protocol: 'http', hostname: 'localhost' }]
                : [{ protocol: 'https', hostname: 'rajin.dev' }]),
        ],
        unoptimized: true,
    },
    async headers() {
        const connectSrc = [
            "'self'",
            ...(isDev ? ['http://localhost:*'] : []),
            'https://challenges.cloudflare.com',
            'https://cloudflareinsights.com',
            'https://static.cloudflareinsights.com',
        ].join(' ');

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
                            `connect-src ${connectSrc}`,
                        ].join('; '),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
