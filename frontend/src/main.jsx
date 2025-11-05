// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/index.css";
import App from "@/App.jsx";

async function enableMocking() {
  if (import.meta.env.MODE !== "mock") return;

  const { worker } = await import("./mocks/browser");
  await worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <App />
    // </StrictMode>,
  );
});
