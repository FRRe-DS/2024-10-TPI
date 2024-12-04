from datetime import date, datetime
from typing import List, Optional

from app.dtos.contactsDto import ContactBase
from pydantic import BaseModel


class AuthorBase(BaseModel):
    id: int
    nombre: str
    apellido: str
    fec_nac: date
    biografia: str
    pais_origen: str
    url: str
    public_id: str
    contactos: Optional[List[ContactBase]]


class AuthorCreate(AuthorBase):
    id: Optional[int] = None


class AuthorUpdate(AuthorBase):
    id: Optional[int] = None
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    fec_nac: Optional[date] = None
    biografia: Optional[str] = None
    pais_origen: Optional[str] = None
    url: Optional[str] = None
    public_id: Optional[str] = None
    contactos: Optional[List[ContactBase]] = None

class Author(AuthorBase):
    id: Optional[int]
    contactos: Optional[List[ContactBase]]
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime]

    class Config:
        from_attributes = True


class AuthorOut(AuthorBase):
    class Config:
        from_attributes = True


class AuthorObra(BaseModel):
    id: int
    nombre: str
    apellido: str
    pais_origen: str

    class Config:
        from_attributes = True
