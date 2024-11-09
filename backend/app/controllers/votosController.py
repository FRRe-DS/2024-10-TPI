from datetime import datetime

import pytz
from sqlalchemy.orm import Session

from app.models.votosModel import VotosModel


class VotosController:
    @staticmethod
    def get_voto(usuario_id: int, obra_id: int, db: Session):
        return (
            db.query(VotosModel)
            .filter(VotosModel.usuario_id == usuario_id, VotosModel.obra_id == obra_id)
            .one_or_none()
        )

    @staticmethod
    def post_voto(voto: VotosModel, db: Session):
        votoquery = (
            db.query(VotosModel)
            .filter(
                VotosModel.usuario_id == voto.usuario_id,
                VotosModel.obra_id == voto.obra_id,
            )
            .one_or_none()
        )

        if votoquery is not None:
            return {"ok": False, "mensaje": "Ya existe un voto con ese usuario y obra"}

        new_voto = VotosModel(
            usuario_id=voto.usuario_id, obra_id=voto.obra_id, estrellas=voto.estrellas
        )
        db.add(new_voto)
        db.commit()
        db.refresh(new_voto)
        return {"ok": True, "mensaje": "Voto registrado correctamente"}

    @staticmethod
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
        votoquery.updated_at = datetime.now(pytz.utc)
        db.commit()
        db.refresh(votoquery)
        return {
            "ok": True,
            "voto": votoquery,
            "mensaje": "Voto actualizado correctamente",
        }

    @staticmethod
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
