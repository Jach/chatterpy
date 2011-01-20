from tornad_io import SocketIOHandler
participants = set()

"""implement logging via https://github.com/alee/SocketTornad.IO/commit/d2b35a8cd125bff41826685f2eef517867134980"""
class ChatHandler(SocketIOHandler):
  def on_open(self, *args, **kwargs):
    self.send("Welcome!")
    participants.add(self)

  def on_message(self, message):
    for p in participants:
      p.send(message)

  def on_close(self):
    participants.remove(self)
    for p in participants:
      p.send("A user has left.")


