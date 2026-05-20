from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from ..database import get_db
from ..models import Product, Category

router = APIRouter(prefix="/api/inventory", tags=["inventory"])


@router.get("")
def get_inventory(
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Product).join(Category)

    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
    if category:
        query = query.filter(Category.name == category)

    products = query.order_by(Product.stock).all()

    return [
        {
            "id": p.id,
            "name": p.name,
            "sku": p.sku,
            "price": p.price,
            "stock": p.stock,
            "category": p.category.name,
            "status": "critical" if p.stock < 10 else "low" if p.stock < 30 else "ok",
        }
        for p in products
    ]
