
#from server.utils import calculate
import os
import json
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
app = Flask(__name__)
socketio = SocketIO(app)
CORS(app, origins=['*'])

@app.route('/',methods=['GET'])
def index():
    return jsonify({'message': 'Hello, World!'})


@socketio.on('connect')
def handle_connect():
    print('Client connected')


@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # Get the uploaded file
        uploaded_file = request.files.get('file')
        if uploaded_file:
            # Validate file type (optional, adjust as needed)
            if uploaded_file.mimetype != 'application/json':
                return jsonify({'error': 'Invalid file format. Please upload a JSON file.'}), 400

            # Read the file content (assuming saved)
            with open(filename, 'r') as f:
                data = json.load(f)
            socketio.emit('calculate', data, namespace='/calculate')

            return jsonify({'message': 'File uploaded successfully.'})
        else:
            return jsonify({'error': 'No file uploaded.'}), 400
    else:
        return jsonify({'error': 'Method not allowed.'}), 405

@socketio.on('calculation_result', namespace='/calculate')
def handle_calculation_result(data):
    # Process the calculation result (e.g., display on the client)
    print(f'Calculation result: {data}')
    emit('calculation_done', data, namespace='/calculate')  # Broadcast to all connected clients

@socketio.on('file')
def handle_file(data):
    # Process the uploaded file data (e.g., filename, fileData)
    print(f"Received file: {data['fileName']}")
    # ... your logic to handle the file data ...
    socketio.emit('result', processed_data, namespace='/')  # Send processed results to client

    # Consider returning an acknowledgement to the client
    # emit('file_received', {'message': 'File received successfully.'})
    
if __name__ == '__main__':
    socketio.run(app, debug=True)
