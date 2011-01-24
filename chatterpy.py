#!/usr/bin/env python
from flask import Flask, request, session, g, redirect, url_for, abort
from contextlib import closing

from views.admin import admin
from views.client import client

from config import *

app = Flask(__name__)
app.config.from_object(__name__)
app.register_module(admin)
app.register_module(client)

def 
