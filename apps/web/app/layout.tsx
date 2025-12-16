import type { Metadata } from 'next';
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

export const metadata: Metadata = {
    title: 'Software Engineer Portfolio',
    description: 'Professional portfolio showcasing my work as a Software Engineer',
    keywords: ['Software Engineer', 'Portfolio', 'Developer', 'Full Stack'],
    authors: [{ name: 'Software Engineer' }],
    viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
