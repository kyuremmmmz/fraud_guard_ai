from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

model = joblib.load("fraud_model.pkl")
le = joblib.load("address_encoder.pkl")

# Load the dataset to extract features
df_transactions = pd.read_csv("transaction_dataset.csv")
df_transactions.columns = df_transactions.columns.str.strip()


app = FastAPI(title="Fraud Detection API")

class WalletPayload(BaseModel):
    address: str

def extract_features(address: str):
    """
    Return numeric features for a given address.
    If address not in dataset, return safe defaults.
    """
    df_addr = df_transactions[df_transactions['Address'] == address]
    
    if not df_addr.empty:
        features = {
            'Unique Sent To Addresses': int(df_addr['Unique Sent To Addresses'].sum()),
            'Number of Created Contracts': int(df_addr['Number of Created Contracts'].sum()),
            'Unique Received From Addresses': int(df_addr['Unique Received From Addresses'].sum()),
            'Address': le.transform([address])[0]
        }
    else:
        features = {
            'Unique Sent To Addresses': 0,
            'Number of Created Contracts': 0,
            'Unique Received From Addresses': 0,
            'Address': 0
        }
    return features


@app.post("/analyze")
async def analyze_wallet(payload: WalletPayload):
    features = extract_features(payload.address)
    
    df_input = pd.DataFrame([features])
    
    flagged = bool(model.predict(df_input)[0])
    fraud_score = float(model.predict_proba(df_input)[0][1] * 100)

    total_txn_pattern = sum([
        features['Unique Sent To Addresses'],
        features['Number of Created Contracts'],
        features['Unique Received From Addresses']
    ])
    
    return {
        "Address": payload.address,
        "Total Transactions Pattern Match": total_txn_pattern,
        "Flagged Address": flagged,
        "Fraud Score": fraud_score
    }