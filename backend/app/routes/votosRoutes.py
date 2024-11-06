from app.config.db import get_db
from app.controllers.votosController import VotosController
from app.schemas.votosSchema import VotosSchema
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

votos = APIRouter()


@votos.post("/votos", tags=["votos"])
def post_voto(voto: VotosSchema, db: Session = Depends(get_db)):
    return VotosController.post_voto(voto, db)
