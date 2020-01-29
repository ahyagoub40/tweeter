/* eslint-disable no-undef */
jQuery(function($) {
  $(".new-tweet").keypress(function() {
    $(".counter").text(function() {
      return 140 - $("textarea").val().length;
    });
    if ($(".counter").val() < 0) {
      $(".counter").css('color', 'red');
    }
  });
});
