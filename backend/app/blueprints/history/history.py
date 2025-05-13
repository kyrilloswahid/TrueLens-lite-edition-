from flask import request, jsonify
from app.db import db
import uuid
from app.models import History  # Ensure History model is defined
from . import history_bp
from flask_cors import CORS

# Enable CORS for this blueprint (allows requests from frontend)
CORS(history_bp, resources={r"/*": {"origins": "*"}})

@history_bp.route('/', methods=['GET'])
def get_history():
    """
    Retrieve history records.
    Filter by user_id from query parameters.
    Example: /history?user_id=<user_id>
    """
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({'error': 'user_id parameter is required'}), 400

    try:
        records = History.query.filter_by(user_id=user_id).all()

        history_list = []
        for record in records:
            history_list.append({
                'history_id': record.id,
                'user_id': record.user_id,
                'file_id': record.file_id,
                'prediction': record.prediction,
                'real_confidence': record.real_confidence,
                'fake_confidence': record.fake_confidence,
                'created_at': record.created_at.isoformat()
            })

        return jsonify({'history': history_list}), 200

    except Exception as e:
        return jsonify({'error': f'Error fetching history: {str(e)}'}), 500
