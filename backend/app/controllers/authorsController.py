from datetime import datetime

from app.dtos.authorsDto import AuthorCreate, AuthorUpdate, AuthorOut
from app.models.authorsModel import AuthorModel
from fastapi import HTTPException
from fastapi_pagination import paginate, set_params
from fastapi_pagination.default import Params
from sqlalchemy.orm import Session


class AuthorController:

    def get_authors(db: Session):
        autores = db.query(AuthorModel).filter(AuthorModel.deleted_at == None).all()
        set_params(Params(size=20))
        return paginate(autores)

    def get_author_by_id(id: int, db: Session):
        author = db.query(AuthorModel).filter(AuthorModel.id == id).one_or_none()
        if author is None:
            raise HTTPException(status_code=404, detail="Autor no encontrado")
        elif author.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Autor eliminado de forma lógica")
        return author
    
    def get_author_by_name_and_lastname(nombre: str, apellido: str, db: Session):
        author = db.query(AuthorModel).filter(AuthorModel.nombre == nombre, AuthorModel.apellido == apellido).one_or_none()
        if author is None:
            raise HTTPException(status_code=404, detail="Autor no encontrado")
        elif author.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Autor eliminado de forma lógica")
        return author

    def create_author(author: AuthorCreate, db: Session):
        new_author = AuthorModel(**author.model_dump())
        db.add(new_author)
        db.commit()
        db.refresh(new_author)
        return {'ok': True, 'mensaje': 'Creación del Autor correcta'}

    def update_author(id: int, updatedAuthor: AuthorUpdate, db: Session):
        author = db.query(AuthorModel).filter(AuthorModel.id == id).one_or_none()
        if author is None:
            raise HTTPException(status_code=404, detail="Autor no encontrado")
        elif author.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Autor eliminado de forma lógica")

        for key, value in updatedAuthor.model_dump(exclude_unset=True).items():
            setattr(author, key, value)
        db.commit()
        db.refresh(author)
        return {'ok': True, 'mensaje': 'Actualización del Autor correcta'}

    def delete_author(id: int, db: Session):
        author = db.query(AuthorModel).filter(AuthorModel.id == id).one_or_none()
        
        if author is None:
            raise HTTPException(status_code=404, detail="Autor no encontrado")
        elif author.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Autor eliminado de forma lógica")
        
        author.deleted_at = datetime.now()
        db.commit()
        return {'ok': True, 'mensaje': 'Borrado lógico del Autor correcto'}
    
    def exists_author_by_id(id: int, db: Session):
        author = db.query(AuthorModel).filter(AuthorModel.id == id).one_or_none()
        return {"existe": author is not None}
