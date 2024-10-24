import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from datetime import date

from app.config.db import Base, SessionLocal, engine
from app.models.authorsModel import AuthorModel
from sqlalchemy.orm import Session

# Create the database tables
Base.metadata.create_all(engine)

# Create a session
session: Session = SessionLocal()


def seed_data():
    # Seed data to be inserted
    # authors = [
    # ]
    # for element in json:
    #     authors.append(
    #         AuthorModel(
    #             nombre: element.nombre,
    #             apellido: ...
    #         }
    #     )
    # Add all seed data to the session
    authors = []
    session.add_all(authors)
    session.commit()

    print("Database seeded!")


if __name__ == "__main__":
    # Call the seed function
    seed_data()

    # Close the session
    session.close()
