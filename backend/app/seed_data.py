import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import engine, SessionLocal
from app.models import Base, Category, Region, Product, Sale
from datetime import date, timedelta
import random

CATEGORIES = ["Electrónica", "Ropa", "Hogar", "Alimentos", "Deportes"]
REGIONS = ["Norte", "Sur", "Centro", "Este", "Oeste"]

PRODUCTS_BY_CATEGORY = {
    "Electrónica": [
        ("Smartphone Samsung A54", 349.99),
        ("Auriculares Bluetooth JBL", 89.99),
        ("Tablet Lenovo Tab M10", 229.99),
        ("Smart TV 43\" TCL", 499.99),
        ("Cámara Fujifilm Instax", 119.99),
        ("Laptop HP 15", 699.99),
        ("Smartwatch Amazfit", 149.99),
        ("Parlante Portátil JBL", 79.99),
        ("Monitor LG 24\"", 179.99),
        ("Teclado Mecánico Redragon", 59.99),
    ],
    "Ropa": [
        ("Camisa Lino Hombre", 39.99),
        ("Vestido Verano Mujer", 49.99),
        ("Jeans Slim Fit", 59.99),
        ("Zapatillas Adidas Runfalcon", 79.99),
        ("Campera Impermeable", 89.99),
        ("Remera Algodón Pack x3", 34.99),
        ("Pantalón Chino Mujer", 44.99),
        ("Zapatillas Nike Air Max", 119.99),
        ("Medias Deportivas Pack x6", 19.99),
        ("Gorra New Era", 29.99),
    ],
    "Hogar": [
        ("Set Sábanas 2 Plazas", 49.99),
        ("Licuadora Oster 600W", 69.99),
        ("Silla Ergonómica Escritorio", 199.99),
        ("Lámpara LED Escritorio", 34.99),
        ("Aspiradora Rowenta", 129.99),
        ("Cafetera Nespresso", 149.99),
        ("Set Ollas Antiadherentes", 89.99),
        ("Organizador Closet 8 cajones", 59.99),
        ("Toallas Pack x4", 29.99),
        ("Almohadas Viscoelástica x2", 74.99),
    ],
    "Alimentos": [
        ("Café Molido Premium 500g", 14.99),
        ("Té Verde Orgánico x50 saquitos", 9.99),
        ("Aceite de Oliva Extra Virgen 1L", 19.99),
        ("Granola Artesanal 500g", 11.99),
        ("Proteína Whey Chocolate 1kg", 49.99),
        ("Frutos Secos Mix 500g", 16.99),
        ("Salsa de Tomate Gourmet x6", 24.99),
        ("Chocolate Orgánico 70% x5", 22.99),
        ("Miel Silvestre 1kg", 17.99),
        ("Quinoa Real 1kg", 12.99),
    ],
    "Deportes": [
        ("Pelota Fútbol Nike Strike", 44.99),
        ("Mochila Montaña 40L", 89.99),
        ("Colchoneta Yoga 6mm", 34.99),
        ("Mancuernas Ajustables 20kg", 149.99),
        ("Cuerda de Saltar Pro", 24.99),
        ("Raqueta Tenis Wilson", 79.99),
        ("Casco Bicicleta MTB", 54.99),
        ("Guantes Boxeo Everlast", 49.99),
        ("Banda Elástica Resistencia x5", 29.99),
        ("Botella Agua Térmica 750ml", 22.99),
    ],
}


def seed():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    categories = {}
    for name in CATEGORIES:
        cat = Category(name=name)
        db.add(cat)
        db.flush()
        categories[name] = cat

    regions = {}
    for name in REGIONS:
        reg = Region(name=name)
        db.add(reg)
        db.flush()
        regions[name] = reg

    products = []
    sku_counter = 1000
    for cat_name, items in PRODUCTS_BY_CATEGORY.items():
        for prod_name, price in items:
            stock = random.randint(0, 200)
            prod = Product(
                name=prod_name,
                sku=f"SKU-{sku_counter}",
                price=price,
                stock=stock,
                category_id=categories[cat_name].id,
            )
            db.add(prod)
            db.flush()
            products.append(prod)
            sku_counter += 1

    today = date.today()
    start_date = today - timedelta(days=180)
    region_list = list(regions.values())

    for day_offset in range(181):
        current_date = start_date + timedelta(days=day_offset)
        daily_sales_count = random.randint(8, 25)
        for _ in range(daily_sales_count):
            product = random.choice(products)
            quantity = random.randint(1, 5)
            region = random.choice(region_list)
            total = round(product.price * quantity, 2)
            sale = Sale(
                date=current_date,
                quantity=quantity,
                unit_price=product.price,
                total=total,
                product_id=product.id,
                region_id=region.id,
            )
            db.add(sale)

    db.commit()
    db.close()

    prod_count = sum(len(v) for v in PRODUCTS_BY_CATEGORY.values())
    print(f"Seeded {prod_count} products, 5 categories, 5 regions, ~{181 * 16} sales records.")


if __name__ == "__main__":
    seed()
