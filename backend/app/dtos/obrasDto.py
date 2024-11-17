from datetime import datetime
from typing import Optional, List

from app.dtos.authorsDto import AuthorObra
from pydantic import BaseModel
from app.dtos.imagenDto import ImagenBase


class ObraBase(BaseModel):
    id: int
    autor_id: int
    id_edicion: int
    nombre_obra: str
    descripcion: str
    tecnica: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None
    autor: Optional[AuthorObra]
    imagenes: Optional[List[ImagenBase]] = None

class ObraOut(ObraBase):
    class Config:
        from_attributes = True
