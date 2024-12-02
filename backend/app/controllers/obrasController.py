from sqlalchemy.orm import Session, selectinload
from sqlalchemy import update
from sqlalchemy.exc import SQLAlchemyError
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi import HTTPException, status
from app.models.obrasModel import ObrasModel
from app.dtos.obrasDto import ObraUpdate, ObraOut

class ObraController:
    def get_obras(db: Session):
        
        query = (
            db.query(ObrasModel)
            .filter(
                ObrasModel.deleted_at == None
                )
            .options(
                selectinload(ObrasModel.autor),
                selectinload(ObrasModel.imagenes)
            )
        )
        
        return paginate(query)
    
    def get_obra_by_id(id: int, db: Session):
        obra = (
            db.query(ObrasModel)
            .options(
                selectinload(ObrasModel.autor),
                selectinload(ObrasModel.imagenes)
            )
            .filter(ObrasModel.id == id)
            .one_or_none()
        )
        if obra is None:
            raise HTTPException(status_code=404, detail="Obra no encontrada")
        return ObraOut.model_validate(obra)
    
    def update_obra(id: int, updatedObra: ObraUpdate, db: Session):
        obra = db.query(ObrasModel).filter(ObrasModel.id == id).one_or_none()
        if obra is None:
            raise HTTPException(status_code=404, detail="Obra no encontrada")
        
        for key, value in updatedObra.model_dump(exclude_unset=True).items():
            setattr(obra, key, value)
        db.commit()
        db.refresh(obra)
        return {"mensaje": "Obra actualizada correctamente"}
    
    # actualizar votos y puntaje de una obra
    def incrementar_votos_y_puntaje(obra_id: int, estrellas: int, db: Session):
      try:
          stmt = (
              update(ObrasModel)
              .where(ObrasModel.id == obra_id)
              .values(
                  cant_votos=ObrasModel.cant_votos + 1,
                  puntaje_total=ObrasModel.puntaje_total + estrellas,
              )
          )
          result = db.execute(stmt)
          if result.rowcount == 0:
              raise HTTPException(status_code=404, detail="Obra no encontrada")
          db.commit()

      except SQLAlchemyError as e:
          db.rollback()
          raise HTTPException(
              status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail=f"Error al actualizar la obra: {str(e)}",
          )