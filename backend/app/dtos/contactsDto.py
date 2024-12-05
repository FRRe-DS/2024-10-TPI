from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ContactBase(BaseModel):
    id: int
    autor: int
    tipo: str
    contenido: str

class ContactCreate(ContactBase):
    id: Optional[int] = None

class ContactUpdate(ContactBase):
    id: Optional[int] = None
    tipo: Optional[str] = None
    contenido: Optional[str] = None
    autor: Optional[int] = None

class Contact(ContactBase):
    id: Optional[int]
    autor: Optional[int]
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime]
    
    class Config:
      from_attributes = True