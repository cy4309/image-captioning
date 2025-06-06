from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from app.model import generate_caption
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 加入這段來允許 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
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