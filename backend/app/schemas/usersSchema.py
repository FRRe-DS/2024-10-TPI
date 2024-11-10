from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# otras clases heredan de esta clase
class UserBase(BaseModel):
  id: int
  nombre: str
  apellido: str
  contrasenia_hasheada: str
  correo: str

# Se usa para validar los datos cuando un nuevo usuario se registra.
class UserCreate(UserBase):
  id: Optional[int] = None

class UserUpdate(UserBase):
  id: Optional[int] = None
  nombre: Optional[str] = None
  apellido: Optional[str] = None
  contrasenia_hasheada: Optional[str] = None
  correo: Optional[str] = None

# Esta clase se usa para validar los datos durante el proceso de inicio de sesión de un usuario.
class UserLogin(UserBase):
  id: Optional[int] = None
  nombre: Optional[str] = None
  apellido: Optional[str] = None
  contrasenia_hasheada: str
  correo: str

# Representa a un usuario en el sistema, incluyendo atributos adicionales que podrían ser útiles, como created_at, updated_at, y deleted_at.
class User(UserBase):
  id: Optional[int]
  created_at: datetime
  updated_at: datetime
  deleted_at: Optional[datetime]

  class Config:
    from_attributes = True