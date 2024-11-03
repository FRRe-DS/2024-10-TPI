from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.db import get_db
from app.controllers.eventsController import EventController
from app.schemas.eventsSchema import EventCreate, EventUpdate

events = APIRouter()


@events.get("/eventos", tags=["eventos"])
def get_events(db: Session = Depends(get_db)):
    return EventController.get_events(db)


@events.get("/eventos/{id}", tags=["eventos"])
def get_event_by_id(id: int, db: Session = Depends(get_db)):
    return EventController.get_event_by_id(id, db)


@events.post("/eventos", tags=["eventos"])
def create_event(events: EventCreate, db: Session = Depends(get_db)):
    return EventController.create_event(events, db)


@events.patch("/eventos/{id}", tags=["eventos"])
def update_event(id: int, updatedEvent: EventUpdate, db: Session = Depends(get_db)):
    return EventController.update_event(id, updatedEvent, db)


@events.delete("/eventos/{id}", tags=["eventos"])
def delete_event(id: int, db: Session = Depends(get_db)):
    return EventController.delete_event(id, db)

