from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.config.db import get_db
from app.controllers.imagenesController import ImagenesController

router = APIRouter(prefix="/imagenes", tags=["imagenes"])

@router.post("/{obra_id}")
async def upload_image(
    obra_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    return await ImagenesController.upload_image(file, obra_id, db)