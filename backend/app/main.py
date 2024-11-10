from contextlib import asynccontextmanager

from app.config.migrations import apply_migrations
from app.routes.authorsRoutes import author
from app.routes.authRoutes import auth
from app.routes.contactsRoutes import contact
from app.routes.eventsRoutes import events
from app.routes.obrasRoutes import obras

# from app.routes.eventsRoutes import event
from app.routes.usersRoutes import user
from app.routes.votosRoutes import votos
from app.seeds.seedAll import seed_all  # Importa la función de poblar datos
from app.utils.tags import tags
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination

# configurar CORS
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://127.0.0.1:8000/login",
]


# Crear el ciclo de vida de la app
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Inicializaciones
    # Base.metadata.create_all(bind=engine)

    # Aplicar las migraciones
    apply_migrations()

    # Llamar al seed de autores (u otros) aquí si es necesario
    seed_all()

    yield
    # Limpiezas y cierres


# Crear la instancia de FastAPI
app = FastAPI(
    lifespan=lifespan,
    title="DESARROLLO DE SOFTWARE G-10",
    description="TPI Bienal Chaco",
    openapi_tags=tags,
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Rutas de la aplicación
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


# Incluir las rutas de las tablas
# app.include_router(event)
app.include_router(user)
app.include_router(author)
app.include_router(contact)
app.include_router(auth)
app.include_router(obras)
app.include_router(events)
app.include_router(votos)

# Agrega la configuración de paginación
add_pagination(app)
