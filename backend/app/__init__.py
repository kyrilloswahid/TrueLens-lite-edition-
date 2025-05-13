from flask import Flask

from app.blueprints.login import login_bp
from app.db import db
from flask_sqlalchemy import SQLAlchemy
from app.blueprints.audio import audio_bp
from app.blueprints.image import image_bp
from app.blueprints.text import text_bp
from app.blueprints.register import register_bp
from app.blueprints.history import history_bp
from app.models import User

def create_app(config_class=None):
    app = Flask(__name__)

    if config_class:
        app.config.from_object(config_class)

    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///truelens.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize the database with the app
    db.init_app(app)

    # Register blueprints with appropriate URL prefixes
    app.register_blueprint(audio_bp, url_prefix='/audio')
    app.register_blueprint(image_bp, url_prefix='/image')
    app.register_blueprint(text_bp, url_prefix='/text')
    app.register_blueprint(register_bp, url_prefix='/register')
    app.register_blueprint(history_bp, url_prefix='/history')
    app.register_blueprint(login_bp, url_prefix='/login')

    # Create tables if they don't exist (useful for development)
    with app.app_context():
        db.create_all()
        print("Database tables created!")

    return app
