from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from time import time

class WorkBase(BaseModel):
    nombre: str
    dni_autor: int
    id_evento: int
    duracion: time
    material: str
    tecnica: str
    descripcion: str
    fec_inicio: datetime
    fec_fin: datetime
  
class WorkCreate(WorkBase):
    nombre: str
    dni_autor: int
    id_evento: int
    duracion: Optional[time] = None
    material: str
    tecnica: str
    descripcion: str
    fec_inicio: datetime
    fec_fin: datetime

class WorkUpdate(WorkBase):
    duracion: Optional[time] = None
    material: Optional[str] = None
    tecnica: Optional[str] = None
    descripcion: Optional[str] = None
    fec_inicio: Optional[datetime] = None
    fec_fin: Optional[datetime] = None

class Work(WorkBase):
    nombre: Optional[str]
    dni_autor: Optional[int]
    id_evento: Optional[int]
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime]

    class Config:
        from_attributes = True
        