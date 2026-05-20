from fastapi import FastAPI

app = FastAPI(title="DevOps Portfolio API")

@app.get("/")
def root():
    return {"status": "ok", "message": "DevOps Portfolio API is running"}

@app.get("/health")
def health():
      return {"status": "healthy"}