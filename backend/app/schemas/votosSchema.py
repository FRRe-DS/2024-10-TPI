# app/schemas/votos.py
from pydantic import BaseModel


class VotosSchema(BaseModel):
    usuario_id: int
    obra_id: int
    estrellas: int

    class Config:
        orm_mode = True  # Allows Pydantic to read data as if it were from an ORM model
