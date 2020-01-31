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
    validInput();
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