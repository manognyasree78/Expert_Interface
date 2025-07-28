import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  // Silently handle n8n webhook errors
  if (event.reason && (
    event.reason.message === 'Failed to fetch' ||
    event.reason.message?.includes('fetch')
  )) {
    event.preventDefault();
    return;
  }
  
  console.warn('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

createRoot(document.getElementById("root")!).render(<App />);
