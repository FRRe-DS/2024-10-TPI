from pydantic import BaseModel

class Token(BaseModel):
  access_token: str
  token_type: str

# el esquema TokenData puede ser útil para almacenar más información del usuario en el token
# class TokenData(BaseModel):
#   nombre: str = None
#   apellido: str = None
#   correo: str = None