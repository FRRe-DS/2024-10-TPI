from fastapi import FastAPI
from app.config.db import Base, engine
from app.routes.eventsRoutes import event
from contextlib import asynccontextmanager  

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# Agrego las rutas de los eventos
app.include_router(event)   
