import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# load dataset
df = pd.read_csv("transaction_dataset.csv")

# drop useless columns
df = df.drop(columns=["Unnamed: 0","Index","Address"])

# features and label
X = df.drop("FLAG", axis=1)
y = df["FLAG"]

# fill missing values
X = X.fillna(0)

# convert text columns to numeric
X = pd.get_dummies(X)

# split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# train model
model = RandomForestClassifier(n_estimators=200)
model.fit(X_train, y_train)

# evaluate
pred = model.predict(X_test)
print(classification_report(y_test, pred))

# save model
joblib.dump(model, "fraudguard_model.pkl")