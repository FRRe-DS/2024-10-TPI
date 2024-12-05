from fastapi import APIRouter, Query
from app.utils.jwt import create_qr_token, verify_qr_token

token = APIRouter()

@token.get("/qr")
def create_qr():
    data = {}
    token = create_qr_token(data)
    return {"qr_token": token}

@token.get("/qr/verify")
def verify_qr(token: str = Query(...)):
    verify_qr_token(token)
    return {"message": "Token válido"}
