# Customer Churn Prediction

## What is this project?
A machine learning web app that predicts whether a telecom customer 
will cancel their subscription (churn) or stay.

Built with Logistic Regression, FastAPI, and React.

---

## The Business Problem
Telecom companies lose millions when customers leave. 
If we can predict WHO is about to leave BEFORE they do, 
the company can offer them discounts or better plans to keep them.

This model takes customer usage data and predicts:
- Will this customer churn? (Yes or No)
- How likely are they to churn? (Probability %)

---

## Dataset
- Source: Kaggle — Telecom Customer Churn
- Rows: 3,333 customers
- Columns: 11 features
- Target column: Churn (0 = stayed, 1 = churned)

---

## The Problem with this Data — Class Imbalance
- 85.5% of customers stayed
- 14.5% of customers churned

If the model just predicted "stayed" for everyone,
it would get 85% accuracy without learning anything.
That's why accuracy alone is a misleading metric here.

---

## Algorithm — Logistic Regression
Logistic Regression is a classification algorithm.
Unlike Linear Regression which predicts a number,
Logistic Regression predicts a probability between 0 and 1.

It answers: "What is the probability this customer will churn?"
- Above 0.5 → Churn (Yes)
- Below 0.5 → Stay (No)

We used class_weight='balanced' to handle the class imbalance.
This tells the model to pay more attention to churned customers
during training, even though they are fewer in number.

---

## Evaluation Metrics
We did NOT use accuracy as our main metric because of class imbalance.
Instead we used:

| Metric    | Score | What it means |
|-----------|-------|---------------|
| Accuracy  | 0.79  | 79% overall correct — misleading here |
| Precision | 0.40  | When model says churn, right 40% of time |
| Recall    | 0.80  | Catches 80% of actual churners |
| F1 Score  | 0.53  | Balance between precision and recall |

Recall of 0.80 is the most important metric here.
Missing a churning customer costs the business money.
Better to flag too many than miss real churners.

---

## Tech Stack
| Layer    | Technology |
|----------|------------|
| Model    | Python, Scikit-learn, Logistic Regression |
| Backend  | FastAPI, Uvicorn |
| Frontend | React, Vite |
| Storage  | Joblib (.pkl model file) |

---

## How to Run Locally

### Backend
```bash
cd ml_models
source venv/Scripts/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

API runs on: http://127.0.0.1:8000
UI runs on: http://localhost:5173

---

## Features Used
| Feature | Description |
|---------|-------------|
| AccountWeeks | How long customer has had account |
| ContractRenewal | Did they renew contract recently? |
| DataPlan | Do they have a data plan? |
| DataUsage | GB of data used per month |
| CustServCalls | Number of customer service calls |
| DayMins | Minutes used during the day |
| DayCalls | Number of calls during the day |
| MonthlyCharge | Monthly bill amount |
| OverageFee | Extra charges beyond plan |
| RoamMins | Minutes used while roaming |

---

## Results
The model successfully identifies 80% of customers who will churn.
This gives telecom companies a tool to take action before losing customers.