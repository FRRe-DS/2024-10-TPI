from datetime import datetime
from sqlalchemy.orm import Session
from app.config.db import get_db
from fastapi import Depends, HTTPException
from app.models.eventsModel import EventModel
from app.schemas.eventsSchema import EventCreate, EventUpdate

class EventController:

  def get_events(db: Session):
      return db.query(EventModel).all()

  def get_event_by_id(id: int, db: Session):
      event = db.query(EventModel).filter(EventModel.id == id).one_or_none()
      if event is None:
          raise HTTPException(status_code=404, detail="Evento no encontrado")
      return event

  def create_event(event: EventCreate, db: Session):
      new_event = EventModel(**event.model_dump())
      db.add(new_event)
      db.commit()
      db.refresh(new_event)
      return {"mensaje": "Evento creado correctamente"}

  def update_event(id: int, updatedEvent: EventUpdate, db: Session):
      event = db.query(EventModel).filter(EventModel.id == id).one_or_none()
      if event is None:
          raise HTTPException(status_code=404, detail="Evento no encontrado")
      
      for key, value in updatedEvent.model_dump(exclude_unset=True).items():
          setattr(event, key, value)
      db.commit()
      db.refresh(event)
      return {"mensaje": "Evento actualizado correctamente"}

  def delete_event(id: int, db: Session):   
      event = db.query(EventModel).filter(EventModel.id == id).one_or_none()
      if event is None:
          raise HTTPException(status_code=404, detail="Evento no encontrado")
      # db.delete(event)
      # Actualizacion del campo deleted_at para la eliminacion logica
      event.deleted_at = datetime.now()
      db.commit()
      return {"mensaje": "Evento eliminado correctamente"}