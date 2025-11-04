import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders upload button", () => {
  render(<App />);

  // ✅ 用 role + name 查找按鈕，而不是文字匹配
  const selectButton = screen.getByRole("button", { name: /選擇圖片/i });
  expect(selectButton).toBeInTheDocument();

  const submitButton = screen.getByRole("button", { name: /送出圖片/i });
  expect(submitButton).toBeInTheDocument();
});
