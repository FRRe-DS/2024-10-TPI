from fastapi import APIRouter, Depends
from fastapi_pagination import Page, Params
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy.orm import Session
from app.config.db import get_db
from app.controllers.obrasController import ObraController
from app.dtos.obrasDto import ObraBase, ObraOut, ObraUpdate, ObraCreate

obras = APIRouter()

@obras.get(
    path="/obras",
    response_model=Page[ObraOut],
    tags=["obras"],
)
def get_obras(db: Session = Depends(get_db), params: Params = Depends(), nombre: str = None, apellido: str = None):
    if nombre:
        return ObraController.get_obras_by_autor(nombre, apellido, db, params)
    return ObraController.get_obras(db, params)

@obras.get("/obras/nombre/{nombre_obra}", response_model=ObraOut, tags=["obras"])
def get_obra_by_name(nombre_obra: str, db: Session = Depends(get_db)):
  return ObraController.get_obra_by_name(nombre_obra, db)

@obras.get("/obras/{id}", response_model=ObraBase, tags=["obras"])
def get_obra_by_id(id: int, db: Session = Depends(get_db)):
    return ObraController.get_obra_by_id(id, db)

@obras.post("/obras", tags=["obras"])
def create_obra(obra: ObraCreate, db: Session = Depends(get_db)):
    return ObraController.create_obra(obra, db)

@obras.patch("/obras/{id}", tags=["obras"])
def update_obra(id: int, updatedObra: ObraUpdate, db: Session = Depends(get_db)):
    return ObraController.update_obra(id, updatedObra, db)

@obras.delete("/obras/{id}", tags=["obras"])
def delete_obra(id: int, db: Session = Depends(get_db)):
    return ObraController.delete_obra(id, db)