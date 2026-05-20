from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date, timedelta
from typing import Optional
from ..database import get_db
from ..models import Sale

router = APIRouter(prefix="/api/sales", tags=["sales"])


@router.get("")
def get_sales(
    start: Optional[str] = Query(None),
    end: Optional[str] = Query(None),
    group_by: str = Query("day", regex="^(day|week|month)$"),
    db: Session = Depends(get_db),
):
    today = date.today()
    start_date = date.fromisoformat(start) if start else today - timedelta(days=30)
    end_date = date.fromisoformat(end) if end else today

    rows = (
        db.query(Sale.date, func.sum(Sale.total).label("revenue"), func.count(Sale.id).label("orders"))
        .filter(Sale.date >= start_date, Sale.date <= end_date)
        .group_by(Sale.date)
        .order_by(Sale.date)
        .all()
    )

    return [
        {"date": str(r.date), "revenue": round(r.revenue, 2), "orders": r.orders}
        for r in rows
    ]
