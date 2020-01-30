/* eslint-disable no-undef */
jQuery(function($) {
  $(".new-tweet").on("input", function() {
    const $textareaLength = $("textarea").val().length;
    $(".counter").text(function() {
      return 140 - $textareaLength;
    });
    if ($textareaLength > 140) {
      $(".counter").css('color', 'red');
    }
    if ($textareaLength < 140) {
      $(".counter").css('color', 'black');
    }
  });
  $(".fas.fa-angle-double-down").on("click", function() {
    $("#create-tweet").slideToggle("slow");
  });
});
