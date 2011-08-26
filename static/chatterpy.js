/**
 * API for manipulating Chatterpy data.
 */


var send_msg_post = function(color, msg, callback) {
  $.post(base_url + '/post/', {color: color, message: msg}, callback, 'json');
}

var send_login = function(username, callback) {
  $.post(base_url + '/name/', {username: username}, callback, 'json');
}

var check_session_login = function(username, callback) {
  $.post(base_url + '/check/name/', {username: username}, callback, 'json');
}

var check_messages = function(last_message_id, callback) {
  $.get(base_url + '/check/messages/' + last_message_id, callback, 'json');
}

var get_people = function() {
  $.get(base_url + '/get_people',
        function(r) {
          
        }, 'json')
}

