from flask import Flask
from flask import request, make_response, jsonify
from werkzeug.utils import secure_filename
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_cors import CORS


import os
import jwt
import math
import json
import hashlib
import datetime
import urllib.request

app = Flask(__name__, static_url_path='/static')
CORS(app)
app.config['MONGO_URI'] = "mongodb://localhost:27017/learn_mongo_2"
mongo = PyMongo(app)


def decoder():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    decode_data = jwt.decode(token_encoded, 'DC46ck91SPtz', algorithms='HS256')
    return decode_data


# Function to create a hash for password
def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    print(hash.hexdigest())
    return hash.hexdigest()


# Function to add Salt to the Password
def generate_salt():
    salt = os.urandom(16)
    print(salt.hex())
    return salt.hex()


# To Create New User
@app.route('/register', methods=['POST'])
def userCreate():
    user = {}
    user['username'] = request.json['username']
    password = request.json['password']
    user['gender'] = request.json['gender']
    user['email'] = request.json['email']
    user['created'] = datetime.datetime.now()
    user['salt'] = generate_salt()
    user['password_hash'] = md5_hash(user['salt'] + password)
    count = mongo.db.dogideotic.count({'email': user['email']})
    if count == 0:
         mongo.db.dogideotic.insert(user)
         return {"message": "User(s) Created"}
    else:
       return {"message": "Username Already Exists"}

# To Login to a particular User
@app.route('/login', methods=['POST'])
def userLogin():
    email = request.json['email']
    password = request.json['password']
    user = mongo.db.dogideotic.find({"email": email})
    if user[0]["email"] == email and md5_hash(user[0]["salt"] + password) == user[0]["password_hash"]:
        encode_data = jwt.encode(
            {'email': email}, 'DC46ck91SPtz', algorithm='HS256').decode('utf-8')
        return {"message": "Authentication Successful", "token": str(encode_data)}
    else:
        return jsonify({"message": "Incorrect Username or Password"})
