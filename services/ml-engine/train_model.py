import pandas as pd

from sklearn.ensemble import IsolationForest

import joblib

# Load dataset

df = pd.read_csv(
    "metrics_dataset.csv"
)

# Select features

X = df[[
    "cpu",
    "memory",
    "requests",
    "response_time",
    "restarts"
]]

# Create ML model

model = IsolationForest(
    contamination=0.2,
    random_state=42
)

# Train model

model.fit(X)

# Save trained model

joblib.dump(
    model,
    "anomaly_model.pkl"
)

print(
    "✅ ML anomaly model trained successfully"
)