from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import date, timedelta
from ..models import Sale, Product, Category, Region


def get_business_snapshot(db: Session) -> dict:
    today = date.today()
    week_start = today - timedelta(days=7)
    month_start = today.replace(day=1)

    weekly_sales = db.query(func.sum(Sale.total)).filter(
        Sale.date >= week_start
    ).scalar() or 0

    monthly_sales = db.query(func.sum(Sale.total)).filter(
        Sale.date >= month_start
    ).scalar() or 0

    total_sales_all = db.query(func.sum(Sale.total)).scalar() or 0

    top_products = (
        db.query(Product.name, func.sum(Sale.total).label("revenue"))
        .join(Sale, Sale.product_id == Product.id)
        .filter(Sale.date >= week_start)
        .group_by(Product.id)
        .order_by(desc("revenue"))
        .limit(3)
        .all()
    )

    top_regions = (
        db.query(Region.name, func.sum(Sale.total).label("revenue"))
        .join(Sale, Sale.region_id == Region.id)
        .filter(Sale.date >= week_start)
        .group_by(Region.id)
        .order_by(desc("revenue"))
        .limit(3)
        .all()
    )

    low_stock = (
        db.query(Product.name, Product.stock)
        .filter(Product.stock < 20)
        .order_by(Product.stock)
        .limit(5)
        .all()
    )

    category_breakdown = (
        db.query(Category.name, func.sum(Sale.total).label("revenue"))
        .join(Product, Product.category_id == Category.id)
        .join(Sale, Sale.product_id == Product.id)
        .filter(Sale.date >= month_start)
        .group_by(Category.id)
        .order_by(desc("revenue"))
        .all()
    )

    return {
        "weekly_sales": round(weekly_sales, 2),
        "monthly_sales": round(monthly_sales, 2),
        "total_sales_all_time": round(total_sales_all, 2),
        "top_products_week": [{"name": p.name, "revenue": round(p.revenue, 2)} for p in top_products],
        "top_regions_week": [{"name": r.name, "revenue": round(r.revenue, 2)} for r in top_regions],
        "low_stock_alerts": [{"name": p.name, "stock": p.stock} for p in low_stock],
        "category_breakdown_month": [{"name": c.name, "revenue": round(c.revenue, 2)} for c in category_breakdown],
    }
