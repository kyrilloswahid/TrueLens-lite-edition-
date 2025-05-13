from flask import Blueprint

audio_bp = Blueprint('audio', __name__, url_prefix='/audio')

# Import the endpoints from audio.py so they are registered with the blueprint
from . import audio

# This file can be empty to make the directory a Python package
# Or you can expose the blueprint directly:
__all__ = ['audio_bp']
