#!/usr/bin/env python2.6
# note it's 2.7 on server.
import sqlite3
from hashlib import sha1
from flask import Flask, request, session, g, redirect, url_for, abort
from contextlib import closing

from views.admin import admin
from views.client import client

from config import *

app = Flask(__name__)
app.config.from_object(__name__)
app.register_module(admin)
app.register_module(client)

def connect_db():
  return sqlite3.connect(app.config['DATABASE'])

def init_db():
  with closing(connect_db()) as db:
    with app.open_resource('schema.sql') as f:
      db.cursor().executescript(f.read())
    db.commit()
    p = sha1('').hexdigest()
    db.cursor().execute('insert into admins (name, password) values (?, ?)',
        ('admin', p))
    db.commit()
    with open('config.py', 'a') as f:
      f.write('DB_HAS_LOADED = True\n')

if 'DB_HAS_LOADED' not in globals() or not DB_HAS_LOADED:
  print 'Loading initial database...'
  init_db()

@app.before_request
def before_request():
  g.db = connect_db()
  g.query_db = query_db
  g.sha1 = lambda x: sha1(x).hexdigest()

@app.after_request
def after_request(response):
  g.db.close()
  return response

def query_db(query, args=(), one=False):
  cur = g.db.execute(query, args)
  rv = [dict((cur.description[idx][0], value)
             for idx, value in enumerate(row)) for row in cur.fetchall()]
  return (rv[0] if rv else None) if one else rv

if __name__ == '__main__':
  if DEBUG:
    app.run()
  else:
    app.run(host='0.0.0.0')
