from datetime import datetime
from typing import Optional, List

from app.dtos.authorsDto import AuthorObra
from pydantic import BaseModel
from app.dtos.imagenDto import ImagenObra


class ObraBase(BaseModel):
    id: int
    autor_id: int
    id_edicion: int
    nombre_obra: str
    descripcion: str
    tecnica: str
    cant_votos: int
    puntaje_total: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None
    autor: Optional[AuthorObra]
    imagenes: Optional[List[ImagenObra]]

class ObraCreate(ObraBase):
    id: Optional[int] = None

class ObraUpdate(ObraBase):
    id: Optional[int] = None
    autor_id: Optional[int] = None
    id_edicion: Optional[int] = None
    nombre_obra: Optional[str] = None
    descripcion: Optional[str] = None
    tecnica: Optional[str] = None
    cant_votos: Optional[int] = None
    puntaje_total: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None
    autor: Optional[AuthorObra] = None
    imagenes: Optional[List[ImagenObra]] = None

class Obra(ObraBase):
    id: Optional[int]
    nombre_obra: Optional[str]
    autor: Optional[AuthorObra]
    imagenes: Optional[List[ImagenObra]]
    created_at: datetime
    updated_at: Optional[datetime]
    deleted_at: Optional[datetime]

    class Config:
        from_attributes = True

class ObraOut(ObraBase):

    class Config:
        from_attributes = True
