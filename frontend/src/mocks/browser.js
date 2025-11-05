// for npm run dev:mock, setupWorker() (Service Worker)

import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
