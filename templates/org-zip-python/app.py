import os
from fastapi import FastAPI

PORT = int(os.getenv("PORT", "8080"))
app = FastAPI(title="__NAME__")


@app.get('/health')
def health():
    return {"ok": True, "service": "__NAME__"}


@app.post('/review')
def review(payload: dict):
    return {
        "ok": True,
        "extension": "__NAME__",
        "message": "Replace this placeholder with your org-specific proof-of-concept logic.",
        "input": payload,
    }


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=PORT)
