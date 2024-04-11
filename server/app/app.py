import os
import json
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import time
# Consider using flask-limiter for rate limiting

app = Flask(__name__)

CORS(app, origins=['*'])
socketio = SocketIO(app,debug=True,cors_allowed_origins='*')
@app.route('/home')
def main():
    return jsonify({"message": "Hello, World!"})

@socketio.on("connect")
def handle_connect():
    print("Client connected")
    # Consider using rate limiting instead of delay
    time.sleep(10)
    result()
    emit("connected", {"message": "Welcome! You are now connected to the server."})

def result():
    print("Calculating...")
    # ... your logic to calculate the result ...
    emit("result", {"message": "Calculation completed."})
    
@socketio.on('file')
def handle_file(data):
    # Process the uploaded file data (e.g., filename, fileData)
    print(f"Received file: {data['fileName']}")
    # ... your logic to handle the file data (save, call calculate) ...
    socketio.emit('result', processed_data, namespace='/')  # Send processed results to client

    # Consider returning an acknowledgement to the client
    # emit('file_received', {'message': 'File received successfully.'})


if __name__ == '__main__':
    socketio.run(app, debug=True)
