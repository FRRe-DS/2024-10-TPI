from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.usersModel import UserModel
from app.schemas.usersSchema import UserCreate, UserLogin
from app.schemas.tokenSchema import Token
from app.controllers.usersController import UserController
from passlib.context import CryptContext
from app.utils.jwt import create_access_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthController:

  def login(user: UserLogin, db: Session):
      user_b = db.query(UserModel).filter(UserModel.correo == user.correo).first()
      if not user_b:
          raise HTTPException(status_code=404, detail="Usuario no encontrado")
      verif = pwd_context.verify(user.contrasenia_hasheada, user_b.contrasenia_hasheada)
      if not verif:
          raise HTTPException(status_code=401, detail="Credenciales invalidas")
      access_token = create_access_token(data={"sub": user_b.correo})
      token_response = Token(access_token=access_token, token_type="bearer")
      return token_response

  def register(user: UserCreate, db: Session):
      
      user_exists = UserController.exists_user_by_dni(user.dni, db)
      if user_exists["existe"]:
          raise HTTPException(status_code=400, detail="El usuario ya existe")
      respuesta = UserController.create_user(user, db)
      return respuesta