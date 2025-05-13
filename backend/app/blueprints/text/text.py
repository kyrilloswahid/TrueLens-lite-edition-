import os
from flask import request, jsonify
from flask_cors import CORS
from . import text_bp
import torch
from transformers import (
    RobertaForSequenceClassification,
    DebertaForSequenceClassification,
    RobertaTokenizer,
    DebertaTokenizer,
    RobertaConfig,
    DebertaConfig
)

# Enable CORS
CORS(text_bp, resources={r"/*": {"origins": "*"}})

# === Model loading ===
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'ensemble_model.pt')
DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'

class EnsembleInference:
    def __init__(self, model_path, device='cpu'):
        self.device = device
        self.roberta_tokenizer = RobertaTokenizer.from_pretrained("roberta-base")
        self.deberta_tokenizer = DebertaTokenizer.from_pretrained("microsoft/deberta-base")
        self.load_models(model_path)

    def load_models(self, path):
        state = torch.load(path, map_location=self.device)
        roberta_config = RobertaConfig.from_dict(state['model_configs']['roberta_config'])
        deberta_config = DebertaConfig.from_dict(state['model_configs']['deberta_config'])

        self.roberta_model = RobertaForSequenceClassification(roberta_config).to(self.device)
        self.deberta_model = DebertaForSequenceClassification(deberta_config).to(self.device)

        self.roberta_model.load_state_dict(state['roberta_state_dict'])
        self.deberta_model.load_state_dict(state['deberta_state_dict'])

    def predict(self, text):
        roberta_inputs = self.roberta_tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=512)
        deberta_inputs = self.deberta_tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=512)

        roberta_inputs = {k: v.to(self.device) for k, v in roberta_inputs.items()}
        deberta_inputs = {k: v.to(self.device) for k, v in deberta_inputs.items()}

        with torch.no_grad():
            roberta_logits = self.roberta_model(**roberta_inputs).logits.squeeze()
            deberta_logits = self.deberta_model(**deberta_inputs).logits.squeeze()

        avg_logits = (roberta_logits + deberta_logits) / 2
        prob = torch.sigmoid(avg_logits).item()
        prediction = "AI generated" if prob > 0.5 else "Human written"

        return {
            'prediction': prediction,
            'confidence': prob,
            'roberta_confidence': torch.sigmoid(roberta_logits).item(),
            'deberta_confidence': torch.sigmoid(deberta_logits).item()
        }

model = EnsembleInference(MODEL_PATH, device=DEVICE)

@text_bp.route('/')
def home():
    return jsonify({'message': 'Text API is running.'}), 200

@text_bp.route('/api/predict', methods=['POST'])
def api_predict():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'Text input is required'}), 400
    try:
        result = model.predict(data['text'])
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500
