from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ImagenBase(BaseModel):
    id: int
    id_obra: int
    url: str
    public_id: str
    etapa_obra: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None

class Imagen(ImagenBase):
    id: Optional[int]
    created_at: datetime
    updated_at: Optional[datetime]
    deleted_at: Optional[datetime]

    class Config:
        from_attributes = True

class ImagenOut(ImagenBase):
    class Config:
        from_attributes = True

class ImagenObra(BaseModel):
    id: int
    url: str
    etapa_obra: str

    class Config:
        from_attributes = True