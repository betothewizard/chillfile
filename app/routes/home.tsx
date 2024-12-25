import HomePage from "~/views/home";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chillfile" },
    { name: "description", content: "Sharing files at the speed of thought." },
  ];
}

export default function HomeRoute() {
  return <HomePage />;
}
