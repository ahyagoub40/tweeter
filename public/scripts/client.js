/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* eslint-disable no-undef */

jQuery(function($) {
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: '/tweets',
      success: function(arrayOfTweets) {
        renderTweets(arrayOfTweets);
      }
    });
  };
  loadTweets();
  $("#create-tweet").submit(function(event) {
    event.preventDefault();
    const $textLength = $("textarea").val().length;
    const spaceOnly = $("textarea").val().trim().length;
    $('.error').fadeOut();
    if (spaceOnly  === 0) {
      $('.error').text("no message entered");
      $('.error').fadeIn("slow");
      return;
    } else if ($textLength > 140) {
      $('.error').text("message entered is too long");
      $('.error').fadeIn("slow");
      return;
    }
    $.ajax({
      method: "POST",
      url: '/tweets',
      data: $(this).serialize(),
      success: function() {
        loadTweets();
        clearTextarea();
        resetCounter();
      },
    });
  });
});
