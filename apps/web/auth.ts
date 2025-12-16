import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Admin email whitelist - add authorized admin emails here
const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim().toLowerCase());

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
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
        session({ session, token }) {
            // Add user email to session
            if (session.user && token.email) {
                session.user.email = token.email as string;
            }
            return session;
        },
    },
});
