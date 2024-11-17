from os import path
import json
import random
from datetime import datetime
from passlib.context import CryptContext
from sqlalchemy.orm import Session


def seed_table(model, json_file: str, db: Session, date_fields: list = []):
    if db.query(model).first() is None:
        # Cargar datos desde el archivo JSON principal
        try:
            with open(json_file, "r", encoding="utf-8") as file:
                data = json.load(file)
        except Exception as e:
            return

        # Si es la tabla Autores, cargar imágenes
        if model.__tablename__ == "Autores":
            try:
                imagenes_path = path.join(path.dirname(__file__), "data", "imagenes_autores.json")
                with open(imagenes_path, "r", encoding="utf-8") as file:
                    imagenes_lista = json.load(file)
                    
                # Procesar autores con imágenes
                records = []
                for index, autor in enumerate(data):
                    imagen = imagenes_lista[index % len(imagenes_lista)]
                    autor_data = {
                        "nombre": autor["nombre"],
                        "apellido": autor["apellido"],
                        "fec_nac": datetime.strptime(autor["fec_nac"], "%Y-%m-%d"),
                        "biografia": autor["biografia"],
                        "pais_origen": autor["pais_origen"],
                        "url": imagen["url"],
                        "public_id": imagen["public_id"]
                    }
                    records.append(model(**autor_data))
                    
            except Exception as e:
                return
        else:
            # Para otras tablas, procesar normalmente
            records = []
            for item in data:
                record_data = item.copy()
                for field in date_fields:
                    if field in record_data:
                        record_data[field] = datetime.strptime(record_data[field], "%Y-%m-%d")
                records.append(model(**record_data))

        try:
            db.add_all(records)
            db.commit()
        except Exception as e:
            db.rollback()
    else:
        print(f"La tabla {model.__tablename__} ya tiene datos")

# Set up passlib with bcrypt (or your preferred hashing scheme)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def insert_usuarios(model, db: Session):
    # User data to insert
    admin_data = {
        "nombre": "admin",
        "apellido": "admin",
        "contrasenia_hasheada": pwd_context.hash("admin"),
        "correo": "admin@admin.com",
        "rol": "admin",
    }
    votante_data = {
        "nombre": "prueba",
        "apellido": "prueba",
        "contrasenia_hasheada": pwd_context.hash("1234"),
        "correo": "prueba@hotmail.com",
        "rol": "votante",
    }

    existing_user = db.query(model).filter_by(correo=admin_data["correo"]).first()
    if existing_user:
        print("El admin ya existe, no se insertaron nuevos registros.")
        return
    
    existing_user = db.query(model).filter_by(correo=votante_data["correo"]).first()
    if existing_user:
        print("El votante ya existe, no se insertaron nuevos registros.")
        return
    # Create a new user record
    new_user = model(**admin_data)
    new_user2 = model(**votante_data)

    # Insert the user into the database
    db.add(new_user)
    db.add(new_user2)
    db.commit()
    print(
        f"Usuario {admin_data['nombre']} insertado en la tabla {model.__tablename__}."
    )
    print(
        f"Usuario {votante_data['nombre']} insertado en la tabla {model.__tablename__}."
    )

def seed_imagenes(model, db: Session):
    # Verificar si la tabla ya tiene datos
    if db.query(model).first() is None:
        # Cargar imágenes desde el archivo JSON
        json_path = path.join(path.dirname(__file__), "data", "imagenes_obras.json")
        with open(json_path, "r", encoding="utf-8") as file:
            data = json.load(file)
            imagenes_cloudinary = data["imagenes_cloudinary"]

        records = []
        # Para cada obra
        for obra_id in range(1, 351):
            # Número aleatorio de imágenes para esta obra (entre 5 y 10)
            num_imagenes = random.randint(5, 10)
            
            # Seleccionar imágenes aleatorias para esta obra
            imagenes_obra = random.choices(imagenes_cloudinary, k=num_imagenes)
            
            # Crear registros para cada imagen
            for imagen in imagenes_obra:
                record = model(
                    url=imagen["url"],
                    public_id=imagen["public_id"],
                    id_obra=obra_id,
                    etapa_obra=random.choice(['antes', 'durante', 'despues'])
                )
                records.append(record)

        # Insertar los registros en la base de datos
        db.add_all(records)
        db.commit()
        print(f"{len(records)} imágenes insertadas en la tabla {model.__tablename__}.")
    else:
        print(f"La tabla {model.__tablename__} ya tiene datos, no se agregaron nuevas imágenes.")