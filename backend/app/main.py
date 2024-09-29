from fastapi import FastAPI
from app.config.db import Base, engine
from app.routes.eventsRoutes import event
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

# configurar CORS
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
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

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# Agrego las rutas de los eventos
app.include_router(event)   
