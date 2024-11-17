from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ImagenBase(BaseModel):
    id: int
    id_obra: int
    url: str
    public_id: str
    etapa_obra: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None