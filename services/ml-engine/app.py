from flask import Flask, request, jsonify

import joblib

import pandas as pd

app = Flask(__name__)

# Load trained ML model

model = joblib.load(
    "anomaly_model.pkl"
)

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    # Convert incoming metrics into dataframe

    features = pd.DataFrame([[
        data["cpu"],
        data["memory"],
        data["requests"],
        data["response_time"],
        data["restarts"]
    ]], columns=[
        "cpu",
        "memory",
        "requests",
        "response_time",
        "restarts"
    ])

    # ML prediction

    prediction = model.predict(
        features
    )

    # Isolation Forest:
    # -1 = anomaly
    # 1 = normal

    anomaly = (
        True if prediction[0] == -1
        else False
    )

    return jsonify({
        "anomaly": anomaly
    })

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=6000
    )