from flask import Flask, request, jsonify
from flask_cors import CORS 
app = Flask(__name__)
CORS(app)
import numpy as np
import librosa 
from tensorflow.keras.models import load_model




model = load_model('your_model_path')



@app.route("/")
def serve():
    configS = "Connected to server"
    data = {"message": configS}  
    resp = jsonify(data)
    resp.headers["Content-Type"] = "application/json"
    return resp

@app.route("/server")
def server():
    configS = "Connected to server"
    data = {"message": configS}  
    resp = jsonify(data)
    resp.headers["Content-Type"] = "application/json"
    return resp

@app.route('/predict', methods=['POST'])
def predict():
    # Receive audio file from the frontend
    audio_file = request.files['audio']
    
    # Save the audio file temporarily (you may want to save it to a specific location)
    temp_audio_path = 'temp_audio.wav'
    audio_file.save(temp_audio_path)
    
    # Preprocess the audio
    # You may need to adapt this preprocessing based on your model's requirements
    # Example: preprocess_audio(temp_audio_path)
    
    # Use your model to predict the category
    #predicted_category = predict_category(temp_audio_path)
    
    #return jsonify({'predicted_category': predicted_category})
    configS = "Connected to recording"
    data = {"message": configS}  
    resp = jsonify(data)
    resp.headers["Content-Type"] = "application/json"
    return resp

def preprocess_audio(audio_data):
    # Perform any necessary preprocessing on the audio data
    # For example, convert audio data to appropriate format for your model
    # Return the preprocessed data
    pass








# Route to handle audio prediction
@app.route('/flask', methods=['POST'])
def predict():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'})

    audio_file = request.files['audio']
    if audio_file.filename == '':
        return jsonify({'error': 'No selected audio file'})

    # Save the audio file temporarily
    temp_path = 'temp.wav'
    audio_file.save(temp_path)

    # Preprocess the audio data
    # Replace preprocess_audio with your actual preprocessing logic
    preprocessed_audio = preprocess_audio(temp_path)

    # Perform prediction using your model
    # Replace prediction logic with your actual prediction code
    prediction = model.predict(np.array([preprocessed_audio]))

    # Assuming your model outputs a class index, convert it to a label or result
    # Replace labels with your actual class labels
    labels = ['class1', 'class2', 'class3']  # Adjust based on your model
    predicted_label = labels[np.argmax(prediction)]

    # Clean up the temporary audio file
    os.remove(temp_path)

    return jsonify({'prediction': predicted_label})



if __name__ == "__main__":
    app.run(debug=True)
