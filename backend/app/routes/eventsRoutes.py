from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.eventsController import EventController
from app.schemas.eventsSchema import Event
from app.config.db import get_db

event = APIRouter()

@event.get("/eventos")
async def get_events(db: Session = Depends(get_db)):
    return EventController.get_events(db)

@event.get("/evento/{id}")
def get_event_by_id(id: int, db: Session = Depends(get_db)):
    return EventController.get_event_by_id(id, db)

@event.post("/evento")
def create_event(event: Event, db: Session = Depends(get_db)):
    return EventController.create_event(event, db)

@event.put("/evento/{id}")
def update_event(id: int, updatedEvent: Event, db: Session = Depends(get_db)):
    return EventController.update_event(id, updatedEvent, db)

@event.delete("/evento/{id}")
def delete_event(id: int, db: Session = Depends(get_db)):
    return EventController.delete_event(id, db) 