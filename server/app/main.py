from flask import Flask
from flask_restful import Api
from api.views import *

app = Flask(__name__)
api = Api(app)

api.add_resource(DefaultEndpoint, '/api/')
api.add_resource(FileUploadEndpoint, '/api/upload')

if __name__ == '__main__':
    app.run(debug=True)
