from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.authorsController import AuthorController
from app.schemas.authorsSchema import AuthorCreate, AuthorUpdate
from app.config.db import get_db

author = APIRouter()

@author.get("/autores")
def get_authors(db: Session = Depends(get_db)):
    return AuthorController.get_authors(db)

@author.get("/autores/{dni}")
def get_author_by_dni(dni: int, db: Session = Depends(get_db)):
    return AuthorController.get_author_by_dni(dni, db)

@author.post("/autores")
def create_author(author: AuthorCreate, db: Session = Depends(get_db)):
    return AuthorController.create_author(author, db)

@author.patch("/autores/{dni}")
def update_author(dni: int, updatedAuthor: AuthorUpdate, db: Session = Depends(get_db)):
    return AuthorController.update_author(dni, updatedAuthor, db)

@author.delete("/autores/{dni}")
def delete_author(dni: int, db: Session = Depends(get_db)):
    return AuthorController.delete_author(dni, db)