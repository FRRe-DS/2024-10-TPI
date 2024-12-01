from typing import List

from app.config.db import Base
from sqlalchemy import Date, Integer, String, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship


class AuthorModel(Base):
    __tablename__ = "Autores"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    apellido: Mapped[str] = mapped_column(String(255), nullable=False)
    fec_nac: Mapped[Date] = mapped_column(Date, nullable=False)
    pais_origen: Mapped[str] = mapped_column(String(255), nullable=False)
    biografia: Mapped[str] = mapped_column(Text, nullable=False)
    url: Mapped[str] = mapped_column(String(255), nullable=False)
    public_id: Mapped[str] = mapped_column(String(255), nullable=False)
    deleted_at: Mapped[DateTime] = mapped_column(DateTime, nullable=True)
    contactos: Mapped[List["ContactModel"]] = relationship("ContactModel", back_populates="autor_relacion", cascade="all, delete-orphan")  # type: ignore
    obras: Mapped[List["ObrasModel"]] = relationship("ObrasModel", back_populates="autor", cascade="all, delete-orphan")  # type: ignore
