from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.authController import AuthController
from app.schemas.usersSchema import UserCreate, UserLogin
from app.config.db import get_db

auth = APIRouter()

@auth.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return AuthController.register(user, db)

@auth.get("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    return AuthController.login(user, db)