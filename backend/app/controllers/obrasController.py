from sqlalchemy.orm import Session, selectinload
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi import HTTPException
from app.models.obrasModel import ObrasModel
from app.dtos.obrasDto import ObraOut

class ObraController:
    def get_obras(db: Session):
        
        query = (
            db.query(ObrasModel)
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