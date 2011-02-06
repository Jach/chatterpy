from flask import Module, jsonify
from flask import request, session, g, redirect, url_for, abort, render_template
from flask import escape

client = Module(__name__, url_prefix='')

@client.route('/debug')
def debug():
  print g.query_db('select * from messages ')
  return 'hi'


@client.route('/')
def home():
  n = ''
  if 'username' in session:
    n = escape(session['username'])
  return render_template('index.html', name=n, base_url=g.BASE_URL,
      update_interval=g.UPDATE_INTERVAL*1000)

@client.route('/check/name/', methods=['POST'])
def check_name():
  '''Checks to see if a person claiming to be someone really is
  that someone.'''
  return jsonify({'success': ('username' in session and \
      session['username'] == request.form['username'])})# and \
      #name_available(request.form['username']))})

def name_available(name):
  '''Checks to see if no one active is using the name.'''
  user = g.query_db('select id from active_users where name = ?', (name,), True)
  return user is None

@client.route('/name/', methods=['POST'])
def set_name():
  if name_available(request.form['username']):
    q = "insert into active_users (name,last_active) VALUES (?,datetime('now'))"
    g.insert_db(q, (request.form['username'],))
    session['username'] = request.form['username']
    return jsonify({'success': True})
  else:
    return jsonify({'success': False})

@client.route('/check/messages/<int:last_id>', methods=['GET'])
def check_messages(last_id):
  '''get all messages after a sent 'id'.'''
  q = 'select id, color, speaker, message from messages where id > ?'
  messages = g.query_db(q, (last_id,))
  return jsonify({'messages': messages})

@client.route('/post/', methods=['POST'])
def post_message():
  if 'username' not in session:
    return jsonify({'success': False})
  q = '''insert into messages (color, speaker, message, sent_at) VALUES
        (?, ?, ?, datetime('now'))'''
  try:
    color = min(int(request.form['color'][1:], 16), 0xffffff)
  except ValueError:
    color = 0
  finally:
    color = hex(color)[2:] # chop off 0x
    # add leading 0's
    color = color if len(color) == 6 else '0'*(6-len(color)) + color
    # add leading #
    color = '#' + color
  g.insert_db(q, (color, escape(session['username']),
    escape(request.form['message'])))
  return jsonify({'success': True})
