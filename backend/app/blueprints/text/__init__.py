from flask import Blueprint

text_bp = Blueprint('text', __name__)

from .text import *  # Import your routes

__all__ = ['text_bp']
