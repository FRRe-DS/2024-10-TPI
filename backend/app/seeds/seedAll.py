from os import path

from app.config.db import SessionLocal
from app.models.authorsModel import AuthorModel
from app.models.contactsModel import ContactModel
from app.models.eventsModel import EventModel
from app.models.obrasModel import ObrasModel
from app.models.usersModel import UserModel
from app.seeds.seedServices import insert_admin, seed_table
from sqlalchemy.orm import Session


def seed_all():
    db: Session = SessionLocal()
    try:

        json_path = path.join(path.dirname(__file__), "data", "users.json")
        seed_table(UserModel, json_path, db, date_fields=[])

        json_path = path.join(path.dirname(__file__), "data", "authors.json")
        seed_table(AuthorModel, json_path, db, date_fields=["fec_nac"])

        json_path = path.join(path.dirname(__file__), "data", "contacts.json")
        seed_table(ContactModel, json_path, db, date_fields=[])

        json_path = path.join(path.dirname(__file__), "data", "eventos.json")
        seed_table(EventModel, json_path, db, date_fields=[])

        json_path = path.join(path.dirname(__file__), "data", "obras.json")
        seed_table(ObrasModel, json_path, db, date_fields=[])

        insert_admin(UserModel, db)

    except Exception as e:
        print(e)
    finally:
        db.close()
