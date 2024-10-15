from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.authorsController import AuthorController
from app.schemas.authorsSchema import AuthorCreate, AuthorUpdate
from app.config.db import get_db

author = APIRouter()

@author.get("/autores")
def get_authors(db: Session = Depends(get_db)):
    return AuthorController.get_authors(db)

@author.get("/autores/{id}")
def get_author_by_id(id: int, db: Session = Depends(get_db)):
    return AuthorController.get_author_by_id(id, db)

@author.post("/autores")
def create_author(author: AuthorCreate, db: Session = Depends(get_db)):
    return AuthorController.create_author(author, db)

@author.patch("/autores/{id}")
def update_author(id: int, updatedAuthor: AuthorUpdate, db: Session = Depends(get_db)):
    return AuthorController.update_author(id, updatedAuthor, db)

@author.delete("/autores/{id}")
def delete_author(id: int, db: Session = Depends(get_db)):
    return AuthorController.delete_author(id, db)

@author.head("/autores/{id}")
def exists_author_by_id(id: int, db: Session = Depends(get_db)):
    return AuthorController.exists_author_by_id(id, db)

@author.head("/autores/dni/{dni}")
def exists_author_by_dni(dni: str, db: Session = Depends(get_db)):
    return AuthorController.exists_author_by_dni(dni, db)