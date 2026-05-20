import os
import anthropic
from dotenv import load_dotenv

load_dotenv()

_api_key = os.getenv("ANTHROPIC_API_KEY", "")
client = anthropic.Anthropic(api_key=_api_key) if _api_key else None

SYSTEM_TEMPLATE = """Eres un asistente comercial inteligente para Commerce AI Hub, una plataforma de business intelligence para retail.

Datos actuales del negocio (actualizado al momento):
- Ventas esta semana: ${weekly_sales:,.2f}
- Ventas este mes: ${monthly_sales:,.2f}
- Ventas totales históricas: ${total_sales_all_time:,.2f}
- Top 3 productos (semana): {top_products}
- Top 3 regiones (semana): {top_regions}
- Alertas de stock bajo (<20 unidades): {low_stock}
- Desglose por categoría (mes): {categories}

Instrucciones:
- Responde siempre en español, de forma concisa y orientada a decisiones ejecutivas.
- Si te preguntan por datos específicos, usa los datos de contexto provistos arriba.
- Si la pregunta no está relacionada con negocios o datos comerciales, redirige amablemente.
- Usa formatos claros: bullets, números, tablas de texto cuando ayude a la comprensión.
- Máximo 3-4 párrafos por respuesta."""


def build_system_prompt(snapshot: dict) -> str:
    top_products = ", ".join(
        [f"{p['name']} (${p['revenue']:,.2f})" for p in snapshot["top_products_week"]]
    ) or "sin datos"

    top_regions = ", ".join(
        [f"{r['name']} (${r['revenue']:,.2f})" for r in snapshot["top_regions_week"]]
    ) or "sin datos"

    low_stock = ", ".join(
        [f"{p['name']} ({p['stock']} uds)" for p in snapshot["low_stock_alerts"]]
    ) or "ninguna alerta crítica"

    categories = ", ".join(
        [f"{c['name']}: ${c['revenue']:,.2f}" for c in snapshot["category_breakdown_month"]]
    ) or "sin datos"

    return SYSTEM_TEMPLATE.format(
        weekly_sales=snapshot["weekly_sales"],
        monthly_sales=snapshot["monthly_sales"],
        total_sales_all_time=snapshot["total_sales_all_time"],
        top_products=top_products,
        top_regions=top_regions,
        low_stock=low_stock,
        categories=categories,
    )


def chat(messages: list[dict], snapshot: dict) -> str:
    if not client:
        return (
            "⚠️ El asistente de IA requiere una ANTHROPIC_API_KEY configurada en el archivo `.env` del backend. "
            f"\n\nDatos del negocio disponibles:\n"
            f"- Ventas esta semana: ${snapshot['weekly_sales']:,.2f}\n"
            f"- Ventas este mes: ${snapshot['monthly_sales']:,.2f}\n"
            f"- Alertas de stock bajo: {len(snapshot['low_stock_alerts'])} productos"
        )

    system_prompt = build_system_prompt(snapshot)

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=system_prompt,
        messages=messages,
    )

    return response.content[0].text
