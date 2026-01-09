import type { RouteObject } from "react-router"

import { HomePage } from "@/pages/home"
import { SettingsPage } from "@/pages/settings"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]
