from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
  id: int
  nombre: str
  apellido: str
  contrasenia: str
  dni: str
  correo: str

class UserCreate(UserBase):
  id: Optional[int] = None

class UserUpdate(UserBase):
  id: Optional[int] = None
  nombre: Optional[str] = None
  apellido: Optional[str] = None
  contrasenia: Optional[str] = None
  dni: Optional[str] = None
  correo: Optional[str] = None

class User(UserBase):
  id: Optional[int]
  dni: Optional[str]
  created_at: datetime
  updated_at: datetime
  deleted_at: Optional[datetime]

  class Config:
    from_attributes = True