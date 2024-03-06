from flask_restful import Resource
import os
from flask import request
from flask_restful import Resource
from werkzeug.utils import secure_filename

class DefaultEndpoint(Resource):
    def get(self):
        return {'message': 'This is the default endpoint at /api/'}

ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv'} 

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class FileUploadEndpoint(Resource):
    def post(self):
        
        if 'file' not in request.files:
            return {'message': 'No file part in the request'}, 400
        if len(request.files.getlist('file')) > 1:
            return {'message': 'Only one file allowed'}, 
            

        file = request.files['file']

        if file.filename == '':
            return {'message': 'No selected file'}, 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            return {'message': 'File uploaded successfully', 'filename': filename}, 200
        
        return {'message': 'File type not allowed'}, 400

