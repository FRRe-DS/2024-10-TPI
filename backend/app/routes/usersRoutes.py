from app.config.db import get_db
from app.controllers.usersController import UserController
from app.dtos.usersDto import UserCreate, UserUpdate
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

user = APIRouter()


@user.get("/usuarios", tags=["usuarios"])
def get_users(db: Session = Depends(get_db)):
    return UserController.get_users(db)


@user.get("/usuarios/{id}", tags=["usuarios"])
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    return UserController.get_user_by_id(id, db)


@user.post("/usuarios", tags=["usuarios"])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return UserController.create_user(user, db)


@user.patch("/usuarios/{id}", tags=["usuarios"])
def update_user(id: int, updatedUser: UserUpdate, db: Session = Depends(get_db)):
    return UserController.update_user(id, updatedUser, db)


@user.delete("/usuarios/{id}", tags=["usuarios"])
def delete_user(id: int, db: Session = Depends(get_db)):
    return UserController.delete_user(id, db)


@user.head("/usuarios/{id}", tags=["usuarios"])
def exists_user_by_id(id: int, db: Session = Depends(get_db)):
    return UserController.exists_user_by_id(id, db)

