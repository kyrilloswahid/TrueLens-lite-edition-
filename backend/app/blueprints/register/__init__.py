from flask import Blueprint

# Define the blueprint here
register_bp = Blueprint('register', __name__, url_prefix='/register')

# Import routes (register.py) so that they attach to register_bp
from .register import *

__all__ = ['register_bp']