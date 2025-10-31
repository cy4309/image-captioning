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

from PIL import Image
import io
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration
import os

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

async def generate_caption(file):
    """_summary_

    Args:
        file (_type_): _description_

    Returns:
        _type_: _description_
    """
    img_bytes = await file.read()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")

    inputs = processor(images=img, return_tensors="pt")
    out = model.generate(**inputs)
    caption = processor.decode(out[0], skip_special_tokens=True)

    return caption