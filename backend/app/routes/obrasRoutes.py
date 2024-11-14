from fastapi import APIRouter, Depends
from fastapi_pagination import Page
from sqlalchemy.orm import Session

from app.config.db import get_db
from app.controllers.obrasController import ObraController
from app.dtos.obrasDto import ObraBase, ObraOut

obras = APIRouter()


@obras.get(
    path="/obras",
    name="Gets all rows of Obras table",
    response_model=Page[ObraOut],
    tags=["obras"],
)
async def get_obras(db: Session = Depends(get_db)):
    return ObraController.get_obras(db)


@obras.get("/obras/{id}", response_model=ObraBase, tags=["obras"])
def get_obra_by_id(id: int, db: Session = Depends(get_db)):
    return ObraController.get_obra_by_id(id, db)
