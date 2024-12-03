from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.db import get_db
from app.controllers.eventsController import EventController
from app.dtos.eventsDto import EventCreate, EventUpdate

events = APIRouter()

@events.get("/eventos", tags=["eventos"])
def get_events(db: Session = Depends(get_db)):
    return EventController.get_events(db)


@events.get("/eventos/{edicion}", tags=["eventos"])
def get_event_by_edicion(edicion: int, db: Session = Depends(get_db)):
    return EventController.get_event_by_edicion(edicion, db)


@events.post("/eventos", tags=["eventos"])
def create_event(events: EventCreate, db: Session = Depends(get_db)):
    return EventController.create_event(events, db)


@events.patch("/eventos/{edicion}", tags=["eventos"])
def update_event(edicion: int, updatedEvent: EventUpdate, db: Session = Depends(get_db)):
    return EventController.update_event(edicion, updatedEvent, db)


@events.delete("/eventos/{edicion}", tags=["eventos"])
def delete_event(edicion: int, db: Session = Depends(get_db)):
    return EventController.delete_event(edicion, db)

