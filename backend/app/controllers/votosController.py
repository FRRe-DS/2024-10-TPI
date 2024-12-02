from sqlalchemy.orm import Session
from app.models.votosModel import VotosModel
from app.controllers.obrasController import ObraController
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status

class VotosController:
    def get_voto(usuario_id: int, obra_id: int, db: Session):
        return (
            db.query(VotosModel)
            .filter(VotosModel.usuario_id == usuario_id, VotosModel.obra_id == obra_id)
            .one_or_none()
        )

    def post_voto(voto: VotosModel, db: Session):
      new_voto = VotosModel(**voto.model_dump())
      try:
          db.add(new_voto)
          ObraController.incrementar_votos_y_puntaje(voto.obra_id, voto.estrellas, db)
          db.commit()
          db.refresh(new_voto)
      except IntegrityError as e:
          db.rollback()
          error_message = str(e.orig)
          if "usuario_id" in error_message:
              detail_message = "El usuario ya votó por esta obra"
          else:
              detail_message = error_message
          raise HTTPException(
              status_code=status.HTTP_409_CONFLICT, detail=detail_message
          )
      return {"ok": True, "mensaje": "Voto registrado correctamente"}

    def update_voto(voto: VotosModel, db: Session):
        votoquery = (
            db.query(VotosModel)
            .filter(
                VotosModel.usuario_id == voto.usuario_id,
                VotosModel.obra_id == voto.obra_id,
            )
            .one_or_none()
        )

        if votoquery is None:
            return {"ok": False, "mensaje": "No existe un voto con ese usuario y obra"}

        votoquery.estrellas = voto.estrellas
        db.commit()
        db.refresh(votoquery)
        return {
            "ok": True,
            "voto": votoquery,
            "mensaje": "Voto actualizado correctamente",
        }

    def delete_voto(voto: VotosModel, db: Session):
        votoquery = (
            db.query(VotosModel)
            .filter(
                VotosModel.usuario_id == voto.usuario_id,
                VotosModel.obra_id == voto.obra_id,
            )
            .one_or_none()
        )

        if votoquery is None:
            return {"ok": False, "mensaje": "No existe un voto con ese usuario y obra"}

        db.delete(votoquery)
        db.commit()
        return {"ok": True, "mensaje": "Voto eliminado correctamente"}
