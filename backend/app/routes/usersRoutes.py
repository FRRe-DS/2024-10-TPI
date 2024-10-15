from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.usersController import UserController
from app.schemas.usersSchema import UserCreate, UserUpdate
from app.config.db import get_db

user = APIRouter()

@user.get("/usuarios")
def get_users(db: Session = Depends(get_db)):
    return UserController.get_users(db)

@user.get("/usuarios/{id}")
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    return UserController.get_user_by_id(id, db)

@user.post("/usuarios")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return UserController.create_user(user, db)

@user.patch("/usuarios/{id}")
def update_user(id: int, updatedUser: UserUpdate, db: Session = Depends(get_db)):
    return UserController.update_user(id, updatedUser, db)

@user.delete("/usuarios/{id}")
def delete_user(id: int, db: Session = Depends(get_db)):
    return UserController.delete_user(id, db)

@user.head("/usuarios/{id}")
def exists_user_by_id(id: int, db: Session = Depends(get_db)):
    return UserController.exists_user_by_id(id, db)

@user.head("/usuarios/dni/{dni}")
def exists_user_by_dni(dni: str, db: Session = Depends(get_db)):
    return UserController.exists_user_by_dni(dni, db)