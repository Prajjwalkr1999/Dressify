import os
import sys
from flask import Flask, render_template, request, abort
from werkzeug.utils import secure_filename
from flask_cors import CORS
import faces_image
import requests

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.getcwd()
CORS(app)

@app.route('/uploader', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.json
        print (f['url'], file=sys.stderr)
        response = requests.get(f['url'])
        # print(response.headers['content-type'], file= sys.stderr)
        s=response.headers['content-type']
        rex=s.split('/')[1]
        # print(rex, file=sys.stderr)
        file = open("sample_image."+rex, "wb")
        file.write(response.content)
        filename="sample_image."+rex
        userData = faces_image.fun(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        os.remove(filename)
        return userData

if __name__ == '__main__':
    app.run(debug=True)
