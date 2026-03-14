# Fraud Guard AI 🚨

Fraud Guard AI is a **blockchain transaction fraud detection tool** powered by machine learning. It analyzes wallet transactions and flags suspicious activity using a trained **RandomForestClassifier**. This project is intended as an **open-source MVP** for developers building blockchain analytics tools.

---

## Features

- Predict if a wallet is likely **fraudulent** based on transaction patterns.
- Accepts **wallet addresses** as input.
- Returns:
  - Fraud score (% probability)
  - Flagged status (True/False)
  - Total transactions pattern summary
- Works with **known addresses** from the dataset or provides safe defaults for unknown addresses.
- Built with **Python**, **FastAPI**, **scikit-learn**, and **pandas**.

---

## Coming Soon / Planned Features

- **Web Scraping** – Automatically collect wallet transaction data and other blockchain info.  
- **Ethereum Market Analysis** – Integrate market trends, token prices, and smart contract activity to enhance fraud detection accuracy.  

---

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/fraud-guard-ai.git
cd fraud-guard-ai****
