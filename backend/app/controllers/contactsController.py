from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.contactsModel import ContactModel
from app.dtos.contactsDto import ContactCreate, ContactUpdate

class ContactController:

  def get_contacts(db: Session):
      return db.query(ContactModel).filter(ContactModel.deleted_at == None).all()
  
  def get_contact_by_id(id: int, db: Session):
      contact = db.query(ContactModel).filter(ContactModel.id == id).one_or_none()
      if contact is None:
          raise HTTPException(status_code=404, detail="Contacto no encontrado")
      elif contact.deleted_at is not None:
          raise HTTPException(status_code=404, detail="Contacto eliminado de forma lógica")
      return contact
  
  def create_contact(contact: ContactCreate, db: Session):
      new_contact = ContactModel(**contact.model_dump())
      db.add(new_contact)
      db.commit()
      db.refresh(new_contact)
      return {'ok': True, 'mensaje': 'Creación del Contacto correcta'}
  
  def update_contact(id: int, updatedContact: ContactUpdate, db: Session):
      contact = db.query(ContactModel).filter(ContactModel.id == id).one_or_none()
      if contact is None:
          raise HTTPException(status_code=404, detail="Contacto no encontrado")
      elif contact.deleted_at is not None:
          raise HTTPException(status_code=404, detail="Contacto eliminado de forma lógica")
      
      for key, value in updatedContact.model_dump(exclude_unset=True).items():
          setattr(contact, key, value)
      db.commit()
      db.refresh(contact)
      return {'ok': True, 'mensaje': 'Actualización del Contacto correcta'}
  
  def delete_contact(id: int, db: Session):   
      contact = db.query(ContactModel).filter(ContactModel.id == id).one_or_none()
      if contact is None:
          raise HTTPException(status_code=404, detail="Contacto no encontrado")
      elif contact.deleted_at is not None:
          raise HTTPException(status_code=404, detail="Contacto eliminado de forma lógica")
      
      contact.deleted_at = datetime.now()
      db.commit()
      return {'ok': True, 'mensaje': 'Borrado lógico del Contacto correcto'}
