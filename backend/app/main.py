from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from .database import engine
from . import models
from .routers import kpis, sales, inventory, categories, chat

load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Commerce AI Hub API", version="1.0.0")

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(kpis.router)
app.include_router(sales.router)
app.include_router(inventory.router)
app.include_router(categories.router)
app.include_router(chat.router)


@app.get("/")
def root():
    return {"message": "Commerce AI Hub API", "docs": "/docs"}
