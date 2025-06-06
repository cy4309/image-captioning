import { useState, useRef } from "react";
import BaseButton from "@/components/BaseButton";

export default function ImageUploader({ setCaption, setModalOpen }) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const apiBaseUrl =
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_DEV_API_URL
      : import.meta.env.VITE_PROD_API_URL;

  function handleFileChange(e) {
    setFileName(e.target.files[0]?.name || "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file) return alert("請先選擇圖片");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${apiBaseUrl}/caption`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setCaption(data.caption);
      setModalOpen(true);
    } catch (err) {
      alert("API 錯誤：" + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="gap-y-4 w-full h-full flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-2">
        <input
          type="file"
          name="image"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <BaseButton type="button" onClick={() => fileInputRef.current.click()}>
          選擇圖片
        </BaseButton>
        <span className="text-gray-500 text-sm truncate max-w-[200px]">
          {fileName || "尚未選擇檔案"}
        </span>
      </div>
      <BaseButton type="submit" disabled={loading}>
        {loading ? "分析中..." : "送出圖片"}
      </BaseButton>
    </form>
  );
}
