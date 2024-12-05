from app.utils.jwt import create_qr_token, is_qr_token_expired
from fastapi import APIRouter, Query

token = APIRouter()


@token.get("/qr")
def create_qr():
    data = {}
    token = create_qr_token(data)
    return {"qr_token": token}


@token.get("/qr/verify")
def verify_qr(token: str = Query(...)):
    expired = is_qr_token_expired(token)
    return {"expirado": expired}
