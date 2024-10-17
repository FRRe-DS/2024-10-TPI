from fastapi import FastAPI
from app.config.db import Base, engine
from app.config.migrations import apply_migrations
# from app.routes.eventsRoutes import event
from app.routes.usersRoutes import user
from app.routes.authorsRoutes import author
from app.routes.contactsRoutes import contact
from app.routes.authRoutes import auth
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

# configurar CORS
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://127.0.0.1:8000/login",
]

# crear el ciclo de vida de la app
@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Aplicar las migraciones
apply_migrations()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# Agrego las rutas de las tablas
# app.include_router(event)
app.include_router(user)
app.include_router(author)
app.include_router(contact)
app.include_router(auth)