"""
import os
from sqlalchemy.orm import Session
from app.seeds.seedTable import seed_table  # Reutilizar la función genérica
from app.models.usersModel import UserCreate  # El modelo específico para usuarios

def seed_users(db: Session):
    json_path = os.path.join(os.path.dirname(__file__), "data", "users.json")
    
    seed_table(UserCreate, json_path, db, date_fields=["date_of_birth"])

"""
