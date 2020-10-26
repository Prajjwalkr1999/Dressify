import os
import sys
from flask import Flask, render_template, request, abort
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.getcwd()


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/uploader', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':

        f = request.files['file']
        if f.filename == '':
            return {
                "error": "submit a document damnit"
            }

        filename = secure_filename(f.filename)
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return "hello"


if __name__ == '__main__':
    app.run(debug=True)
