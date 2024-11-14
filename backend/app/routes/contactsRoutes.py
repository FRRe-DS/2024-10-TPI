from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.contactsController import ContactController
from app.dtos.contactsDto import ContactCreate, ContactUpdate
from app.config.db import get_db

contact = APIRouter()

@contact.get("/contactos",tags = ["contactos"])
def get_contacts(db: Session = Depends(get_db)):
    return ContactController.get_contacts(db)

@contact.get("/contactos/{id}",tags = ["contactos"])
def get_contact_by_id(id: int, db: Session = Depends(get_db)):
    return ContactController.get_contact_by_id(id, db)

@contact.post("/contactos",tags = ["contactos"])
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    return ContactController.create_contact(contact, db)

@contact.patch("/contactos/{id}",tags = ["contactos"])
def update_contact(id: int, updatedContact: ContactUpdate, db: Session = Depends(get_db)):
    return ContactController.update_contact(id, updatedContact, db)

@contact.delete("/contactos/{id}",tags = ["contactos"])
def delete_contact(id: int, db: Session = Depends(get_db)):
    return ContactController.delete_contact(id, db)

@contact.head("/contactos/{id}",tags = ["contactos"])
def exists_contact_by_id(id: int, db: Session = Depends(get_db)):
    return ContactController.exists_contact_by_id(id, db)

@contact.head("/contactos/autor/{author}",tags = ["contactos"])
def exists_contact_by_author(author: int, db: Session = Depends(get_db)):
    return ContactController.exists_contact_by_author(author, db)