from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()   

class EventModel(Base):
  __tablename__ = 'events'  

  id = Column(Integer, primary_key=True, index=True)
  nombre = Column(String(255), nullable=False)
  fecha = Column(DateTime, nullable=False)
  lugar = Column(String(255), nullable=False)
  nroEdicion = Column(Integer, nullable=False)
  descripcion = Column(String(255), nullable=False)
  tematica = Column(String(255), nullable=False)

  created_at = Column(DateTime, server_default=func.now(), nullable=False)
  updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)
  deleted_at = Column(DateTime, nullable=True)