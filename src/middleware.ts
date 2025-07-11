// middleware.ts
import { withAuth } from "next-auth/middleware";
import { env } from "~/env";

export default withAuth({
  pages: {
    signIn: "/get-started",
    signOut: "/auth/signout",
  },
  callbacks: {
    authorized: ({ req }) => {
      // verify token and return a boolean
      const path = req.nextUrl.pathname;
      if (
        path.includes(".png") ||
        path.includes(".jpeg") ||
        path.includes(".svg") ||
        path.includes(".ico") ||
        path.includes(".jpg")
      ) {
        return true;
      }

      const sessionToken =
        req.cookies.get("next-auth.session-token") ??
        req.cookies.get("__Secure-next-auth.session-token");
      if (sessionToken) {
        return true;
      }

      return false;
    },
  },
  secret: env.NEXTAUTH_SECRET,
});

// This matcher applies the middleware to all routes except for /get-started and /api/auth (if you use NextAuth API routes).
export const config = {
  matcher: [
    "/((?!get-started|api/auth|api/webhook|terms-and-conditions|privacy|api/cron).*)",
  ],
};
