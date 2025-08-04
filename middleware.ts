export { default } from "next-auth/middleware";

// this is to protect routing api to prevent user to access that require authorization
export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
