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

@socketio.on("fileupload", namespace='/test')
def handle_file_upload(data, filename): 
    try:
        print('..........................................')

        video_file = data
        filename = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        with open(filename, 'wb') as f:
            f.write(video_file)
        
        additional_data = {
            'left_knee': '89',
            'right_knee': '90'
        }
        response = {
            'status': 'success',
            'message': 'File uploaded successfully',
            'additional_data': additional_data
        }
        print('File uploaded successfully')
        emit('result', response)
    except Exception as e:
        response = {
            'status': 'error',
            'message': str(e)
        }
        emit('error', response)

if __name__ == '__main__':
    socketio.run(app)
