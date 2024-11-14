from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.contactsModel import ContactModel
from app.dtos.contactsDto import ContactCreate, ContactUpdate

class ContactController:

  def get_contacts(db: Session):
      return db.query(ContactModel).all()
  
  def get_contact_by_id(id: int, db: Session):
      contact = db.query(ContactModel).filter(ContactModel.id == id).one_or_none()
      if contact is None:
          raise HTTPException(status_code=404, detail="Contacto no encontrado")
      return contact
  
  def create_contact(contact: ContactCreate, db: Session):
      new_contact = ContactModel(**contact.model_dump())
      db.add(new_contact)
      db.commit()
      db.refresh(new_contact)
      return {"mensaje": "Contacto creado correctamente"}
  
  def update_contact(id: int, updatedContact: ContactUpdate, db: Session):
      contact = db.query(ContactModel).filter(ContactModel.id == id).one_or_none()
      if contact is None:
          raise HTTPException(status_code=404, detail="Contacto no encontrado")
      
      for key, value in updatedContact.model_dump(exclude_unset=True).items():
          setattr(contact, key, value)
      db.commit()
      db.refresh(contact)
      return {"mensaje": "Contacto actualizado correctamente"}
  
  def delete_contact(id: int, db: Session):   
      contact = db.query(ContactModel).filter(ContactModel.id == id).one_or_none()
      if contact is None:
          raise HTTPException(status_code=404, detail="Contacto no encontrado")
      db.delete(contact)
      db.commit()
      return {"mensaje": "Contacto eliminado correctamente"}
  
  def exists_contact_by_id(id: int, db: Session):
      contact = db.query(ContactModel).filter(ContactModel.id == id).one_or_none()
      return {"existe": contact is not None}
  
  def exists_contact_by_author(author: int, db: Session):
      contact = db.query(ContactModel).filter(ContactModel.autor == author).one_or_none()
      return {"existe": contact is not None}