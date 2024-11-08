from app.models.obrasModel import ObrasModel
from fastapi import HTTPException
from fastapi_pagination import paginate, set_params
from fastapi_pagination.default import Params
from sqlalchemy.orm import Session, selectinload


class ObraController:

    def get_obras(db: Session):
        results = db.query(ObrasModel).options(selectinload(ObrasModel.autor)).all()
        set_params(Params(size=20))
        return paginate(results)

    def get_obra_by_id(id: int, db: Session):
        obra = db.query(ObrasModel).filter(ObrasModel.id == id).one_or_none()
        if obra is None:
            raise HTTPException(status_code=404, detail="Obra no encontrada")
        return obra
