#!/usr/bin/python2.7
import sys, os

r = '/home/jach/pyeggs/'
sys.path.insert(0, r + 'Flask-0.6.1-py2.7.egg')
sys.path.insert(0, r + 'Jinja2-2.5.5-py2.7.egg')
sys.path.insert(0, r + 'Werkzeug-0.6.2-py2.7.egg')

os.chdir('/home/jach/deploy/chatterpy')

from flup.server.fcgi import WSGIServer
from chatterpy import app
WSGIServer(app).run()
