import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  index("./Pages/home.tsx"),
  route("users/:userId", "./Pages/$userId.tsx"),
  route("about", "./Pages/about.tsx"),
  route("logout", "./Pages/logout.tsx"),
  route("auth/auth0", "./Pages/auth.auth0.tsx"),
  route("auth/auth0/callback", "./Pages/auth.auth0.callback.tsx")
] satisfies RouteConfig;