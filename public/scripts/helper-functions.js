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
      <span id="avatar-name">
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
        <p id="tweet-icons">
        <i class="fas fa-thumbs-up"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-flag"></i>
        </p>
      </footer>
    </article>
  </container>
  `;
  return markup;
};
const renderTweets = function(arrayOfTweets) {
  $('#tweets-container').empty();
  arrayOfTweets.forEach((tweetObject) => {
    const $tweet = createTweetElement(tweetObject);
    $('#tweets-container').prepend($tweet);
  });
};

const clearTextarea = function() {
  $("textarea").val("");
};
const resetCounter = function() {
  $(".counter").text("140");
};

