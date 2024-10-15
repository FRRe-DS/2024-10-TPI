from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.usersModel import UserModel
from app.schemas.usersSchema import UserCreate, UserUpdate

class UserController:

  def get_users(db: Session):
      return db.query(UserModel).all()
  
  def get_user_by_id(id: int, db: Session):
      user = db.query(UserModel).filter(UserModel.id == id).one_or_none()
      if user is None:
          raise HTTPException(status_code=404, detail="Usuario no encontrado")
      return user
  
  def create_user(user: UserCreate, db: Session):
      new_user = UserModel(**user.model_dump())
      db.add(new_user)
      db.commit()
      db.refresh(new_user)
      return {"mensaje": "Usuario creado correctamente"}
  
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
      user.deleted_at = datetime.now()
      db.commit()
      return {"mensaje": "Usuario eliminado correctamente"}
  
  def exists_user_by_id(id: int, db: Session):
      user = db.query(UserModel).filter(UserModel.id == id).one_or_none()
      return {"existe": user is not None}
  
  def exists_user_by_dni(dni: str, db: Session):
      user = db.query(UserModel).filter(UserModel.dni == dni).one_or_none()
      return {"existe": user is not None}
  