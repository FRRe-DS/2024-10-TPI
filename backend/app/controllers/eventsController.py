from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination import Params
from app.models.eventsModel import EventModel
from app.dtos.eventsDto import EventCreate, EventUpdate

class EventController:

  def get_events(db: Session, params: Params):
      eventos = db.query(EventModel).filter(EventModel.deleted_at == None)
      return paginate(eventos, params)

  def get_event_by_edicion(edicion: int, db: Session):
      event = db.query(EventModel).filter(EventModel.edicion == edicion).one_or_none()
      if event is None:
          raise HTTPException(status_code=404, detail="Evento no encontrado")
      elif event.deleted_at is not None:
          raise HTTPException(status_code=404, detail="Evento eliminado de forma lógica")
      return event

  def create_event(event: EventCreate, db: Session):
      new_event = EventModel(**event.model_dump())
      db.add(new_event)
      db.commit()
      db.refresh(new_event)
      return {'ok': True, 'mensaje': 'Creación del Contacto correcta'}

  def update_event(edicion: int, updatedEvent: EventUpdate, db: Session):
      event = db.query(EventModel).filter(EventModel.edicion == edicion).one_or_none()
      if event is None:
          raise HTTPException(status_code=404, detail="Evento no encontrado")
      elif event.deleted_at is not None:
          raise HTTPException(status_code=404, detail="Evento eliminado de forma lógica")
      
      for key, value in updatedEvent.model_dump(exclude_unset=True).items():
          setattr(event, key, value)
      db.commit()
      db.refresh(event)
      return {'ok': True, 'mensaje': 'Actualización del Contacto correcta'}

  def delete_event(edicion: int, db: Session):   
      event = db.query(EventModel).filter(EventModel.edicion == edicion).one_or_none()
      if event is None:
          raise HTTPException(status_code=404, detail="Evento no encontrado")
      elif event.deleted_at is not None:
          raise HTTPException(status_code=404, detail="Evento eliminado de forma lógica")
      
      event.deleted_at = datetime.now()
      db.commit()
      return {'ok': True, 'mensaje': 'Borrado lógico del Contacto correcto'}