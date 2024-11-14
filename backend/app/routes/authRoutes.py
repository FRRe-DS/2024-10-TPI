from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.authController import AuthController
from app.dtos.usersDto import UserCreate, UserLogin
from app.config.db import get_db

auth = APIRouter()

# manejamos la logica para registrar el usuario
@auth.post("/register",tags = ["autenticacion"])
def register(user: UserCreate, db: Session = Depends(get_db)):
    return AuthController.register(user, db)

# manejamos la logica para logear el usuario
@auth.post("/login",tags = ["autenticacion"])
def login(user: UserLogin, db: Session = Depends(get_db)):
    return AuthController.login(user, db)