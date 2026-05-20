# Commerce AI Hub

Plataforma de Business Intelligence para retail con asistente de IA integrado. Dashboard ejecutivo en tiempo real con visualización de KPIs, análisis de ventas por región/categoría, gestión de inventario y consultas en lenguaje natural mediante Claude AI.

## Stack técnico

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Estilos | Tailwind CSS |
| Gráficos | Recharts (Line, Pie, Bar) |
| Estado global | Zustand |
| Data fetching | TanStack Query + Axios |
| Routing | React Router v6 |
| Backend | FastAPI (Python) |
| Base de datos | SQLite + SQLAlchemy |
| IA | Anthropic Claude API (claude-sonnet-4-6) |

## Requisitos

- Python 3.10+
- Node.js 18+
- Clave API de Anthropic (opcional para el chat de IA)

## Instalación y ejecución

### 1. Backend

```bash
cd backend

# Crear entorno virtual (recomendado)
python -m venv venv
venv\Scripts\activate     # Windows
# source venv/bin/activate  # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
copy .env.example .env
# Editar .env y poner tu ANTHROPIC_API_KEY

# Poblar la base de datos con datos de ejemplo
python -m app.seed_data

# Iniciar el servidor (puerto 8000)
python run.py
```

El backend queda en `http://localhost:8000` — documentación automática en `http://localhost:8000/docs`.

### 2. Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (puerto 5173)
npm run dev
```

Abrir `http://localhost:5173`.

## Estructura del proyecto

```
commerce-ai-hub/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app + CORS + routers
│   │   ├── database.py          # SQLAlchemy + SQLite
│   │   ├── models.py            # ORM: Sale, Product, Category, Region
│   │   ├── seed_data.py         # Genera 50 productos, ~2900 ventas (6 meses)
│   │   ├── routers/
│   │   │   ├── kpis.py          # GET /api/kpis
│   │   │   ├── sales.py         # GET /api/sales?start=&end=
│   │   │   ├── inventory.py     # GET /api/inventory?search=&category=
│   │   │   ├── categories.py    # GET /api/categories + /regions + /category-list
│   │   │   └── chat.py          # POST /api/chat
│   │   └── services/
│   │       ├── llm_service.py   # Integración Claude API con contexto dinámico
│   │       └── analytics_service.py  # Snapshot de datos para el LLM
│   └── requirements.txt
│
└── frontend/
    └── src/
        ├── api/client.ts        # Axios instance
        ├── store/useAppStore.ts # Zustand: dateRange + sidebar
        ├── types/index.ts       # TypeScript interfaces
        ├── hooks/               # useKPIs, useSales, useInventory, useChat
        ├── components/
        │   ├── layout/          # Layout, Sidebar, Header con filtro de fecha
        │   ├── dashboard/       # KPICard
        │   ├── charts/          # RevenueChart, CategoryChart, RegionalChart
        │   ├── chat/            # ChatWindow, ChatMessage, ChatInput
        │   └── inventory/       # InventoryTable, StockBadge
        └── pages/
            ├── Dashboard.tsx    # KPIs + gráficos principales
            ├── Analytics.tsx    # Análisis detallado por región/categoría
            ├── AIAssistant.tsx  # Chat con Claude
            ├── Inventory.tsx    # Tabla de productos con filtros
            └── Reports.tsx      # Resumen ejecutivo + exportación CSV
```

## Funcionalidades

- **Dashboard**: 4 KPIs (ventas semanales, pedidos, ticket promedio, alertas de stock) + gráfico de ingresos diarios + donut de categorías
- **Analytics**: Tendencias de ventas + comparativa regional (BarChart) + tabla de desglose
- **AI Assistant**: Chat con Claude que recibe contexto dinámico de la base de datos (top productos, ventas, alertas)
- **Inventario**: Tabla paginada y ordenable con búsqueda, filtro por categoría y badges de estado de stock
- **Reportes**: Resumen ejecutivo del período + exportación a CSV (ventas, categorías, regiones)
- **Filtro de fecha global**: El Header tiene selectores de fecha que actualizan todos los gráficos simultáneamente vía Zustand

## API Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/kpis` | KPIs principales (ventas, pedidos, alertas) |
| GET | `/api/sales` | Ventas diarias con filtro de fecha |
| GET | `/api/categories` | Ingresos por categoría |
| GET | `/api/regions` | Ingresos y pedidos por región |
| GET | `/api/inventory` | Productos con búsqueda y filtros |
| POST | `/api/chat` | Asistente de IA con contexto de negocio |
