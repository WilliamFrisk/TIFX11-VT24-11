from flask import Flask, request
from flask_socketio import SocketIO, emit
from model.inference import infere
import os
import argparse

MAX_BUFFER_SIZE = 1000 * 1000 * 1000  # 1 GB
no_inference = False

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['UPLOAD_FOLDER'] = 'uploads'
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000", max_http_buffer_size=MAX_BUFFER_SIZE)


@socketio.on('connect')
def handle_connect():
    print('Client connected:', request.sid)

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected:', request.sid)

@socketio.on('video_chunk')
def handle_video_chunk(data, filename):
    print('Received video chunk')
    local_filename = filename.replace('.mp4', '') + request.sid + '.mp4'
    with open(local_filename, 'ab') as video_file:
        video_file.write(data)

@socketio.on('end_video_transfer')
def handle_end_video_transfer(filename):
    print('End video transfer')
    global no_inference 
    print('Video transfer complete')
    sid = request.sid
    local_filename = filename.replace('.mp4', '') + request.sid + '.mp4'
    print(local_filename)
    if os.path.exists(local_filename):
        try: 
            if no_inference:
                print('No inference')
                additional_data = {
                    "left_knee": 2,
                    'right_knee': 3.3,
                    'left_elbow': 2.10,
                    'right_elbow': 1,
                    'left_hip': 23,                   
                    'right_hip': 93.46
                    }
            else: 
                additional_data = infere(local_filename)

            with open('results/' + local_filename, 'rb') as video_file:
                video_data = video_file.read()
                
                payload = {'video_data': video_data, 'additional_data': additional_data}
                print('Sending results')
                emit('video_saved', payload, room=sid)
        finally:
            os.remove(local_filename)
    else:
        emit('file_not_found', filename, room=sid)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--no-inference', action='store_true', help='Disable ML inference')
    parser.add_argument('--debug', action='store_true', help='Enable debug mode')
    args = parser.parse_args()

    if args.no_inference:
        no_inference = True

    socketio.run(app, debug=args.debug)
