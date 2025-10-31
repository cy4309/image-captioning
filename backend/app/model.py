# [上傳圖片]
#    ↓
# [讀取圖片 → 轉換格式 (RGB)]
#    ↓
# [前處理 → 轉為 Tensor]
#    ↓
# [餵進 BLIP 模型 → 產生 caption token]
#    ↓
# [解碼 token → 中文/英文句子]
#    ↓
# [回傳結果]


# 這裡用torch
# from PIL import Image
# import io
# import torch
# from transformers import BlipProcessor, BlipForConditionalGeneration
# import os

# processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
# model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# async def generate_caption(file):
#     """_summary_

#     Args:
#         file (_type_): _description_

#     Returns:
#         _type_: _description_
#     """
#     img_bytes = await file.read()
#     img = Image.open(io.BytesIO(img_bytes)).convert("RGB")

#     inputs = processor(images=img, return_tensors="pt")
#     out = model.generate(**inputs)
#     caption = processor.decode(out[0], skip_special_tokens=True)

#     return caption

# 這裡用api ninjas的imagetotext來降低render部屬免費512MB空間
import os
import requests
from dotenv import load_dotenv

# 確保在本地時會載入 .env
load_dotenv()

# HF_API_URL = os.getenv("HF_API_URL")
# HF_API_KEY = os.getenv("HF_API_KEY")
API_NINJAS_URL = os.getenv("API_NINJAS_URL")
API_NINJAS_KEY = os.getenv("API_NINJAS_KEY")

async def generate_caption(file):
    # 讀取上傳檔案
    file_bytes = await file.read()
    # 檢查檔案格式
    content_type = file.content_type or mimetypes.guess_type(file.filename)[0] or "image/jpeg"

    if not content_type.startswith("image/"):
        return "[Error] Unsupported file type. Please upload an image."

    headers = {"X-Api-Key": API_NINJAS_KEY}

    try:
        res = requests.post(
            API_NINJAS_URL,
            headers=headers,
            files={"image": (file.filename, file_bytes, content_type)},
            timeout=20
        )
        data = res.json()

        # 成功：OCR 會回傳陣列
        if isinstance(data, list) and len(data) > 0:
            return " ".join([d.get("text", "") for d in data]).strip() or "[Info] No text detected."

        # 若沒文字或 API 回傳錯誤
        if isinstance(data, dict) and data.get("error"):
            return f"[Error] {data['error']}"

        return "[Info] No text detected in image."

    except Exception as e:
        return f"[Error] Request failed: {e}"