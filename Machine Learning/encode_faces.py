# -*- coding: utf-8 -*-
"""
Created on Tue Oct 20 18:39:29 2020

@author: Anubhav Sharma
"""

from imutils import paths
import face_recognition
import argparse
import pickle
import cv2
import os

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--dataset",type=str,default="dataset",
	help="path to input directory of faces + images")
ap.add_argument("-e", "--encodings",type=str,default="encodings.pickle",
	help="path to serialized db of facial encodings")
ap.add_argument("-d", "--detection-method", type=str, default="hog",
	help="face detection model to use: either `hog` or `cnn`")
args = vars(ap.parse_args())
print("[INFO] quantifying faces...")
imagePaths = list(paths.list_images(args["dataset"]))
# initialize the list of known encodings and known names
knownEncodings = []
knownNames = []
for (i, imagePath) in enumerate(imagePaths):
	# extract the person name from the image path
    print("[INFO] processing image {}/{}".format(i + 1,
		len(imagePaths)))
    name = imagePath.split(os.path.sep)[-2]
    print(name)
	# load the input image and convert it from BGR (OpenCV ordering)
	# to dlib ordering (RGB)
    image = cv2.imread(imagePath)
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    boxes = face_recognition.face_locations(rgb,model=args["detection_method"])
	# compute the facial embedding for the face
    encodings = face_recognition.face_encodings(rgb, boxes)
	# loop over the encodings
    for encoding in encodings:
		# add each encoding + name to our set of known names and
		# encodings
        knownEncodings.append(encoding)
        knownNames.append(name)
        
print("[INFO] serializing encodings...")

data = {"encodings": knownEncodings, "names": knownNames}
f = open(args["encodings"], "wb")
f.write(pickle.dumps(data))
f.close()