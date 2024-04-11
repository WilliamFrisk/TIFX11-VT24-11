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
        with open(os.path.join(save_dir, 'video.mp4'), 'wb') as f:
            f.write(file_data)
        time.sleep(15)
        mook = {
            
        }
        # Send a success message to the client
        ws.send('Video file received successfully.')
    except Exception as e:
        # Send an error message to the client if an exception occurs
        ws.error(str(e))

if __name__ == "__main__":
    app.run()
