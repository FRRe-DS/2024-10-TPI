from sqlalchemy import Integer, String, Date, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from app.models.contactsModel import Contacto
from app.config.db import Base

class AuthorModel(Base):
    __tablename__ = "Autores"

    id_autor: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    dni: Mapped[str] = mapped_column(String(8), nullable=False)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    apellido: Mapped[str] = mapped_column(String(255), nullable=False)
    fec_nac: Mapped[str] = mapped_column(Date, nullable=False)
    biografia: Mapped[str] = mapped_column(Text, nullable=False)
    pais_origen: Mapped[str] = mapped_column(String(255), nullable=False)

    contactos: Mapped[List["Contacto"]] = relationship("Contacto", back_populates="autor_relacion")