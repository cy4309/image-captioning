from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from app.model import generate_caption
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# 載入 .env
load_dotenv()

# 取得允許的 origins 並格式化
origins = [
    f"http://{origin.strip()}" for origin in os.getenv("ALLOWED_ORIGINS", "").split(",")
]

app = FastAPI()

# 加入這段來允許 CORS
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["*"],
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Image Captioning API!"}

@app.post("/caption")
async def caption_image(file: UploadFile = File(...)):
    caption = await generate_caption(file)
    return JSONResponse({"caption": caption})