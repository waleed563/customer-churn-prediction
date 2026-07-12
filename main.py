from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model/churn_model.pkl")

class ChurnInput(BaseModel):
    AccountWeeks: int
    ContractRenewal: int
    DataPlan: int
    DataUsage: float
    CustServCalls: int
    DayMins: float
    DayCalls: int
    MonthlyCharge: float
    OverageFee: float
    RoamMins: float

@app.post("/predict")
def predict(data: ChurnInput):
    features = np.array([[
        data.AccountWeeks,
        data.ContractRenewal,
        data.DataPlan,
        data.DataUsage,
        data.CustServCalls,
        data.DayMins,
        data.DayCalls,
        data.MonthlyCharge,
        data.OverageFee,
        data.RoamMins,
    ]])
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]
    return {
        "churn_prediction": "Yes" if prediction == 1 else "No",
        "churn_probability": round(float(probability), 2)
    }