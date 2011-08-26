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
      $('#loginbox').fadeOut('slow', start_chat)
      start_chat()
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
 * Simple login window.
 */
var login_prompt = function() {
  $('#loginerror').hide()
  $('#loginboxbackground').css({'opacity': '0.5'})
  $('#loginboxbackground').fadeIn('slow')
  $('#loginbox').fadeIn('slow')
  // center:
  var win_w = document.documentElement.clientWidth
  var win_h = document.documentElement.clientHeight
  var log_h = $('#loginbox').height()
  var log_w = $('#loginbox').width()
  $('#loginbox').css({'position': 'absolute',
      'top': win_h / 2 - log_h / 2,
      'left': win_w / 2 - log_w / 2
  })
  $('loginboxbackground').css({'height': win_h})
}


var last_message_id = 0;

/**
 * Starts timers for message checking, grabs recent history.
 */
var start_chat = function() {
  /* get last N messages */
  check_messages(last_message_id, function(r) { add_new_messages(r, true); });

  window.setInterval(function() {
    check_messages(last_message_id, function(r){ add_new_messages(r, false); });
  }, update_interval);
  //window.setInterval(get_people, update_interval);
}


/**
 * Send chat message.
 */
var post_message = function(ev) {
  ev.preventDefault();
  send_msg_post($('#fontcolor').val(), $('#messagetext').val(), function(r) {
    if (r.success) { // clear out box, fetch message back.
      $('#messagetext').val('');
      check_messages(last_message_id, function(r) { add_new_messages(r, true); });
    } else {
      alert('Message not sent!');
    }
  });
}

/**
 * Adds each of new messages to chatbox.
 */
var add_new_messages = function(r, force_scroll) {
  var should_scroll = force_scroll ||
    ($('#messagebox')[0].scrollHeight - $('#messagebox').scrollTop() ==
     $('#messagebox').outerHeight());
  $.each(r.messages, add_message)
  if (should_scroll) {
    scroll();
  }
};

/**
 * Scrolls messagebox to bottom.
 */
var scroll = function() {
  $('#messagebox').scrollTop($('#messagebox')[0].scrollHeight);
}

/**
 * Adds individual message with formatting to chatbox.
 */
var add_message = function(idx, value) {
  var col = value.color
  var msg = value.message
  var spk = value.speaker
  last_message_id = value.id

  var html = '<div style="color: ' + col + '" class="message">' + 
  '<span style="font-weight: bolder; color: black;"> ' + spk + ': </span>' +
  msg + '</div>\n'
  //if (value.id != ignore_id) {
    $('#messagebox').append(html)
  //}
}
