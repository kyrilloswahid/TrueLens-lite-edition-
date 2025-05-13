import os
from flask import request, jsonify, send_from_directory
from flask_cors import CORS
from gradio_client import Client, handle_file
from app.db import db
from app.models import History
from . import audio_bp

# Enable CORS
CORS(audio_bp, resources={r"/*": {"origins": "*"}})

# Hugging Face config
SPACE_NAME = "Zeyadd-Mostaffa/deepfake_audio_model"
API_NAME = "/predict"
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'wav', 'mp3'}

client = Client(SPACE_NAME)

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@audio_bp.route('/')
def home():
    return jsonify({'message': 'Audio API is running.'}), 200

@audio_bp.route('/api/upload', methods=['POST'])
def api_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        filename = file.filename
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200
    else:
        return jsonify({'error': 'Invalid file type. Only .wav and .mp3 files are allowed.'}), 400

@audio_bp.route('/api/predict/<filename>', methods=['GET'])
def api_predict(filename):
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    user_id = request.args.get('user_id')

    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404
    if not user_id:
        return jsonify({'error': 'user_id is required in query parameters'}), 400

    try:
        result = client.predict(
            audio_file=handle_file(file_path),
            api_name=API_NAME
        )

        # Result is just "Fake" or "Real"
        label = result if isinstance(result, str) else "Unknown"

        # Store only label + user in history
        history = History(
            user_id=user_id,
            file_id=filename,
            prediction=label,
            real_confidence=None,
            fake_confidence=None
        )
        db.session.add(history)
        db.session.commit()

        return jsonify({
            'filename': filename,
            'prediction': label
        }), 200

    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@audio_bp.route('/api/uploads/<filename>', methods=['GET'])
def api_uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
