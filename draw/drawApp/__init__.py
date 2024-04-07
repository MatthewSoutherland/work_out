import os
from flask import Flask
from config import DevelopmentConfig, ProductionConfig, TestingConfig
from .home import home_bp


def create_app():
    app = Flask(__name__)

    # Determine which config to load
    env = os.getenv("FLASK_ENV", "development")
    if env == "production":
        app.config.from_object(ProductionConfig)
    elif env == "testing":
        app.config.from_object(TestingConfig)
    else:
        app.config.from_object(DevelopmentConfig)

    app.register_blueprint(home_bp)

    # Initialize other components of your app
    return app
