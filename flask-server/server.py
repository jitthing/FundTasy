from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/members')
def members():
    return { "members": ["jitt", "dwight", "fuqiang", "kelvin", "keegan"] }

if __name__ == "__main__":
    app.run(debug=True)