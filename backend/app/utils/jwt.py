from datetime import datetime, timedelta
from fastapi import HTTPException
from jose import JWTError, jwt
from typing import Optional
from dotenv import load_dotenv
from os import getenv

load_dotenv()
SECRET_KEY=getenv("SECRET_KEY")
SECRET_KEY_QR=getenv("SECRET_KEY_QR")
ALGORITHM=getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES=getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encode_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def create_qr_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = int((datetime.now()).timestamp())
    else:
        expire = int((datetime.now() + timedelta(minutes=3)).timestamp())
    to_encode.update({"exp": expire})
    encode_jwt = jwt.encode(to_encode, SECRET_KEY_QR, algorithm=ALGORITHM)
    return encode_jwt

def verify_qr_token(token: str):
  try:
      decoded_token = jwt.decode(token, SECRET_KEY_QR, algorithms=[ALGORITHM], options={"verify_exp": True})
      return decoded_token
  except jwt.ExpiredSignatureError:
      raise HTTPException(status_code=401, detail="Token expirado")
  except JWTError:
      raise HTTPException(status_code=401, detail="Token inválido")