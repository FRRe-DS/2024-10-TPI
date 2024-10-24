from sqlalchemy.orm import Session
from app.config.db import SessionLocal
from app.seeds.seedAuthors import seed_authors

def seed_all():
    db: Session = SessionLocal()
    
    try:
        seed_authors(db)
    finally:
        db.close()
