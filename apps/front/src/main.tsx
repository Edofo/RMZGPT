import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ChatProvider } from "./contexts/ChatContext.tsx";
import { ToastProvider } from "./contexts/ToastContext.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
);
