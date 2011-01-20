import tornado.web
from tornad_io import SocketIOServer

from ChatHandler import *

class IndexHandler(tornado.web.RequestHandler):
  def get(self):
    self.render("templates/index.html")

chat_route = ChatHandler.routes("socket.io/*")

application = tornado.web.Application(
    [(r"/", IndexHandler), chat_route], 
    enabled_protocols = ['websocket', 'flashsocket', 'xhr-multipart', 'xhr-polling', 'jsonp-polling'],
    flash_policy_port = 8043,
    flash_policy_file = '/etc/lighttpd/flashpolicy.xml',
    socket_io_port = 8888
)

if __name__ == '__main__':
    socketio_server = SocketIOServer(application)
