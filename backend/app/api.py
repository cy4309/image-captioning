from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from app.model import generate_caption

router = APIRouter()

@router.get("/")
def read_root():
    return {"message": "Welcome to the Image Captioning API!"}

@router.post("/caption")
async def caption_image(file: UploadFile = File(...)):
    caption = await generate_caption(file)
    return JSONResponse({"caption": caption})