# main.py
from fastapi import FastAPI, HTTPException
import joblib
import pandas as pd

app = FastAPI()

# ---------------------------
# 1. Load model and dataset
# ---------------------------
model = joblib.load("fraudguard_model.pkl")

# Get exact feature names the model expects
FEATURES_EXPECTED = list(model.feature_names_in_)

# Load your CSV dataset (for testing)
df_dataset = pd.read_csv("transaction_dataset.csv").fillna(0)

# Make sure we drop columns not in training
df_dataset = df_dataset.drop(columns=["Unnamed: 0", "Index", "Address", "FLAG"], errors="ignore")

# ---------------------------
# 2. API Endpoint
# ---------------------------
@app.post("/analyze")
async def analyze_wallet(data: dict):
    """
    Analyze a wallet using a dataset row index.
    Expects: {"row_index": int}
    """
    row_index = data.get("row_index")
    if row_index is None:
        raise HTTPException(status_code=400, detail="Missing 'row_index' in request body")

    # Validate row index
    if row_index < 0 or row_index >= len(df_dataset):
        raise HTTPException(status_code=400, detail="Invalid 'row_index'")

    # Extract row features
    row_features = df_dataset.iloc[row_index][FEATURES_EXPECTED]

    # Convert to DataFrame
    df_input = pd.DataFrame([row_features], columns=FEATURES_EXPECTED)

    # Predict
    try:
        prob = model.predict_proba(df_input)[0]  # [not_fraud, fraud]
        return {
            "status": "1",
            "message": "OK",
            "result": {
                "not_fraud_prob": float(prob[0]),
                "fraud_prob": float(prob[1])
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")