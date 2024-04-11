import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import time
from flask_sock import Sock
# Consider using flask-limiter for rate limiting

app = Flask(__name__)
sock = Sock(app)
CORS(app, origins=['*'])

ALLOWED_EXTENSIONS = {'mp4'} # add allowed file extensions here 
UPLOAD_DIRECTORY = 'app/temp/'
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/home')
def main():
    return jsonify({"message": "Hello, World!"})

def ensure_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

@sock.route('/fileupload')
def file_upload(ws):
    try:
        # Receive the video file data
        file_data = ws.receive()
        save_dir = 'uploads'
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)

        # Save the video file to the server
        file_path = os.path.join(save_dir, 'video.mp4')
        with open(file_path, 'wb') as f:
            f.write(file_data)

        # Convert the file data to base64 for transmission
        with open(file_path, 'rb') as f:
            file_content_base64 = base64.b64encode(f.read()).decode('utf-8')

        # Prepare additional data
        additional_data = {
            'left_knee': '89',
            'right_knee': '88',
            'left_elbow': '83',
            'right_elbow': '86'
        }

        # Prepare JSON response with both file content and additional data
        response_data = {
            'status': 'success',
            'message': 'File and additional data received',
            'file_content': file_content_base64,
            'additional_data': additional_data
        }

        # Send JSON response back to the client
        ws.send(json.dumps(response_data))
    except Exception as e:
        # Send an error message to the client if an exception occurs
        ws.error(str(e))

if __name__ == "__main__":
    app.run()
