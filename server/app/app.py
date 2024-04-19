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
def handle_video_chunk(data):
    print('Received video chunk')
    with open('received_video5.mp4', 'ab') as video_file:
        video_file.write(data)

@socketio.on('end_video_transfer')
def handle_end_video_transfer():
    print('Video transfer complete')
    emit('video_saved', 'Video has been saved to server.')

if __name__ == '__main__':
    socketio.run(app, debug=True)
