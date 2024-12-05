from os import path

from app.config.db import SessionLocal
from app.models.authorsModel import AuthorModel
from app.models.contactsModel import ContactModel
from app.models.eventsModel import EventModel
from app.models.obrasModel import ObrasModel
from app.models.usersModel import UserModel
from app.models.imagenesModel import ImagenesModel
from app.models.votosModel import VotosModel  # Asegúrate de importar el modelo de votos
from app.seeds.seedServices import insert_usuarios, seed_table, seed_imagenes, seed_votos
from sqlalchemy.orm import Session

def seed_all():
    db: Session = SessionLocal()
    try:
        # Insertar usuarios
        json_path = path.join(path.dirname(__file__), "data", "users.json")
        seed_table(UserModel, json_path, db, date_fields=[])

        # Insertar autores
        json_path = path.join(path.dirname(__file__), "data", "authors.json")
        seed_table(AuthorModel, json_path, db, date_fields=["fec_nac"])

        # Insertar contactos
        json_path = path.join(path.dirname(__file__), "data", "contacts.json")
        seed_table(ContactModel, json_path, db, date_fields=[])

        # Insertar eventos
        json_path = path.join(path.dirname(__file__), "data", "eventos.json")
        seed_table(EventModel, json_path, db, date_fields=[])

        # Insertar obras
        json_path = path.join(path.dirname(__file__), "data", "obras.json")
        seed_table(ObrasModel, json_path, db, date_fields=[])

        # Insertar imágenes
        seed_imagenes(ImagenesModel, db)

        # Insertar votos
        seed_votos(VotosModel, db)

    except Exception as e:
        print(f"Error en seed_all: {e}")
    finally:
        db.close()