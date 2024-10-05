from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AuthorBase(BaseModel):
  dni = int
  nombre = str
  apellido = str
  fec_nac = datetime
  biografia = str
  nacionalidad = str
  premios = str
  telefono = str
  email = str
  obras_previas = str

class AuthorCreate(AuthorBase):
  dni = int
  nombre = str
  apellido = str
  fec_nac = Optional[datetime] = None
  biografia = Optional[str] = None
  nacionalidad = str
  premios = Optional[str] = None
  telefono = Optional[str] = None
  email = Optional[str] = None
  obras_previas = Optional[str] = None

class AuthorUpdate(AuthorBase):
  nombre = Optional[str] = None
  apellido = Optional[str] = None
  fec_nac = Optional[datetime] = None
  biografia = Optional[str] = None
  nacionalidad = Optional[str] = None
  premios = Optional[str] = None
  telefono = Optional[str] = None
  email = Optional[str] = None
  obras_previas = Optional[str] = None

class Author(AuthorBase):
  dni = Optional[int]
  nombre = Optional[str]
  apellido = Optional[str]
  created_at = datetime
  updated_at = datetime
  deleted_at = Optional[datetime]

  class Config:
    from_attributes = True