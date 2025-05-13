import re
import uuid
import smtplib
from email.mime.text import MIMEText
from flask import request, jsonify
from passlib.hash import pbkdf2_sha256
from app.db import db
from app.models import User
from flask_cors import CORS
from . import register_bp

# Enable CORS for this blueprint (allows requests from frontend)
CORS(register_bp, resources={r"/*": {"origins": "*"}})

# Health Check
@register_bp.route('/')
def home():
    return jsonify({'message': 'Register API is running.'}), 200

# Use localhost domain for local development
domain = "http://127.0.0.1:5000"

def send_verification_email(email, token):
    subject = "Verify your TrueLens Email"
    verification_link = f"{domain}/register/verify/{token}"
    body = (
        f"Hello,\n\n"
        f"Please verify your email by clicking the following link:\n"
        f"{verification_link}\n\n"
        f"Thank you,\nTrueLens Team"
    )
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = "no-reply@truelens.com"
    msg['To'] = email

    try:
        # Connect to local SMTP debugging server on port 1025
        with smtplib.SMTP('localhost', 1025) as server:
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

@register_bp.route('/api/new', methods=['POST'])
def register():
    data = request.get_json()
    required_fields = ['first_name', 'last_name', 'username', 'display_name', 'email', 'password']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

    email = data.get('email')
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({'error': 'Invalid email address'}), 400

    # Hash the password securely using passlib
    password_hash = pbkdf2_sha256.hash(data.get('password'))

    # Create a new user instance
    user = User(
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        username=data.get('username'),
        display_name=data.get('display_name'),
        email=email,
        password_hash=password_hash
    )

    # Save the user to the database
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        return jsonify({'error': f'Error saving user: {str(e)}'}), 500

    # Generate a verification token
    verification_token = str(uuid.uuid4())

    # Send the verification email using the local SMTP debugging server
    if not send_verification_email(email, verification_token):
        return jsonify({'error': 'Registration failed: could not send verification email'}), 500

    return jsonify({
        'message': f'Registration successful. A verification email has been sent to {email}.'
    }), 200
