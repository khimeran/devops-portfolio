import os
import psycopg2
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="DevOps Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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