import { useState, useRef } from "react";
import BaseButton from "@/components/BaseButton";
import { api } from "@/api/api";

export default function ImageUploader({ setCaption, setModalOpen }) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  // const apiBaseUrl =
  //   import.meta.env.MODE === "development"
  //     ? import.meta.env.VITE_DEV_API_URL
  //     : import.meta.env.VITE_PROD_API_URL;

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
      // const res = await fetch(`${apiBaseUrl}/caption`, {
      //   // 本地Nginx直接/api反向代理後端，這會連到nginx.conf，不能寫死，因為線上vite不支援反向代理
      //   method: "POST",
      //   body: formData,
      //   // headers: {
      //   //   Accept: "application/json",
      //   // },
      // });
      const res = await api.post(`/caption`, formData);
      // 本地Nginx直接/api反向代理後端，這會連到nginx.conf，不能寫死，因為線上vite不支援反向代理
      setCaption(res.data.caption);
      setModalOpen(true);
    } catch (err) {
      // alert("API 錯誤：" + err.message);
      alert("API 錯誤：" + err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ✅ 滿版 Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
          <p className="mt-4">🚀 後端伺服器啟動與圖片分析中，請稍候...</p>
        </div>
      )}

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
          <BaseButton
            type="button"
            onClick={() => fileInputRef.current.click()}
          >
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
    </>
  );
}
