from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from app.config.db import Base

class Usuario(Base):
    __tablename__ = "Usuarios"

    id_usuario: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    apellido: Mapped[str] = mapped_column(String(255), nullable=False)
    contrasenia: Mapped[str] = mapped_column(String(255), nullable=False)
    dni: Mapped[str] = mapped_column(String(8), nullable=False)
    correo: Mapped[str] = mapped_column(String(255), nullable=False)