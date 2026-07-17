# Customer Churn Prediction

## Live Demo
- **Frontend:** https://customer-churn-prediction-ten-lyart.vercel.app/
- **Backend API:** https://customer-churn-prediction-xuip.onrender.com/docs

---

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

## Test the Model
Use these values to test a customer likely to churn:

| Field | Value |
|-------|-------|
| AccountWeeks | 100 |
| ContractRenewal | 0 |
| DataPlan | 0 |
| DataUsage | 0 |
| CustServCalls | 5 |
| DayMins | 300 |
| DayCalls | 100 |
| MonthlyCharge | 80 |
| OverageFee | 10 |
| RoamMins | 10 |

Expected result: **Will Churn — ~100% probability**

Use these values for a customer likely to stay:

| Field | Value |
|-------|-------|
| AccountWeeks | 200 |
| ContractRenewal | 1 |
| DataPlan | 1 |
| DataUsage | 3 |
| CustServCalls | 1 |
| DayMins | 150 |
| DayCalls | 80 |
| MonthlyCharge | 50 |
| OverageFee | 5 |
| RoamMins | 5 |

Expected result: **Will Stay**

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

| Metric | Score | What it means |
|--------|-------|---------------|
| Accuracy | 0.79 | 79% overall correct — misleading here |
| Precision | 0.40 | When model says churn, right 40% of time |
| Recall | 0.80 | Catches 80% of actual churners |
| F1 Score | 0.53 | Balance between precision and recall |

Recall of 0.80 is the most important metric here.
Missing a churning customer costs the business money.

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Model | Python, Scikit-learn, Logistic Regression |
| Backend | FastAPI, Uvicorn |
| Frontend | React, Vite |
| Deployment | Render (backend), Vercel (frontend) |

---

## Features Used
| Feature | Description |
|---------|-------------|
| AccountWeeks | How long customer has had account |
| ContractRenewal | Did they renew contract recently? (1=Yes, 0=No) |
| DataPlan | Do they have a data plan? (1=Yes, 0=No) |
| DataUsage | GB of data used per month |
| CustServCalls | Number of customer service calls |
| DayMins | Minutes used during the day |
| DayCalls | Number of calls during the day |
| MonthlyCharge | Monthly bill amount |
| OverageFee | Extra charges beyond plan |
| RoamMins | Minutes used while roaming |
