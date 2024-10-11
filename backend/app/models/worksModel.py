from sqlalchemy import Column, Integer, String, DateTime, Time, func, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base
from app.models.authorsModel import AuthorModel
from app.models.eventsModel import EventModel

class WorkModel(Base):
    __tablename__ = 'works'

    nombre = Column(String(255), primary_key=True, index=True)
    dni_autor = Column(Integer, ForeignKey('authors.dni'), nullable=False)
    autor = relationship(AuthorModel, back_populates='author_works')
    id_evento = Column(Integer, ForeignKey('events.id'), nullable=False)
    evento = relationship(EventModel, back_populates='event_works')
    duracion = Column(Time)
    material = Column(String(255), nullable=False)
    tecnica = Column(String(255), nullable=False)
    descripcion = Column(String(255), nullable=False)
    fec_inicio = Column(DateTime, nullable=False)
    fec_fin = Column(DateTime, nullable=False)

    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, onupdate=func.now(), nullable=True)
    deleted_at = Column(DateTime, nullable=True)
