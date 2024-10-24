import os
from sqlalchemy.orm import Session
from app.seeds.seedTable import seed_table
from app.models.authorsModel import AuthorModel

def seed_authors(db: Session):
    json_path = os.path.join(os.path.dirname(__file__), "data", "authors.json")
    seed_table(AuthorModel, json_path, db, date_fields=["fec_nac"])
