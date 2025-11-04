import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer(
  http.post("*/caption", async () => {
    return HttpResponse.json({ caption: "fake caption from test" });
  })
);
