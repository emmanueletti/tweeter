/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  user: {
    name: 'Newton',
    avatars: 'https://i.imgur.com/73hZDYK.png',
    handle: '@SirIsaac',
  },
  content: {
    text: 'If I have seen further it is by standing on the shoulders of giants',
  },
  created_at: 1461116232227,
};

// returns html markup for an individual tweet
const createTweetElement = (data) => {
  return `
    <article class="tweet-card">
          <header class="tweet-card__header">
            <div class="header__avatar">
              <div class="avatar__icon">
                <img src="${data.user.avatars}" alt="" />
              </div>
              <h3 class="avatar__name">${data.user.name}</h3>
            </div>
            <h3 class="header__handle">${data.user.handle}</h3>
          </header>
          <p class="tweet-card__body">${data.content.text}</p>
          <hr />
          <footer class="tweet-card__footer">
            <p class="footer__date-created">${data.created_at}</p>
            <div class="footer__social-icons">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
  `;
};

$(document).ready(() => {
  const $tweet = createTweetElement(tweetData);

  $('#tweets-container').append($tweet);

  console.log($('.footer__date-created'));

  $('.footer__date-created').each((index, el) => {
    let time = $(el).text();
    $(el).text(timeago.format(time));
  });
});
