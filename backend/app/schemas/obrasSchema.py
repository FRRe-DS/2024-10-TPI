from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ObraBase(BaseModel):
    id: int
    autor_id: int
    id_evento: int
    nombre_obra: str
    descripcion: str
    tecnica: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None


class ObraOut(ObraBase):
    class Config:
        from_attributes = True
