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
  route("login", "./Pages/login.tsx"),
] satisfies RouteConfig;