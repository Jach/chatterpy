
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

