from sqlalchemy.orm import Session
from app.config.db import get_db
from fastapi import Depends, HTTPException
from app.models.eventsModel import EventModel
from app.schemas.eventsSchema import Event

class EventController:

  def get_events(db: Session):
      return db.query(EventModel).all()

  def get_event_by_id(id: int, db: Session):
      event = db.query(EventModel).filter(EventModel.c.id == id).first()
      if not event:
          raise HTTPException(status_code=404, detail="Evento no encontrado")
      return event

  def create_event(event: Event, db: Session):
      new_event = EventModel(**event.dict())
      db.add(new_event)
      db.commit()
      db.refresh(new_event)
      return {"mensaje": "Evento creado correctamente"}

  def update_event(id: int, updatedEvent: Event, db: Session):
      event = db.query(EventModel).filter(EventModel.c.id == id).first()
      if not event:
          raise HTTPException(status_code=404, detail="Evento no encontrado")
      for key, value in updatedEvent.dict().items():
          setattr(event, key, value)
      db.commit()
      db.refresh(event)
      return {"mensaje": "Evento actualizado correctamente"}

  def delete_event(id: int, db: Session):   
      event = db.query(EventModel).filter(EventModel.c.id == id).first()
      if not event:
          raise HTTPException(status_code=404, detail="Evento no encontrado")
      db.delete(event)
      db.commit()
      return {"mensaje": "Evento eliminado correctamente"}