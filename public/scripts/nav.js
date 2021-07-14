$(document).ready(() => {
  // compose button
  $('.nav__compose-btn').on('click', function () {
    $('.new-tweet').toggle('slow');
    $('#tweet-text').focus();
  });
});
