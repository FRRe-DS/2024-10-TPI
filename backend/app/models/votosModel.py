from app.config.db import Base
from sqlalchemy import DateTime, ForeignKey, Integer, func
from sqlalchemy.orm import Mapped, mapped_column


class VotosModel(Base):
    __tablename__ = "Votos"

    usuario_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("Usuarios.id"), primary_key=True, nullable=False
    )
    obra_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("Obras.id"), primary_key=True, nullable=False
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime, server_default=func.now(), nullable=False
    )
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime, onupdate=func.now(), nullable=True
    )
    deleted_at: Mapped[DateTime] = mapped_column(DateTime, nullable=True)
