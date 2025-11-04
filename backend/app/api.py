from fastapi import APIRouter, UploadFile, File, Request, HTTPException
from fastapi.responses import JSONResponse
from app.model import generate_caption
import time
from fastapi import HTTPException

router = APIRouter()
usage = {}  # {ip: {"count": 0, "reset": timestamp}}

def check_quota(ip: str, limit: int = 50):
    """
    檢查指定 IP 是否超出每日使用上限。
    """
    now = time.time()

    # 如果這個 IP 沒記錄，或已過一天，就重置次數
    if ip not in usage or now > usage[ip]["reset"]:
        usage[ip] = {"count": 0, "reset": now + 86400}  # 86400 秒 = 1 天

    # 增加次數
    usage[ip]["count"] += 1

    # 超過上限就丟出 HTTP 錯誤
    if usage[ip]["count"] > limit:
        raise HTTPException(status_code=429, detail="Daily limit exceeded.")

@router.get("/")
def read_root():
    return {"message": "Welcome to the Image Captioning API!"}

@router.post("/caption")
async def caption_image(request: Request, file: UploadFile = File(...)):
    """
    上傳圖片 → 透過 API Ninjas OCR → 回傳辨識文字
    同時限制每個 IP 每天最多 50 次
    """
    # 檢查 x-forwarded-for header，這樣在雲端就能取到真實訪客 IP
    client_ip = request.headers.get("x-forwarded-for", request.client.host)
    check_quota(client_ip, limit=50)

    caption = await generate_caption(file)
    return JSONResponse({"caption": caption})

@router.get("/health", include_in_schema=False)
def health_check():
    return {"ok": True}