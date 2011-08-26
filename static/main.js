
/**
 * Binds DOM elements to chatterpy UI pieces.
 */
var setup_ui = function() {
  $('#loginsubmit').click(login_chat);
  $('#sendformsubmit').click(post_message);
  $('#togglepicker').click(function(ev) {
      $('#colorpickerholder').toggle(500);
      $('html,body').animate({scrollTop: $('#togglepicker').offset().top}, 510);
  });

  $('#sendformsubmit').height($('#messagetextholder').height());

  $('#colorpickerholder').hide();
  $('#colorpicker').farbtastic('#fontcolor');
}

$(function () {
  setup_ui();
  session_login();
});

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


var start_chat = function() {
  /* get last N messages */
  check_messages(true)

  window.setInterval(function() {check_messages(false);}, update_interval);
  //window.setInterval(get_people, update_interval);
}


var get_people = function() {
  $.get(base_url + '/get_people',
        function(r) {
          
        }, 'json')
}

var last_message_id = 0
var check_messages = function(force_scroll) {
  $.get(base_url + '/check/messages/' + last_message_id,
    function(r) {
      var should_scroll = force_scroll ||
        $('#messagebox')[0].scrollHeight == $('#messagebox').scrollTop()
      $.each(r.messages, add_message)
      if (should_scroll) {
        $('#messagebox').scrollTop($('#messagebox')[0].scrollHeight)
      }
    }, 'json')
}

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

