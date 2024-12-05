from datetime import datetime
from sqlalchemy.orm import Session
from app.models.votosModel import VotosModel
from app.dtos.votosDto import VotosBase, VotosUpdate
from app.controllers.obrasController import ObraController
from app.controllers.usersController import UserController
from fastapi import HTTPException

class VotosController:
    def get_voto(usuario_id: int, obra_id: int, db: Session):
        voto = db.query(VotosModel).filter(VotosModel.usuario_id == usuario_id, VotosModel.obra_id == obra_id).one_or_none()
        if voto is None:
            raise HTTPException(status_code=404, detail="Voto no encontrado")
        elif voto.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Voto eliminado de forma lógica")
            # si ya voto, se le deberia habilitar la opcion de modificar su voto
        return voto

    def post_voto(voto: VotosBase, db: Session):
        new_voto = VotosModel(**voto.model_dump())
        # verificar si usuario y obra existen y no estan borrados
        UserController.exists_user_by_id(voto.usuario_id, db)
        ObraController.exists_obra_by_id(voto.obra_id, db)

        # verificar si el usuario ya voto por esa obra
        query = db.query(VotosModel).filter(VotosModel.usuario_id == voto.usuario_id, VotosModel.obra_id == voto.obra_id).one_or_none()
        if query is not None:
            raise HTTPException(status_code=409, detail="El usuario ya votó por esta obra")
        
        db.add(new_voto)
        ObraController.incrementar_votos_y_puntaje(voto.obra_id, voto.estrellas, db)
        db.commit()
        db.refresh(new_voto)
        return {"ok": True, "mensaje": "Registro del Voto correcto"}

    def update_voto(usuario_id: int, obra_id: int, updatedVoto: VotosUpdate, db: Session):
        voto = db.query(VotosModel).filter(VotosModel.usuario_id == usuario_id, VotosModel.obra_id == obra_id).one_or_none()
        if voto is None:
            print("id usuario: ", usuario_id, " id obra: ", obra_id)
            raise HTTPException(status_code=404, detail="Voto no encontrado")
        elif voto.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Voto eliminado de forma lógica")

        voto.estrellas = updatedVoto.estrellas
        db.commit()
        db.refresh(voto)
        return {"ok": True, "mensaje": "Actualización del Voto correcta", "voto": voto}

    def delete_voto(usuario_id: int, obra_id: int, db: Session):
        voto = db.query(VotosModel).filter(VotosModel.usuario_id == usuario_id, VotosModel.obra_id == obra_id).one_or_none()
        if voto is None:
            raise HTTPException(status_code=404, detail="Voto no encontrado")
        elif voto.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Voto eliminado de forma lógica")
        
        voto.deleted_at = datetime.now()
        db.commit()
        return {"ok": True, "mensaje": "Eliminación lógica del Voto correcta"}
