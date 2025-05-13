import re
from flask import request, jsonify
from passlib.hash import pbkdf2_sha256
from app.db import db
from app.models import User
from flask_cors import CORS
from . import login_bp

# Enable CORS for this blueprint
CORS(login_bp, resources={r"/*": {"origins": "*"}})

# Health Check
@login_bp.route('/')
def home():
    return jsonify({'message': 'Login API is running.'}), 200

@login_bp.route('/api/auth', methods=['POST'])
def login():
    data = request.get_json()

    # Validate required fields
    if not data.get('identifier') or not data.get('password'):
        return jsonify({'error': 'Identifier and Password are required'}), 400

    identifier = data.get('identifier')
    password = data.get('password')

    user = None

    # Check if it's a valid email format
    if re.fullmatch(r"[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+", identifier):
        user = User.query.filter_by(email=identifier).first()

    # Check if it's a valid username format
    elif re.fullmatch(r"^[a-zA-Z0-9._]+$", identifier):
        user = User.query.filter_by(username=identifier).first()

    else:
        # Invalid identifier format (not a valid email or username)
        return jsonify({'error': 'Invalid identifier format. Must be a valid email or username.'}), 400

    # If identifier was valid but user not found
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Check if password matches
    if not pbkdf2_sha256.verify(password, user.password_hash):
        return jsonify({'error': 'Incorrect password'}), 401

    # Return success response
    return jsonify({
        'message': 'Login successful',
        'user': {
            'id': user.id,
            'username': user.username,
            'display_name': user.display_name,
            'email': user.email
        }
    }), 200
