import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/events(.*)",
    "/meeting(.*)",
    "/availability(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()

  if (!userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting
    return redirectToSignIn()
  }
})

export const config = {
  matcher: [
    '/((?!_next|favicon.ico).*)',
  ],
};