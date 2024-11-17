from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.config.db import get_db
from app.controllers.imagenesController import ImagenesController
import cloudinary.api
from fastapi import HTTPException

router = APIRouter(prefix="/imagenes", tags=["imagenes"])

@router.get("/cloudinary")
async def get_all_cloudinary_images():
    return await ImagenesController.get_all_cloudinary_images()