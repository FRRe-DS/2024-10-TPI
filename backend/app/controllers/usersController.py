from datetime import datetime

from app.models.usersModel import UserModel
from app.dtos.usersDto import UserCreate, UserUpdate
from fastapi import HTTPException, status
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session


class UserController:

    def get_users(db: Session):
        return db.query(UserModel).filter(UserModel.deleted_at == None).all()

    def get_user_by_id(id: int, db: Session):
        user = db.query(UserModel).filter(UserModel.id == id).one_or_none()
        if user is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        elif user.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Usuario eliminado de forma lógica")
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
            db.rollback()

            error_message = str(e.orig)

            if "correo" in error_message:
                detail_message = "El correo ya existe"
            else:
                detail_message = error_message

            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=detail_message)
        
        return {'ok': True, 'mensaje': 'Creación del Usuario correcta', 'user': {'id': new_user.id, 'apellido': new_user.apellido, 'nombre': new_user.nombre, 'rol': new_user.rol, 'correo': new_user.correo}}

    def update_user(id: int, updatedUser: UserUpdate, db: Session):
        user = db.query(UserModel).filter(UserModel.id == id).one_or_none()
        if user is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        elif user.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Usuario eliminado de forma lógica")

        for key, value in updatedUser.model_dump(exclude_unset=True).items():
            if key == 'contrasenia_hasheada':
                pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
                value = pwd_context.hash(value)
            setattr(user, key, value)
        db.commit()
        db.refresh(user)
        return {'ok': True, 'mensaje': 'Actualización del Usuario correcta'}

    def delete_user(id: int, db: Session):
        user = db.query(UserModel).filter(UserModel.id == id).one_or_none()
        if user is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        elif user.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Usuario eliminado de forma lógica")
        
        user.deleted_at = datetime.now()
        db.commit()
        return {'ok': True, 'mensaje': 'Borrado lógico del Usuario correcto'}

    def exists_user_by_id(id: int, db: Session):
        user = db.query(UserModel).filter(UserModel.id == id).one_or_none()
        if user is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        elif user.deleted_at is not None:
            raise HTTPException(status_code=404, detail="Usuario eliminado de forma lógica")
