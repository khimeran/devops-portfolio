import os
import time
import psycopg2
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import Counter, Histogram, make_asgi_app

REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total number of HTTP requests',
    ['method', 'endpoint', 'status']
)
REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds',
    'HTTP request latency in seconds',
    ['endpoint']
)

app = FastAPI(title="DevOps Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/metrics", make_asgi_app())

@app.middleware("http")
async def track_requests(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = time.time() - start
    if request.url.path != "/metrics":
        REQUEST_COUNT.labels(
            method=request.method,
            endpoint=request.url.path,
            status=response.status_code
        ).inc()
        REQUEST_LATENCY.labels(endpoint=request.url.path).observe(duration)
    return response

def get_db():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "db"),
        dbname=os.getenv("DB_NAME", "portfolio"),
        user=os.getenv("DB_USER", "devops"),
        password=os.getenv("DB_PASSWORD", "devops"),
    )

@app.get("/")
def root():
    return {"status": "ok", "message": "DevOps Portfolio API is running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/topics")
def get_topics():
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT id, name, progress, notes, updated_at FROM topics ORDER BY id")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return [
            {"id": r[0], "name": r[1], "progress": r[2], "notes": r[3], "updated_at": str(r[4])}
            for r in rows
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/topics/{topic_id}")
def update_topic(topic_id: int, progress: int, notes: str = ""):
    if progress < 0 or progress > 100:
        raise HTTPException(status_code=400, detail="Progress must be between 0 and 100")
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "UPDATE topics SET progress=%s, notes=%s, updated_at=NOW() WHERE id=%s",
            (progress, notes, topic_id)
        )
        conn.commit()
        cur.close()
        conn.close()
        return {"status": "updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))