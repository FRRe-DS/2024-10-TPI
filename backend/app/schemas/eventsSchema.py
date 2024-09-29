from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EventBase(BaseModel):
    nombre: str
    fecha: datetime
    lugar: str
    nroEdicion: int
    descripcion: str
    tematica: str

# Clase para la creación de eventos
class EventCreate(EventBase):
    pass

# Clase para la actualización de eventos
class EventUpdate(EventBase):
    nombre: Optional[str] = None
    fecha: Optional[datetime] = None
    lugar: Optional[str] = None
    nroEdicion: Optional[int] = None
    descripcion: Optional[str] = None
    tematica: Optional[str] = None

# Clase para la respuesta de los eventos
class Event(EventBase):
    id: Optional[int]
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime]

    class Config:
        from_attributes = True
  