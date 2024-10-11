from sqlalchemy import Column, Integer, String, DateTime, func
from app.models.base import Base

class EventModel(Base):
  __tablename__ = 'events'  

  # id = Column(Integer, primary_key=True, index=True)
  nombre = Column(String(255), primary_key=True, index=True)
  edicion = Column(Integer, primary_key=True, index=True)
  fecha_inicio = Column(DateTime, nullable=False)
  fecha_fin = Column(DateTime, nullable=False)
  lugar = Column(String(255), nullable=False)
  descripcion = Column(String(255), nullable=False)
  tematica = Column(String(255), nullable=False)

  created_at = Column(DateTime, server_default=func.now(), nullable=False)
  updated_at = Column(DateTime, onupdate=func.now(), nullable=True)
  deleted_at = Column(DateTime, nullable=True)