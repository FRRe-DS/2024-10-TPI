from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EventBase(BaseModel):
    nombre: str
    edicion: int
    fecha_inicio: datetime
    fecha_fin: datetime
    lugar: str
    descripcion: str
    tematica: str

# Clase para la creación de eventos
class EventCreate(EventBase):
    pass

# Clase para la actualización de eventos
class EventUpdate(EventBase):
    fecha_inicio: Optional[datetime] = None
    fecha_fin: Optional[datetime] = None
    lugar: Optional[str] = None
    descripcion: Optional[str] = None
    tematica: Optional[str] = None

# Clase para la respuesta de los eventos
class Event(EventBase):
    nombre: Optional[str]
    edicion: Optional[int]
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime]

    class Config:
        from_attributes = True
  