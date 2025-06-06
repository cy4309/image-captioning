import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import { Modal } from "antd";

function App() {
  const [caption, setCaption] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-4 w-full h-[100dvh]">
      <div className="max-w-[600px] m-auto">
        <h1 className="font-bold text-2xl">AI 圖像描述 Demo</h1>
        <ImageUploader setCaption={setCaption} setModalOpen={setModalOpen} />
        {caption && (
          <Modal
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
            title="圖片描述結果"
            okText="關閉"
            cancelButtonProps={{ style: { display: "none" } }}
          >
            <p>{caption}</p>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default App;
