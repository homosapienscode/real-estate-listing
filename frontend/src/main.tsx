import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./app/App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { AppProviders } from "./app/providers.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AppProviders>
  </StrictMode>
)
