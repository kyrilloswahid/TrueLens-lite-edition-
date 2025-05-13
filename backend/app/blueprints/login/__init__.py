from flask import Blueprint

login_bp = Blueprint('login', __name__, url_prefix='/login')

from .login import *  # Automatically load all routes

__all__ = ['login_bp']