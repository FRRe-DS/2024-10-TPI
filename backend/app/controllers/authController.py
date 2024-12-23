from app.controllers.usersController import UserController
from app.models.usersModel import UserModel
from app.dtos.tokenDto import Token
from app.dtos.usersDto import UserCreate, UserLogin
from app.utils.jwt import create_access_token
from fastapi import HTTPException
from passlib.context import CryptContext
from sqlalchemy.orm import Session

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthController:

    def login(user: UserLogin, db: Session):
        user_b = db.query(UserModel).filter(UserModel.correo == user.correo).first()
        if not user_b:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        verif = pwd_context.verify(
            user.contrasenia_hasheada, user_b.contrasenia_hasheada
        )
        if not verif:
            raise HTTPException(status_code=401, detail="Credenciales invalidas")
        access_token = create_access_token(data={"sub": user_b.correo})
        token_response = Token(access_token=access_token, token_type="bearer")
        user_response = {
            "id": user_b.id,
            "nombre": user_b.nombre,
            "apellido": user_b.apellido,
            "correo": user_b.correo,
            "rol": user_b.rol,
        }
        return {"token": token_response, "user": user_response}

    def register(user: UserCreate, db: Session):
        respuesta = UserController.create_user(user, db)
        access_token = create_access_token(data={"sub": user.correo})
        token_response = Token(access_token=access_token, token_type="bearer")
        return {**respuesta, "token": token_response}
