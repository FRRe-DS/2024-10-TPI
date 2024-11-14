from fastapi import UploadFile
import cloudinary
import cloudinary.uploader
from app.models.imagenesModel import ImagenesModel
from app.config.db import get_db
from app.config.services import cloudinary
from fastapi import UploadFile, HTTPException

class ImagenesController:
    
    async def upload_image(file: UploadFile, obra_id: int, db):
        try:
            if not file:
                raise HTTPException(status_code=400, detail="No file uploaded")
                
            if not file.content_type.startswith('image/'):
                raise HTTPException(status_code=400, detail="File must be an image")
                
            # Leer el contenido del archivo de forma asíncrona
            contents = await file.read()
            result = cloudinary.uploader.upload(contents)
            
            nueva_imagen = ImagenesModel(
                url=result.get("secure_url"),
                public_id=result.get("public_id"),
                id_obra=obra_id,
                etapa_obra='durante'
            )
            
            db.add(nueva_imagen)
            db.commit()
            db.refresh(nueva_imagen)
            
            return nueva_imagen
            
        except Exception as e:
            print(f"Error uploading image: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))