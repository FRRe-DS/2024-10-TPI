from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ContactBase(BaseModel):
    id: int
    autor: int
    tipo: str
    contenido: str

class ContactCreate(ContactBase):
    pass

class ContactUpdate(ContactBase):
    tipo: Optional[str] = None
    contenido: Optional[str] = None

class Contact(ContactBase):
    id: Optional[int]
    autor: Optional[int]
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime]
    
    class Config:
      from_attributes = True