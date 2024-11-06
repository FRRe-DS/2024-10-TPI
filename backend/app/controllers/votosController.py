from datetime import datetime

import pytz
from app.models.votosModel import VotosModel
from sqlalchemy.orm import Session


class VotosController:
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

        if votoquery is None:
            new_voto = VotosModel(usuario_id=voto.usuario_id, obra_id=voto.obra_id)
            db.add(new_voto)
            db.commit()
            db.refresh(new_voto)
            return {"deleted": False, "mensaje": "Voto registrado correctamente"}
        elif votoquery.deleted_at is None:
            utc_now = datetime.now(
                pytz.utc
            )  # Get the current UTC time with timezone awareness
            votoquery.deleted_at = utc_now
            db.commit()
            db.refresh(votoquery)
            return {"deleted": True, "mensaje": "Voto marcado como eliminado"}
        else:
            utc_now = datetime.now(
                pytz.utc
            )  # Get the current UTC time with timezone awareness
            votoquery.deleted_at = None
            votoquery.updated_at = utc_now
            db.commit()
            db.refresh(votoquery)
            return {"deleted": False, "mensaje": "Voto registrado correctamente"}
