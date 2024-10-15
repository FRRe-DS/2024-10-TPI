from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.authorsModel import Autor
from app.config.db import Base

class Contacto(Base):
    __tablename__ = "Contactos"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    autor: Mapped[int] = mapped_column(ForeignKey("Autores.id_autor", ondelete="CASCADE"), nullable=False)
    tipo: Mapped[str] = mapped_column(String(255), nullable=False)
    contenido: Mapped[str] = mapped_column(String(255), nullable=False)

    autor_relacion: Mapped["Autor"] = relationship("Autor", back_populates="contactos")