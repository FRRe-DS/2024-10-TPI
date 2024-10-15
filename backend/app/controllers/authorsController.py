from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.authorsModel import AuthorModel
from app.schemas.authorsSchema import AuthorCreate, AuthorUpdate

class AuthorController:

  def get_authors(db: Session):
      return db.query(AuthorModel).all()

  def get_author_by_id(id: int, db: Session):
      author = db.query(AuthorModel).filter(AuthorModel.id == id).one_or_none()
      if author is None:
          raise HTTPException(status_code=404, detail="Autor no encontrado")
      return author
  
  def create_author(author: AuthorCreate, db: Session):
      new_author = AuthorModel(**author.model_dump())
      db.add(new_author)
      db.commit()
      db.refresh(new_author)
      return {"mensaje": "Autor creado correctamente"}
  
  def update_author(id: int, updatedAuthor: AuthorUpdate, db: Session):
      author = db.query(AuthorModel).filter(AuthorModel.id == id).one_or_none()
      if author is None:
          raise HTTPException(status_code=404, detail="Autor no encontrado")
      
      for key, value in updatedAuthor.model_dump(exclude_unset=True).items():
          setattr(author, key, value)
      db.commit()
      db.refresh(author)
      return {"mensaje": "Autor actualizado correctamente"}
  
  def delete_author(id: int, db: Session):   
      author = db.query(AuthorModel).filter(AuthorModel.id == id).one_or_none()
      if author is None:
          raise HTTPException(status_code=404, detail="Autor no encontrado")
      author.deleted_at = datetime.now()
      db.commit()
      return {"mensaje": "Autor eliminado correctamente"}
  
  def exists_author_by_id(id: int, db: Session):
      author = db.query(AuthorModel).filter(AuthorModel.id == id).one_or_none()
      return {"existe": author is not None}
  
  def exists_author_by_dni(dni: str, db: Session):
      author = db.query(AuthorModel).filter(AuthorModel.dni == dni).one_or_none()
      return {"existe": author is not None}