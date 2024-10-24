import os
import sys
import json
from datetime import datetime
from sqlalchemy.orm import Session
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

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
        print(f"La tabla {model.__tablename__} ya tiene datos, no se agregaron nuevos registros.")
