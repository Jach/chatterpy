from flask import Module, jsonify
from flask import request, session, g, redirect, url_for, abort, render_template

admin = Module(__name__, url_prefix='/admin')

@admin.route('/')
def admin_index():
  return render_template('admin.html')

@admin.route('/login/', methods=['POST'])
def login():
  user = g.query_db('select id from admins where name = ? and password = ?',
      (request.form['username'], g.sha1(request.form['password'])), True)
  return jsonify({'success': (user is not None)})
