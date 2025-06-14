import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  index("./Pages/home.tsx"),
   route("users/:userId", "./Pages/$userId.tsx"),
] satisfies RouteConfig;