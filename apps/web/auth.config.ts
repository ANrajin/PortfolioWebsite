import type { NextAuthConfig } from "next-auth";

// Admin email whitelist - add authorized admin emails here
const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim().toLowerCase());

/**
 * Edge-compatible auth configuration.
 * This configuration is used by the middleware and must not include
 * any dependencies that use dynamic code evaluation (eval, new Function, etc.).
 */
export const authConfig = {
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");

            if (isOnAdmin) {
                if (isLoggedIn) {
                    // Check if user is in admin whitelist
                    const userEmail = auth?.user?.email?.toLowerCase() || "";
                    const isAdmin = adminEmails.includes(userEmail) || adminEmails.includes("*");
                    return isAdmin;
                }
                return false; // Redirect to sign in
            }

            return true;
        },
    },
    providers: [], // Providers are added in auth.ts
} satisfies NextAuthConfig;
