from flask import Flask, render_template, url_for
from waitress import serve

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


if __name__ == "__main__":
    # app.run(debug=True)
    serve(app, host="0.0.0.0", port=8000)
