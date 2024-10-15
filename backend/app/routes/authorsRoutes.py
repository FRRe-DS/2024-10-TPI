from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.authorsController import AuthorController
from app.schemas.authorsSchema import AuthorCreate, AuthorUpdate
from app.config.db import get_db

author = APIRouter()

@author.get("/autores")
def get_authors(db: Session = Depends(get_db)):
    return AuthorController.get_authors(db)

@author.get("/autores/{id_autor}")
def get_author_by_id(id_autor: int, db: Session = Depends(get_db)):
    return AuthorController.get_author_by_id(id_autor, db)

@author.post("/autores")
def create_author(author: AuthorCreate, db: Session = Depends(get_db)):
    return AuthorController.create_author(author, db)

@author.patch("/autores/{id_autor}")
def update_author(id_autor: int, updatedAuthor: AuthorUpdate, db: Session = Depends(get_db)):
    return AuthorController.update_author(id_autor, updatedAuthor, db)

@author.delete("/autores/{id_autor}")
def delete_author(id_autor: int, db: Session = Depends(get_db)):
    return AuthorController.delete_author(id_autor, db)

@author.head("/autores/{id_autor}")
def exists_author_by_id(id_autor: int, db: Session = Depends(get_db)):
    return AuthorController.exists_author_by_id(id_autor, db)

@author.head("/autores/dni/{dni}")
def exists_author_by_dni(dni: str, db: Session = Depends(get_db)):
    return AuthorController.exists_author_by_dni(dni, db)