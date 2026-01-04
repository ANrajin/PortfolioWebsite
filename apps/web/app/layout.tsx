import type { Metadata, Viewport } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
    variable: '--font-roboto',
    subsets: ['latin'],
    weight: ['300', '400', '500', '700', '900'],
});

const robotoMono = Roboto_Mono({
    variable: '--font-roboto-mono',
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    title: 'A N Rajin | Software Engineer Portfolio',
    description: 'Professional portfolio showcasing my work as a Software Engineer',
    keywords: ['Software Engineer', 'Portfolio', 'Developer', 'Full Stack'],
    authors: [{ name: 'Software Engineer' }],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body className={`${roboto.variable} ${robotoMono.variable} antialiased`} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
