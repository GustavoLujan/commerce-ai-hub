from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date, timedelta
from typing import Optional
from ..database import get_db
from ..models import Sale, Product, Category, Region

router = APIRouter(prefix="/api", tags=["analytics"])


@router.get("/categories")
def get_categories(
    start: Optional[str] = Query(None),
    end: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    today = date.today()
    start_date = date.fromisoformat(start) if start else today - timedelta(days=30)
    end_date = date.fromisoformat(end) if end else today

    rows = (
        db.query(Category.name, func.sum(Sale.total).label("revenue"))
        .join(Product, Product.category_id == Category.id)
        .join(Sale, Sale.product_id == Product.id)
        .filter(Sale.date >= start_date, Sale.date <= end_date)
        .group_by(Category.id)
        .order_by(func.sum(Sale.total).desc())
        .all()
    )

    return [{"name": r.name, "revenue": round(r.revenue, 2)} for r in rows]


@router.get("/regions")
def get_regions(
    start: Optional[str] = Query(None),
    end: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    today = date.today()
    start_date = date.fromisoformat(start) if start else today - timedelta(days=30)
    end_date = date.fromisoformat(end) if end else today

    rows = (
        db.query(Region.name, func.sum(Sale.total).label("revenue"), func.count(Sale.id).label("orders"))
        .join(Sale, Sale.region_id == Region.id)
        .filter(Sale.date >= start_date, Sale.date <= end_date)
        .group_by(Region.id)
        .order_by(func.sum(Sale.total).desc())
        .all()
    )

    return [{"name": r.name, "revenue": round(r.revenue, 2), "orders": r.orders} for r in rows]


@router.get("/category-list")
def get_category_list(db: Session = Depends(get_db)):
    cats = db.query(Category.name).order_by(Category.name).all()
    return [c.name for c in cats]
