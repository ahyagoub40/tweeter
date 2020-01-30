/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* eslint-disable no-undef */


const tweetAge = function(oldDate) {
  const todaysDate = new Date();
  const tweetsDate = new Date(oldDate);
  const tweetAge = todaysDate.getDate() - tweetsDate.getDate();
  return tweetAge;
};
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const createTweetElement = function(tweetObject) {
  const tweetArticle = tweetObject["content"]["text"];
  const name = tweetObject["user"]["name"];
  const handle = tweetObject["user"]["handle"];
  const avatars = tweetObject["user"]["avatars"];
  const tweetDate = tweetAge(tweetObject["created_at"]);
  const markup = `
  <container>
    <article>
      <header>
      <span>
        <img src=${escape(avatars)}>
        <nav>${escape(name)}</nav>
      </span>
        <nav class="tweeterid">${escape(handle)}</nav>
      </header>
      <div class="tweetText">
        ${escape(tweetArticle)}
      </div>
      <footer>
        <p>${escape(tweetDate)} days ago</p>
        <p>comments</p>
      </footer>
    </article>
  </container>
  `;
  return markup;
};

jQuery(function($) {
  const renderTweets = function(arrayOfTweets) {
    $('#tweets-container').empty();
    arrayOfTweets.forEach((tweetObject) => {
      const $tweet = createTweetElement(tweetObject);
      $('#tweets-container').prepend($tweet);
    });
  };
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
    if ($textLength === 0) {
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
      },
    });
  });
});
