from app.config.db import Base
from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List

class ObrasModel(Base):
    __tablename__ = "Obras"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    autor_id: Mapped[int] = mapped_column(ForeignKey("Autores.id", ondelete="CASCADE"), nullable=False)
    id_edicion: Mapped[int] = mapped_column(ForeignKey("Eventos.edicion"), nullable=False)
    nombre_obra: Mapped[str] = mapped_column(String(255), nullable=False)
    descripcion: Mapped[str] = mapped_column(Text, nullable=False)
    tecnica: Mapped[str] = mapped_column(String(50), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now(), nullable=False)
    updated_at: Mapped[DateTime] = mapped_column(DateTime, onupdate=func.now(), nullable=True)
    deleted_at: Mapped[DateTime] = mapped_column(DateTime, nullable=True)
    autor: Mapped["AuthorModel"] = relationship("AuthorModel", back_populates="obras") # type: ignore
    imagenes: Mapped[List["ImagenesModel"]] = relationship("ImagenesModel", back_populates="obra", cascade="all, delete-orphan") # type: ignore
    class Config:
        from_attributes = True

