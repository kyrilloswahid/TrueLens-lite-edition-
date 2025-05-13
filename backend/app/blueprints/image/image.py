import os
import re
import numpy as np
from flask import request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications.xception import preprocess_input
from . import image_bp

# Enable CORS for this blueprint (allows requests from frontend)
CORS(image_bp, resources={r"/*": {"origins": "*"}})

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'xception_model.h5')

# Load the local Keras model
model = load_model(MODEL_PATH)

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Helper to check extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@image_bp.route('/')
def home():
    return jsonify({'message': 'Image API is running.'}), 200

@image_bp.route('/api/upload', methods=['POST'])
def api_upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if file and allowed_file(file.filename):
        filename = file.filename
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        return jsonify({"message": "File uploaded successfully", "filename": filename}), 200
    else:
        return jsonify({"error": "Invalid file type. Only .jpg, .jpeg, and .png files are allowed."}), 400

@image_bp.route('/api/predict/<filename>', methods=['GET'])
def api_predict(filename):
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    try:
        # === Xception-compatible preprocessing ===
        img = load_img(file_path, target_size=(299, 299))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        # === Predict ===
        prediction = model.predict(img_array)[0][0]  # Assuming model outputs a single sigmoid
        predicted_probability = prediction * 100
        predicted_class = int(prediction > 0.5)
        label = "Real" if predicted_class == 1 else "Fake"

        real_confidence = predicted_probability
        fake_confidence = 100 - predicted_probability

        return jsonify({
            "filename": filename,
            "prediction": label,
            "real_confidence": float(real_confidence),
            "fake_confidence": float(fake_confidence)
        }), 200

    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

@image_bp.route('/api/uploads/<filename>', methods=['GET'])
def api_uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
