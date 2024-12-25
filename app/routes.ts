import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("views/home.tsx"),
  route("files/:id", "views/files.tsx"),
] satisfies RouteConfig;
