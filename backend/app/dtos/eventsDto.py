from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class EventBase(BaseModel):
    edicion: int
    nombre: str
    fecha_inicio: datetime
    fecha_fin: datetime
    lugar: str
    descripcion: str
    tematica: str


# Class for creating events
class EventCreate(EventBase):
    edicion: Optional[int] = None  # To allow auto-increment


# Class for updating events
class EventUpdate(BaseModel):
    nombre: Optional[str] = None
    fecha_inicio: Optional[datetime] = None
    fecha_fin: Optional[datetime] = None
    lugar: Optional[str] = None
    descripcion: Optional[str] = None
    tematica: Optional[str] = None


# Class for the event response
class Event(EventBase):
    edicion: int  # Primary key, not optional in responses
    created_at: datetime
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None

    class Config:
        from_attributes = True

