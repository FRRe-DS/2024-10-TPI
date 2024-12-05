from fastapi import APIRouter, Depends
from fastapi_pagination import Page, Params
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy.orm import Session
from app.config.db import get_db
from app.controllers.eventsController import EventController
from app.dtos.eventsDto import EventOut, EventCreate, EventUpdate

events = APIRouter()

@events.get(
        path="/eventos",
        response_model=Page[EventOut],
        tags=["eventos"]
)
def get_events(db: Session = Depends(get_db), params: Params = Depends()):
    return EventController.get_events(db, params)


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

