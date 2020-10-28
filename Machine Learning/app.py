import os
import sys
from flask import Flask, render_template, request, abort
from werkzeug.utils import secure_filename
import faces_image
import requests

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.getcwd()


@app.route('/')
def home():
    response = requests.get("https://firebasestorage.googleapis.com/v0/b/dressify-59ab5.appspot.com/o/images%2Fhr.jpeg?alt=media&token=98919f66-2a0b-4252-bf8f-cc0bc8d3e554")
    print(response.headers['content-type'], file= sys.stderr)
    s=response.headers['content-type']
    rex=s.split('/')[1]
    print(rex, file=sys.stderr)
    file = open("sample_image."+rex, "wb")
    file.write(response.content)
    return render_template('index.html')


@app.route('/uploader', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.json
        print (f['url'], file=sys.stderr)
        response = requests.get(f['url'])
        print(response.headers['content-type'], file= sys.stderr)
        s=response.headers['content-type']
        rex=s.split('/')[1]
        print(rex, file=sys.stderr)
        file = open("sample_image."+rex, "wb")
        file.write(response.content)
        filename="sample_image."+rex
        return faces_image.fun(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # if f.filename == '':
        #     return {
        #         "error": "submit a document damnit"
        #     }
        # # val httpsReference = storage.getReferenceFromUrl("https://firebasestorage.googleapis.com/v0/b/dressify-59ab5.appspot.com/o/images%2Fhr.jpeg?alt=media&token=8af7c852-bd05-4dc1-845a-280fbde0b7ae")  
        # # response = requests.get("https://firebasestorage.googleapis.com/v0/b/dressify-59ab5.appspot.com/o/images%2Fhr.jpeg?alt=media&token=98919f66-2a0b-4252-bf8f-cc0bc8d3e554")
        # # print(response, file = sys.stderr)
        # print("hello world", file=sys.stderr)
        
        # filename = secure_filename(f.filename)
        # f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # return faces_image.fun(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        


if __name__ == '__main__':
    app.run(debug=True)
