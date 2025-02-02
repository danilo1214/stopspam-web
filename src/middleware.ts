// middleware.ts
import { withAuth } from "next-auth/middleware";
import { env } from "~/env";

export default withAuth({
  pages: {
    signIn: "/get-started",
    signOut: "/auth/signout",
  },
  secret: env.NEXTAUTH_SECRET,
});

// This matcher applies the middleware to all routes except for /get-started and /api/auth (if you use NextAuth API routes).
export const config = {
  matcher: ["/((?!get-started|api/auth).*)"],
};
