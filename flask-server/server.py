from flask import Flask, request, jsonify
from flask_cors import CORS 
app = Flask(__name__)
CORS(app)
import numpy as np
import librosa 
import pickle
import os



model = pickle.load(open('model.pkl','rb'))



@app.route("/")
def serve():
    configS = "Connected to server"
    data = {"message": configS}  
    resp = jsonify(data)
    flask_env = os.getenv('FLASK_ENV', 'development')
    print(flask_env) 
    resp.headers["Content-Type"] = "application/json"
    return resp

@app.route("/server")
def server():
    configS = "Connected to server"
    data = {"message": configS}  
    resp = jsonify(data)
    flask_env = os.getenv('FLASK_ENV', 'development')
    print(flask_env)
    resp.headers["Content-Type"] = "application/json"
    return resp

@app.route('/predict', methods=['POST'])
def predict():
    audio_file = request.files['audio']
    
    temp_audio_path = 'temp_audio.wav'
    audio_file.save(temp_audio_path)
 
    configS = "Connected to recording"
    data = {"message": configS}  
    resp = jsonify(data)
    resp.headers["Content-Type"] = "application/json"
    return resp









@app.route('/flask', methods=['POST'])
def flask():
    
    data = request.get_json()

    converted_file_path = data.get('convertedFileNamepath')
    audio_file = f'C:\\web projects\\al48-birdclef\\al48-birdclef\\express\\{converted_file_path}' 
    #audio_file = f'C:\\web projects\\al48-birdclef\\al48-birdclef\\express\\public\\pcok.wav' 
    flask_env = os.getenv('FLASK_ENV', 'development')
    print(flask_env)
    audio, sr = librosa.load(audio_file, sr=16000, mono=True)
    print(audio_file)
    threshold = 0.01  # Adjust the threshold value as needed
    audio_filtered = np.where(np.abs(audio) < threshold, 0, audio)
    target_length = 48000
    if len(audio_filtered) < target_length:
      pad_length = target_length - len(audio_filtered)
      audio_filtered = np.pad(audio_filtered, (0, pad_length), mode='constant')
    else:
      audio_filtered = audio_filtered[:target_length]

    spectrogram = librosa.feature.melspectrogram(y=audio_filtered, sr=sr, n_fft=4096, hop_length=1024, n_mels=128)
    spectrogram = librosa.power_to_db(spectrogram, ref=np.max)

    flattened_height_width = spectrogram.reshape(1 ,-1)

    print('Shape of spectrogram (2D):', flattened_height_width.shape)

    predicted_class = model.predict(flattened_height_width)
    print(predicted_class)
    predicted_class_list = list(predicted_class)

    categories = {0: 'not_bird', 1: 'peacock', 2: 'hen', 3: 'crow'}
    predicted_label = categories[predicted_class_list[0]]
     
    print(predicted_label)
    return jsonify({'predicted_class': predicted_label})

@app.route('/curDir')
def current_directory_path():
    current_path = os.getcwd() 
    return f'Current directory path: {current_path}'

if __name__ == "__main__":
     app.run(debug=False, use_reloader=False)
