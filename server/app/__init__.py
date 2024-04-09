from flask import Flask
from .api import api_blueprint  # Assuming your Blueprint is initialized in app/api/__init__.py

def create_app():
    app = Flask(__name__)
    app.register_blueprint(api_blueprint, url_prefix='/api')
    return app