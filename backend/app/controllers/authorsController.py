from datetime import datetime

from sqlalchemy import or_
from app.dtos.authorsDto import AuthorCreate, AuthorUpdate, AuthorOut
from app.models.authorsModel import AuthorModel
from fastapi import HTTPException
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination import Params
from sqlalchemy.orm import Session


class AuthorController:

    def get_authors(db: Session, params: Params):
        autores = db.query(AuthorModel).filter(AuthorModel.deleted_at == None)
        return paginate(autores, params)

    def get_author_by_id(id: int, db: Session):
        author = db.query(AuthorModel).filter(AuthorModel.id == id).one_or_none()
        if author is None:
            raise HTTPException(status_code=404, detail="Autor no encontrado")
        elif author.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Autor eliminado de forma lógica")
        return author
    
    def get_author_by_name_and_lastname(nombre: str, apellido: str, db: Session):
        # Crea patrones para la búsqueda con Regex
        nombre_pattern = f"%{nombre}%" if nombre else "%"
        apellido_pattern = f"%{apellido}%" if apellido else "%"
        
        author = db.query(AuthorModel).filter(
            or_(
                AuthorModel.nombre.ilike(nombre_pattern),
                AuthorModel.apellido.ilike(apellido_pattern)
            )
        ).filter(AuthorModel.deleted_at.is_(None)).one_or_none()
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

