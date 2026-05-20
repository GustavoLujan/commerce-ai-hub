from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from ..database import get_db
from ..services.analytics_service import get_business_snapshot
from ..services.llm_service import chat

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage] = []


@router.post("")
def send_message(request: ChatRequest, db: Session = Depends(get_db)):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    snapshot = get_business_snapshot(db)

    messages = [{"role": m.role, "content": m.content} for m in request.history]
    messages.append({"role": "user", "content": request.message})

    reply = chat(messages, snapshot)
    return {"reply": reply}
