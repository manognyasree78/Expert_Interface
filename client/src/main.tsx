import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  // Silently handle all fetch and network errors
  if (event.reason && (
    event.reason.message === 'Failed to fetch' ||
    event.reason.message?.includes('fetch') ||
    event.reason.message?.includes('AbortError') ||
    event.reason.message?.includes('aborted') ||
    event.reason.name === 'AbortError' ||
    event.reason.message?.includes('NetworkError') ||
    event.reason.message?.includes('TypeError') ||
    event.reason.code === 20 || // DOMException code for AbortError
    event.reason instanceof DOMException
  )) {
    // Completely silent handling - no console logs
    event.preventDefault();
    return;
  }
  
  // Only log truly unexpected errors
  console.warn('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

createRoot(document.getElementById("root")!).render(<App />);
