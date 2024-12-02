# app/schemas/votos.py
from pydantic import BaseModel


class VotosSchema(BaseModel):
    usuario_id: int
    obra_id: int
    estrellas: int

    class Config:
        from_attributes = True
