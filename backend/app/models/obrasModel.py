from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.config.db import Base


class ObrasModel(Base):
    __tablename__ = "Obras"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    autor_id: Mapped[int] = mapped_column(ForeignKey("Autores.id"), nullable=False)
    id_evento: Mapped[int] = mapped_column(ForeignKey("Eventos.id"), nullable=False)
    nombre_obra: Mapped[str] = mapped_column(String(255), nullable=False)
    descripcion: Mapped[str] = mapped_column(Text, nullable=False)
    tecnica: Mapped[str] = mapped_column(String(50), nullable=False)

    created_at: Mapped[DateTime] = mapped_column(
        DateTime, server_default=func.now(), nullable=False
    )
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime, onupdate=func.now(), nullable=True
    )
    deleted_at: Mapped[DateTime] = mapped_column(DateTime, nullable=True)
