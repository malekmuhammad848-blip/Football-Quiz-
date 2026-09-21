import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ensureCatalogs } from "./lib/catalogs";
import "./index.css";

// كتالوجات الأفاتارات والتاغات: فورية من الكاش المحلي + تحديث خلفي من Supabase
void ensureCatalogs();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
