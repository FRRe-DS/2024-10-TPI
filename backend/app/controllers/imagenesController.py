from fastapi import UploadFile
import cloudinary
import cloudinary.uploader
import cloudinary.api
from app.config.services import cloudinary
from fastapi import HTTPException

class ImagenesController:

    async def get_all_cloudinary_images():
        try:
            result = cloudinary.api.resources(
                type="upload",
                max_results=500,
                resource_type="image"
            )
            
            images = [
                {
                    "url": resource["secure_url"],
                    "public_id": resource["public_id"]
                }
                for resource in result["resources"]
            ]
            
            return images
            
        except Exception as e:
            print(f"Error getting images from Cloudinary: {str(e)}")
            raise HTTPException(
                status_code=500, 
                detail="Error al obtener imágenes de Cloudinary"
            ) 
    