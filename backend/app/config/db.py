from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from os import getenv

# Variables de entorno
load_dotenv()
DB_USER = getenv('DB_USER')
DB_PASSWORD = getenv('DB_PASSWORD')
DB_HOST = getenv('DB_HOST')
DB_PORT = getenv('DB_PORT') 
DB_NAME = getenv('DB_NAME')


# Cadena de conexión a MySQL usando SQLAlchemy y pymysql
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4"

# Crear el motor de conexión
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Crear una fábrica de sesiones
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para las clases del modelo
Base = declarative_base()

# Dependencia para obtener la sesión de la base de datos
def get_db(): 
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
