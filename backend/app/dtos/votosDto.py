# app/schemas/votos.py
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class VotosBase(BaseModel):
    usuario_id: int
    obra_id: int
    estrellas: int

    class Config:
        from_attributes = True

class VotosUpdate(VotosBase):
    usuario_id: Optional[int] = None
    obra_id: Optional[int] = None
    estrellas: Optional[int] = None


class Votos(VotosBase):
    id: int
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime]

    class Config:
        from_attributes = True
