from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import date, timedelta
from ..database import get_db
from ..models import Sale, Product

router = APIRouter(prefix="/api/kpis", tags=["kpis"])


@router.get("")
def get_kpis(db: Session = Depends(get_db)):
    today = date.today()
    week_start = today - timedelta(days=7)
    prev_week_start = today - timedelta(days=14)

    total_sales = db.query(func.sum(Sale.total)).scalar() or 0
    weekly_sales = db.query(func.sum(Sale.total)).filter(Sale.date >= week_start).scalar() or 0
    prev_weekly_sales = db.query(func.sum(Sale.total)).filter(
        Sale.date >= prev_week_start, Sale.date < week_start
    ).scalar() or 1

    weekly_orders = db.query(func.count(Sale.id)).filter(Sale.date >= week_start).scalar() or 0
    total_products = db.query(func.count(Product.id)).scalar() or 0
    weekly_avg_order = round(weekly_sales / weekly_orders, 2) if weekly_orders > 0 else 0
    sales_trend = round(((weekly_sales - prev_weekly_sales) / prev_weekly_sales) * 100, 1)

    active_customers = db.query(func.count(func.distinct(Sale.product_id))).filter(
        Sale.date >= week_start
    ).scalar() or 0

    low_stock_count = db.query(func.count(Product.id)).filter(Product.stock < 20).scalar() or 0

    return {
        "totalSales": round(total_sales, 2),
        "weeklySales": round(weekly_sales, 2),
        "salesTrend": sales_trend,
        "weeklyOrders": weekly_orders,
        "avgOrderValue": weekly_avg_order,
        "activeProducts": total_products,
        "activeCustomers": active_customers,
        "lowStockAlerts": low_stock_count,
    }
