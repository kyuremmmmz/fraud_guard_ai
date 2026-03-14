# utils/get_transactions.py

import pandas as pd

# Define the exact features your model expects
MODEL_FEATURES = [
    "total_transactions",
    "total_sent",
    "total_received",
    "max_value_sent",
    "max_value_received",
    "avg_value_sent",
    "avg_value_received",
    "erc20_avg_val_sent",
    "erc20_avg_val_rec",
    "erc20_avg_time_between_sent_tnx",
    "erc20_avg_time_between_rec_tnx",
    # Add any other features your model has...
]

def extract_features(transactions):
    """
    Extract features from a list of transaction dicts.

    Each transaction dict can have keys like:
    - 'value'
    - 'type' (send/receive)
    - 'timestamp'
    - 'token' (optional, for ERC20)
    """

    features = {f: 0 for f in MODEL_FEATURES}

    if not transactions:
        return features

    total_sent = 0
    total_received = 0
    sent_values = []
    received_values = []
    sent_times = []
    received_times = []

    for tx in transactions:
        tx_value = float(tx.get("value", 0))
        tx_type = tx.get("type", "send").lower()
        tx_timestamp = int(tx.get("timestamp", 0))
        tx_token = tx.get("token", "ETH")

        if tx_type == "send":
            total_sent += tx_value
            sent_values.append(tx_value)
            sent_times.append(tx_timestamp)
        elif tx_type == "receive":
            total_received += tx_value
            received_values.append(tx_value)
            received_times.append(tx_timestamp)

    features["total_transactions"] = len(transactions)
    features["total_sent"] = total_sent
    features["total_received"] = total_received
    features["max_value_sent"] = max(sent_values) if sent_values else 0
    features["max_value_received"] = max(received_values) if received_values else 0
    features["avg_value_sent"] = sum(sent_values)/len(sent_values) if sent_values else 0
    features["avg_value_received"] = sum(received_values)/len(received_values) if received_values else 0

    # ERC20 specific (if token != ETH)
    erc20_sent = [v for v, tx in zip(sent_values, transactions) if tx.get("token") != "ETH"]
    erc20_received = [v for v, tx in zip(received_values, transactions) if tx.get("token") != "ETH"]
    erc20_sent_times = [t for t, tx in zip(sent_times, transactions) if tx.get("token") != "ETH" and tx.get("type") == "send"]
    erc20_received_times = [t for t, tx in zip(received_times, transactions) if tx.get("token") != "ETH" and tx.get("type") == "receive"]

    features["erc20_avg_val_sent"] = sum(erc20_sent)/len(erc20_sent) if erc20_sent else 0
    features["erc20_avg_val_rec"] = sum(erc20_received)/len(erc20_received) if erc20_received else 0

    def avg_time(times):
        if len(times) < 2:
            return 0
        times_sorted = sorted(times)
        deltas = [t2 - t1 for t1, t2 in zip(times_sorted[:-1], times_sorted[1:])]
        return sum(deltas)/len(deltas)

    features["erc20_avg_time_between_sent_tnx"] = avg_time(erc20_sent_times)
    features["erc20_avg_time_between_rec_tnx"] = avg_time(erc20_received_times)

    return features