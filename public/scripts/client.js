/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  },
];

// escapes potentially malicious user input
const sanitize = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
          <p class="tweet-card__body">${sanitize(data.content.text)}</p>
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

const renderTweets = (data) => {
  // loop throw each tweet in array of tweets
  data.forEach((tweetData) => {
    // create tweet card markup from each tweet
    const tweet = createTweetElement(tweetData);

    // add each tweet card markup to page
    $('#tweets-container').prepend(tweet);

    // format the created time
    $('.footer__date-created').each((index, el) => {
      const $time = $(el).text();
      $(el).text(timeago.format($time));
    });
  });
};

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    type: 'get',
    success: function (data) {
      renderTweets(data);
    },
  });
};

const loadNewestTweets = () => {
  $.ajax({
    url: '/tweets',
    type: 'get',
    success: function (data) {
      const newestTweet = data[data.length - 1];

      renderTweets([newestTweet]);
    },
  });
};

$(document).ready(() => {
  // initiality load all the tweets from server
  loadTweets();

  // create new tweets event handler
  const $form = $('#create-tweet')[0];
  $($form).submit(function (event) {
    event.preventDefault();
    // validate form data
    const chars = $('#tweet-text').val();

    if (chars.length > 140) {
      $('#alert--long').slideDown();
      return;
    }
    if (!chars) {
      $('#alert--empty').slideDown();
      return;
    }

    $('#alert--long').slideUp();
    $('#alert--empty').slideUp();

    $.ajax({
      url: '/tweets',
      type: 'post',
      data: $($form).serialize(),
      success: function (data) {
        loadNewestTweets();
      },
    });
  });
});
