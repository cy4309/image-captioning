<!-- # 執行順序

## 建立虛擬環境:

python3 -m venv venv
source venv/bin/activate # Linux/macOS
或 venv\Scripts\activate # Windows

## 安裝依賴:

pip install -r requirements.txt (global 可能汙染環境)
c:\path\python.exe -m pip install -r requirements.txt (建議區域在虛擬環境，ctrl+shift+p 打開 python select interpreter 確認)

## 啟動 FastAPI:

uvicorn app.main:app --reload

## python 部屬前建議執行:

pip freeze > requirements.txt

## port:

live demo: http://127.0.0.1:8000
swagger ui: http://127.0.0.1:8000/docs -->

# 🧠 Image Captioning OCR Project

這是一個使用 **FastAPI + API Ninjas OCR API + React (Vite)** 的影像文字辨識與描述專案。  
專案支援兩種啟動方式：

1. 傳統 Python 啟動（適合開發階段）
2. Docker Compose 一鍵啟動（適合部署與多人協作）

---

# ⚙️ 執行順序（Python 本地方式）

## 建立虛擬環境

```bash
python3 -m venv venv
source venv/bin/activate     # Linux/macOS
venv\Scripts\activate        # Windows
安裝依賴
bash
複製程式碼
pip install -r requirements.txt
# ⚠️ 若要避免汙染 global 環境，請使用虛擬環境
# Windows 可用:
# c:\path\python.exe -m pip install -r requirements.txt
# 並於 VS Code Ctrl+Shift+P → Python: Select Interpreter 選擇 venv
啟動 FastAPI
bash
複製程式碼
uvicorn app.main:app --reload
部署前更新依賴
bash
複製程式碼
pip freeze > requirements.txt
Port
Live demo: http://127.0.0.1:8000

Swagger UI: http://127.0.0.1:8000/docs

🐳 Docker Compose 一鍵啟動（推薦）
環境需求
已安裝 Docker Desktop

確認 Docker daemon 正在執行：

bash
複製程式碼
docker info
啟動全部服務
bash
複製程式碼
docker compose up
或在有更新程式後：

bash
複製程式碼
docker compose up --build
👉 啟動後可於：

http://localhost:8080 — 前端頁面 + OCR 功能

http://localhost:8000 — FastAPI 後端（內部用）

停止服務
bash
複製程式碼
docker compose down
若要同時清除 volume：

bash
複製程式碼
docker compose down -v
查看容器狀態與日誌
bash
複製程式碼
docker ps
docker compose logs -f backend
docker compose logs -f nginx
📁 專案結構
bash
複製程式碼
image-captioning/
├── backend/             # FastAPI 後端
│   ├── main.py
│   ├── model.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/            # Vite + React 前端
│   ├── package.json
│   └── vite.config.js
│
├── nginx/               # Nginx 反向代理 + 靜態檔案服務
│   ├── Dockerfile
│   └── nginx.conf
│
└── docker-compose.yml
🚀 常用指令摘要
動作	指令
啟動服務	docker compose up
強制重新建構	docker compose up --build
停止服務	docker compose down
清除所有資料	docker compose down -v
查看 log	docker compose logs -f backend
查看狀態	docker ps

🧩 主要技術棧
Backend: FastAPI, Python, API Ninjas OCR

Frontend: React (Vite)

Reverse Proxy: Nginx

Containerization: Docker Compose

🌐 Live URLs
Frontend (Nginx): http://localhost:8080

Backend (FastAPI): http://localhost:8000

Swagger Docs: http://localhost:8000/docs
```
