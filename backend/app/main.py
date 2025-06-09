from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from app import api

# 載入 .env
load_dotenv()

# 取得允許的 origins 並格式化
origins = [
    f"{origin.strip()}" for origin in os.getenv("ALLOWED_ORIGINS", "").split(",")
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

# 註冊路由
app.include_router(api.router)