export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  LISTING_DETAIL: (id: string) => `/listings/${id}`,
} as const;