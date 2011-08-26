/**
 * Functions providing UI responses to user events.
 * Any code dependent on DOM elements should go in here.
 */


/**
 * Try logging in the user.
 */
var login_chat = function(ev) {
  ev.preventDefault();
  $('#loginerror').hide();
  send_login($('#loginusername').val(), function(r) {
    if (r.success) {
      session_username = $('#loginusername').val()
      $('#username').html(session_username)
      $('#loginboxbackground').fadeOut('slow')
      $('#loginbox').fadeOut('slow')
      start_chat();
    } else {
      $('#loginerror').show()
    }
  });
}

/**
 * Tries logging in a user whose session is still valid but may have left
 * the chat.
 */
var session_login = function() {
  check_session_login(session_username, function(r) {
    if (r.success) {
      $('#username').html(session_username)
      send_login(session_username, null);
      start_chat();
    } else {
      login_prompt();
    }
  });
}

/**
 * Send chat message.
 */
var post_message = function(ev) {
  ev.preventDefault();
  send_post($('#fontcolor').val(), $('#messagetext').val(), function(r) {
    if (r.success) { // clear out box, fetch message back.
      $('#messagetext').val('');
      check_messages(true);
    } else {
      alert('Message not sent!');
    }
  });
}

