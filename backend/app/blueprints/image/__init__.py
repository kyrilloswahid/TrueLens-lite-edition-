from flask import Blueprint

# Create the blueprint object for image detection, with URL prefix "/image"
image_bp = Blueprint('image', __name__, url_prefix='/image')

# Import the endpoints from image.py so they are registered with the blueprint
from . import image

__all__ = ['image_bp']
