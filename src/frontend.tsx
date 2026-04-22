/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ModalProvider from "./shared/components/ModalContext";
import App from "./App";


function start() {
  const root = createRoot(document.getElementById("root")!);

  if (process.env.NODE_ENV === 'development') {
    root.render(
      <StrictMode>
        <ModalProvider>
          <App />
        </ModalProvider>
      </StrictMode>
    );
  }
  else
    root.render(<ModalProvider>
      <App />
    </ModalProvider>);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}