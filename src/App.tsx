import { useRoutes } from "react-router"

import { routes } from "./app/routes/routes.tsx"

function App() {
  return useRoutes(routes)
}

export default App
