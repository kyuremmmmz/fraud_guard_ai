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

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/fraud-guard-ai.git
cd fraud-guard-ai
