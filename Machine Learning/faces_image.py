# -*- coding: utf-8 -*-
"""
Created on Sat Oct 24 02:54:14 2020

@author: Anubhav Sharma
"""

import face_recognition
import argparse
import pickle
import cv2
import matplotlib.pyplot as plt
# construct the argument parser and parse the arguments
# ap = argparse.ArgumentParser()
# ap.add_argument("-e", "--encodings", type=str,default="encodings.pickle",
# 	help="path to serialized db of facial encodings")
# ap.add_argument("-i", "--image", required=True,
# 	help="path to input image")
# ap.add_argument("-d", "--detection-method", type=str, default="hog",
# 	help="face detection model to use: either `hog` or `cnn`")
# args = vars(ap.parse_args())

dencodings = "encodings.pickle"

detection_method = "hog"


def fun(img_location):

    # load the known faces and embeddings
    print("[INFO] loading encodings...")
    data = pickle.loads(open(dencodings, "rb").read())

    # load the input image and convert it from BGR to RGB
    image = cv2.imread(img_location)
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    # detect the (x, y)-coordinates of the bounding boxes corresponding
    # to each face in the input image, then compute the facial embeddings
    # for each face
    print("[INFO] recognizing faces...")
    boxes = face_recognition.face_locations(rgb,
                                            model=detection_method)
    encodings = face_recognition.face_encodings(rgb, boxes)
    # initialize the list of names for each face detected
    names = {}
    for f in data["names"]:
        names[f] = 0
    # loop over the facial embeddings
    i = 0
    namevsper = {}
    # dictionary to hold final name vs percentage of match
    for encoding in encodings:
        # attempt to match each face in the input image to our known
        # encodings

        percents = face_recognition.face_distance(data["encodings"],
                                                  encoding)
        # Found euclidean distance from the faces
        for i in range(0, len(percents)):
            names[data["names"][i]] = names[data["names"][i]] + percents[i]
            # Added them to correspsonding names, now names contain their distances from face
        max_dist = -1
        # Calculating percentage of match based on least matching category
        for n in names:
            max_dist = max(max_dist, names[n])

        for n in names:
            namevsper[n] = ((max_dist-names[n])/max_dist)*100

        print(namevsper)
    # for ((top, right, bottom, left), name) in zip(boxes, namevsper):
    # 	# draw the predicted face name on the image
    # 	cv2.rectangle(image, (left, top), (right, bottom), (0, 255, 0), 2)
    # 	y = top - 15 if top - 15 > 15 else top + 15
    # show the output image and bar graph of percentage matches

    # plt.bar(namevsper.keys(),namevsper.values())

    # cv2.imshow("Image", image)
    # plt.show()
    # cv2.waitKey(0);
    return namevsper
