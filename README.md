# 執行順序

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
swagger ui: http://127.0.0.1:8000/docs
