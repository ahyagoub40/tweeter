/* eslint-disable no-undef */
jQuery(function($) {
  console.log("ready");
  $(".new-tweet").keypress(function() {
    console.log(this);
    $(".counter").html(function(i, val) {
      return val * 1 - 1;
    });
    $(".counter:contains('-')").css('color', 'red');
  });
  $("article").hover(function() {
    $("#tweeterid").toggle();
  });
});