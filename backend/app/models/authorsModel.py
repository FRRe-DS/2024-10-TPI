from sqlalchemy import Column, Integer, String, DateTime, func
from app.models.base import Base

class AuthorModel(Base):
  __tablename__ = 'authors'

  dni = Column(Integer, primary_key=True, index=True)
  nombre = Column(String(255), nullable=False)
  apellido = Column(String(255), nullable=False)
  fec_nac = Column(DateTime)
  biografia = Column(String(255))
  nacionalidad = Column(String(255), nullable=False)
  premios = Column(String(255))
  telefono = Column(String(255))
  email = Column(String(255))
  obras_previas = Column(String(255))

  created_at = Column(DateTime, server_default=func.now(), nullable=False)
  updated_at = Column(DateTime, onupdate=func.now(), nullable=True)
  deleted_at = Column(DateTime, nullable=True)