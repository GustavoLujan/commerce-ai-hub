from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    products = relationship("Product", back_populates="category")


class Region(Base):
    __tablename__ = "regions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    sales = relationship("Sale", back_populates="region")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    sku = Column(String, unique=True, nullable=False)
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False, default=0)
    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("Category", back_populates="products")
    sales = relationship("Sale", back_populates="product")


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False, index=True)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total = Column(Float, nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"))
    region_id = Column(Integer, ForeignKey("regions.id"))
    product = relationship("Product", back_populates="sales")
    region = relationship("Region", back_populates="sales")
