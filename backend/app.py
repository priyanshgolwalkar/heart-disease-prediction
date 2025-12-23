@app.get("/")
def root():
    return {"status": "API is running"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI(title="Heart Disease Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = pickle.load(open("heart_model.pkl", "rb"))
features = pickle.load(open("features.pkl", "rb"))

class PatientData(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

@app.post("/predict")
def predict(data: PatientData):
    input_data = [getattr(data, f) for f in features]
    pred = model.predict([input_data])[0]
    prob = model.predict_proba([input_data])[0][1]

    return {
        "prediction": int(pred),
        "risk": "High" if pred == 1 else "Low",
        "confidence": round(prob * 100, 2),
        "message": (
            "Consult a cardiologist immediately."
            if pred == 1
            else "Maintain a healthy lifestyle."
        )
    }
