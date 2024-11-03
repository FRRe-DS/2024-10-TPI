from sqlalchemy import DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.config.db import Base


class EventModel(Base):
    __tablename__ = "Eventos"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True, autoincrement=True
    )
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    edicion: Mapped[int] = mapped_column(Integer, nullable=False)
    fecha_inicio: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    fecha_fin: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    lugar: Mapped[str] = mapped_column(String(255), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(255), nullable=False)
    tematica: Mapped[str] = mapped_column(String(255), nullable=False)

    created_at: Mapped[DateTime] = mapped_column(
        DateTime, server_default=func.now(), nullable=False
    )
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime, onupdate=func.now(), nullable=True
    )
    deleted_at: Mapped[DateTime] = mapped_column(DateTime, nullable=True)

