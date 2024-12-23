from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.db import get_db
from app.controllers.votosController import VotosController
from app.dtos.votosDto import VotosBase, VotosUpdate

votos = APIRouter()


@votos.post("/votos", tags=["votos"])
def post_voto(voto: VotosBase, db: Session = Depends(get_db)):
    return VotosController.post_voto(voto, db)


@votos.get("/votos/{usuario_id}/{obra_id}", tags=["votos"])
def get_voto(usuario_id: int, obra_id: int, db: Session = Depends(get_db)):
    return VotosController.get_voto(usuario_id, obra_id, db)


@votos.patch("/votos/{usuario_id}/{obra_id}", tags=["votos"])
def update_voto(usuario_id: int, obra_id: int, updatedVoto: VotosUpdate, db: Session = Depends(get_db)):
    return VotosController.update_voto(usuario_id, obra_id, updatedVoto, db)


@votos.delete("/votos/{usuario_id}/{obra_id}", tags=["votos"])
def delete_voto(usuario_id: int, obra_id: int, db: Session = Depends(get_db)):
    return VotosController.delete_voto(usuario_id, obra_id, db)
