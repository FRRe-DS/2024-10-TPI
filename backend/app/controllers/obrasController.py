from datetime import datetime
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import update
from sqlalchemy.exc import SQLAlchemyError
from fastapi_pagination import paginate, set_params
from fastapi_pagination.default import Params
from fastapi import HTTPException, status
from app.models.obrasModel import ObrasModel
from app.dtos.obrasDto import ObraUpdate, ObraOut
from app.dtos.imagenDto import ImagenBase
from app.controllers.authorsController import AuthorController

class ObraController:
    def get_obras(db: Session):
        obras = db.query(ObrasModel).filter(ObrasModel.deleted_at == None).all()
        set_params(Params(size=20))
        return paginate(obras)
    
    def get_obra_by_id(id: int, db: Session):
        obra = db.query(ObrasModel).filter(ObrasModel.id == id).one_or_none()
        if obra is None:
            raise HTTPException(status_code=404, detail="Obra no encontrada")
        elif obra.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Obra eliminada de forma lógica")
        return obra
    
    def get_obra_by_name(nombre_obra: str, db: Session):
        nombre_obra = nombre_obra.strip()
        obra = db.query(ObrasModel).filter(ObrasModel.nombre_obra == nombre_obra).one_or_none()
        if obra is None:
            raise HTTPException(status_code=404, detail="Obra no encontrada")
        elif obra.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Obra eliminada de forma lógica")
        return obra
        
    
    def get_obras_by_autor(nombre: str, apellido: str, db: Session):
        # buscar el id del autor
        author = AuthorController.get_author_by_name_and_lastname(nombre, apellido, db)
        
        obra = db.query(ObrasModel).filter(ObrasModel.autor_id == author.id, ObrasModel.deleted_at == None).all()
        if obra is None:
            raise HTTPException(status_code=404, detail="Obras no encontradas")
        return paginate(obra)

    
    def update_obra(id: int, updatedObra: ObraUpdate, db: Session):
        obra = db.query(ObrasModel).filter(ObrasModel.id == id).one_or_none()
        if obra is None:
            raise HTTPException(status_code=404, detail="Obra no encontrada")
        elif obra.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Obra eliminada de forma lógica")
        
        for key, value in updatedObra.model_dump(exclude_unset=True).items():
            setattr(obra, key, value)
        db.commit()
        db.refresh(obra)
        return {'ok': True, 'mensaje': 'Actualización de la Obra correcta'}
    
    # actualizar votos y puntaje de una obra
    def incrementar_votos_y_puntaje(obra_id: int, estrellas: int, db: Session):
        try:
            stmt = (
                update(ObrasModel)
                .where(ObrasModel.id == obra_id)
                .values(
                    cant_votos=ObrasModel.cant_votos + 1,
                    puntaje_total=ObrasModel.puntaje_total + estrellas
                )
            )
            db.execute(stmt)
            db.commit()
            return {"ok": True, "mensaje": "Registro del Voto correcto"}

        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=f"Error en la votación de la obra: {str(e)}")
      
    def delete_obra(id: int, db: Session):
        obra = db.query(ObrasModel).filter(ObrasModel.id == id).one_or_none()
        if obra is None:
            raise HTTPException(status_code=404, detail="Obra no encontrada")
        elif obra.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Obra eliminada de forma lógica")
        
        obra.deleted_at = datetime.now()
        db.commit()
        return {"ok": True, "mensaje": "Borrado lógico de la Obra correcto"}
    
    def exists_obra_by_id(id: int, db: Session):
        obra = db.query(ObrasModel).filter(ObrasModel.id == id).one_or_none()
        if obra is None:
            raise HTTPException(status_code=404, detail="Obra no encontrada")
        elif obra.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Obra eliminada de forma lógica")