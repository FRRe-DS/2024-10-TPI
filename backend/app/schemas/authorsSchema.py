from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date

class AuthorBase(BaseModel):
  id: int
  dni: str
  nombre: str
  apellido: str
  fec_nac: date
  biografia: str
  pais_origen: str

class AuthorCreate(AuthorBase):
  pass

class AuthorUpdate(AuthorBase):
  dni: Optional[str] = None
  nombre: Optional[str] = None
  apellido: Optional[str] = None
  fec_nac: Optional[date] = None
  biografia: Optional[str] = None
  pais_origen: Optional[str] = None

class Author(AuthorBase):
  id: Optional[int]
  dni: Optional[str]
  contactos: Optional[List["ContactModel"]] # type: ignore
  created_at: datetime
  updated_at: datetime
  deleted_at: Optional[datetime]

  class Config:
    from_attributes = True