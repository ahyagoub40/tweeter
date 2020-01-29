/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* eslint-disable no-undef */

const tweetData  = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const tweetAge = function(oldDate) {
  const todaysDate = new Date();
  const tweetsDate = new Date(oldDate * 1000);
  const tweetAge = todaysDate.getDate() - tweetsDate.getDate();
  return tweetAge;
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
        <img src=${avatars}>
        <nav>${name}</nav>
      </span>
        <nav class="tweeterid">${handle}</nav>
      </header>
      <div class="tweetText">
        ${tweetArticle}
      </div>
      <footer>
        <p>${tweetDate} days ago</p>
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
      alert("no message entered");
    } else if ($textLength > 140) {
      alert("message entered is too long");
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
