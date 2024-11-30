from sqlalchemy import DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.config.db import Base

class ImagenesModel(Base):
    __tablename__ = "Imagenes_obra"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    id_obra: Mapped[int] = mapped_column(Integer, ForeignKey("Obras.id", ondelete="CASCADE"), nullable=False)
    url: Mapped[str] = mapped_column(String(255), nullable=False)  # URL que apunta a la imagen en cloudinary
    etapa_obra: Mapped[str] = mapped_column(String(255), nullable=False)  # Este campo faltaba en tu modelo
    public_id: Mapped[str] = mapped_column(String(255), nullable=False)  # identificador unico para cloudinary
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now(), nullable=False)
    updated_at: Mapped[DateTime] = mapped_column(DateTime, onupdate=func.now(), nullable=True)
    deleted_at: Mapped[DateTime] = mapped_column(DateTime, nullable=True)
    obra: Mapped["ObrasModel"] = relationship("ObrasModel", back_populates="imagenes") #type: ignore
