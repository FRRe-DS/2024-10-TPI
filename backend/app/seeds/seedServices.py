import json
from datetime import datetime

from passlib.context import CryptContext
from sqlalchemy.orm import Session


def seed_table(model, json_file: str, db: Session, date_fields: list = []):
    # Verificar si la tabla ya tiene datos
    if db.query(model).first() is None:
        # Cargar datos desde el archivo JSON
        with open(json_file, "r", encoding="utf-8") as file:
            data = json.load(file)

        # Obtener los campos del modelo
        model_fields = model.__table__.columns.keys()

        records = []
        for item in data:
            record_data = {}

            # Iterar sobre los campos del modelo y asignar valores desde el JSON
            for field in model_fields:
                if field in item:
                    # Convertir campos de fecha si es necesario
                    if field in date_fields:
                        record_data[field] = datetime.strptime(item[field], "%Y-%m-%d")
                    else:
                        record_data[field] = item[field]

            # Crear una instancia del modelo, usando solo los campos válidos
            record = model(**record_data)
            records.append(record)

        # Insertar los registros en la base de datos
        db.add_all(records)
        db.commit()
        print(f"{len(records)} registros insertados en la tabla {model.__tablename__}.")
    else:
        print(
            f"La tabla {model.__tablename__} ya tiene datos, no se agregaron nuevos registros."
        )


# Set up passlib with bcrypt (or your preferred hashing scheme)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def insert_admin(model, db: Session):
    # User data to insert
    admin_data = {
        "nombre": "admin",
        "apellido": "admin",
        "contrasenia_hasheada": pwd_context.hash("admin"),
        "dni": "11111111",
        "correo": "admin@admin.com",
        "rol": "admin",
    }

    existing_user = db.query(model).filter_by(correo=admin_data["correo"]).first()
    if existing_user:
        print("El admin ya existe, no se insertaron nuevos registros.")
        return

    # Create a new user record
    new_user = model(**admin_data)

    # Insert the user into the database
    db.add(new_user)
    db.commit()
    print(
        f"Usuario {admin_data['nombre']} insertado en la tabla {model.__tablename__}."
    )
