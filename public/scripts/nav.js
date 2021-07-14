$(document).ready(() => {
  // click event on nav button to toggle tweet composer
  $('.nav__compose-btn').on('click', function () {
    $('.new-tweet').toggle('slow');
    $('#tweet-text').focus();
  });
});
