import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/caption", async () => {
    return HttpResponse.json(
      {
        caption: "🍔 Mock 回傳：這是一張好吃的漢堡！",
      },
      { status: 200 }
    );
  }),
];
