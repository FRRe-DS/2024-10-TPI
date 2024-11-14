from datetime import date, datetime
from typing import List, Optional

from pydantic import BaseModel


class AuthorBase(BaseModel):
    id: int
    nombre: str
    apellido: str
    fec_nac: date
    biografia: str
    pais_origen: str


class AuthorCreate(AuthorBase):
    id: Optional[int] = None


class AuthorUpdate(AuthorBase):
    id: Optional[int] = None
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    fec_nac: Optional[date] = None
    biografia: Optional[str] = None
    pais_origen: Optional[str] = None


class Author(AuthorBase):
    id: Optional[int]
    contactos: Optional[List["ContactModel"]]
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
        orm_mode = True
