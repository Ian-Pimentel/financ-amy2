import './index.css'
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { rootRoute } from "./routes/__root";
import { indexRoute } from "./routes/index";
import { dashboardRoute } from "./routes/dashboard";

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function start() {
  const rootElement = document.getElementById('root')!
  if (!rootElement.innerHTML) {
    const root = createRoot(rootElement);

    if (process.env.NODE_ENV === 'development') {
      root.render(
        <>
          <StrictMode>
            <RouterProvider router={router} />
          </StrictMode>
        </>,
      );
    } else {
      root.render(<RouterProvider router={router} />);
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}