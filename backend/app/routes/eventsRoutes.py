from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.eventsController import EventController
from app.schemas.eventsSchema import EventCreate, EventUpdate
from app.config.db import get_db

event = APIRouter()

@event.get("/eventos")
def get_events(db: Session = Depends(get_db)):
    return EventController.get_events(db)

@event.get("/eventos/{nombre}/{edicion}")
def get_event_by_nombre_and_edicion(nombre: str, edicion: int, db: Session = Depends(get_db)):
    return EventController.get_event_by_nombre_and_edicion(nombre, edicion, db)

@event.post("/eventos")
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    return EventController.create_event(event, db)

@event.patch("/eventos/{nombre}/{edicion}")
def update_event(nombre: str, edicion: int, updatedEvent: EventUpdate, db: Session = Depends(get_db)):
    return EventController.update_event(nombre, edicion, updatedEvent, db)

@event.delete("/eventos/{nombre}/{edicion}")
def delete_event(nombre: str, edicion: int, db: Session = Depends(get_db)):
    return EventController.delete_event(nombre, edicion, db)