from datetime import datetime

from app.models.usersModel import UserModel
from app.schemas.usersSchema import UserCreate, UserUpdate
from fastapi import HTTPException, status
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session


class UserController:

    def get_users(db: Session):
        return db.query(UserModel).all()

    def get_user_by_id(id: int, db: Session):
        user = db.query(UserModel).filter(UserModel.id == id).one_or_none()
        if user is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        return user

    def create_user(user: UserCreate, db: Session):
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        user.contrasenia_hasheada = pwd_context.hash(user.contrasenia_hasheada)
        new_user = UserModel(**user.model_dump())
        try:
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
        except IntegrityError as e:
            db.rollback()  # Roll back any partial changes

            # Check the error message for details about the unique constraint
            error_message = str(e.orig)

            if "correo" in error_message:
                detail_message = "El correo ya existe"
            elif "dni" in error_message:
                detail_message = "El DNI ya existe"
            else:
                detail_message = error_message

            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail=detail_message
            )
        return {
            "mensaje": "Usuario creado correctamente",
            "user": {
                "apellido": new_user.apellido,
                "nombre": new_user.nombre,
                "id": new_user.id,
                "correo": new_user.correo,
            },
        }

    def update_user(id: int, updatedUser: UserUpdate, db: Session):
        user = db.query(UserModel).filter(UserModel.id == id).one_or_none()
        if user is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        for key, value in updatedUser.model_dump(exclude_unset=True).items():
            setattr(user, key, value)
        db.commit()
        db.refresh(user)
        return {"mensaje": "Usuario actualizado correctamente"}

    def delete_user(id: int, db: Session):
        user = db.query(UserModel).filter(UserModel.id == id).one_or_none()
        if user is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        db.delete(user)
        db.commit()
        return {"mensaje": "Usuario eliminado correctamente"}

    def exists_user_by_id(id: int, db: Session):
        user = db.query(UserModel).filter(UserModel.id == id).one_or_none()
        return {"existe": user is not None}

