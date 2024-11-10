from app.config.db import Base
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column


class UserModel(Base):
    __tablename__ = "Usuarios"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    apellido: Mapped[str] = mapped_column(String(255), nullable=False)
    contrasenia_hasheada: Mapped[str] = mapped_column(String(255), nullable=False)
    dni: Mapped[str] = mapped_column(String(8), nullable=False)
    correo: Mapped[str] = mapped_column(String(255), nullable=False)
    rol: Mapped[str] = mapped_column(String(255), nullable=True)

