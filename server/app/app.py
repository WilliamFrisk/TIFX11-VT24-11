from flask import Flask,render_template,request
from flask_socketio import SocketIO, emit
import subprocess
import os

MAX_BUFFER_SIZE = 1000 * 1000 * 1000  # 50 MB
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['UPLOAD_FOLDER'] = 'uploads'
socketio = SocketIO(app,debug=True,cors_allowed_origins='*',async_mode='eventlet', max_http_buffer_size=MAX_BUFFER_SIZE)


@socketio.on('connect')
def handle_connect():
    print('Client connected:', request.sid)

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected:', request.sid)

@socketio.on('video_chunk')
def handle_video_chunk(data, filename):
    print('Received video chunk')
    with open(filename, 'ab') as video_file:
        video_file.write(data)

@socketio.on('end_video_transfer')
def handle_end_video_transfer(filename):
    sid = request.sid
    if os.path.exists(filename):
        with open('output.mp4', 'rb') as video_file:
            video_data = video_file.read()
            additional_data = {
            'left_knee': '89',
            'right_knee': '88',
            'left_elbow': '83',
            'right_elbow': '86'
            }
            payload = {'video_data': video_data, 'additional_data': additional_data}
            emit('video_saved', payload, room=sid)
    else:
        emit('file_not_found', filename, room=sid)

if __name__ == '__main__':
    socketio.run(app, debug=True)
