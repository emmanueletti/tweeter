$(document).ready(() => {
  // when user starts to scroll:
  //  show button to scroll back to the top of the page
  //  remove button to compose new tweet
  $(window).on('scroll', function () {
    const userAtTop = $(this).scrollTop() === 0;
    const $scrollBtn = $('.scroll-btn');
    const $composeBtn = $('.nav__compose-btn');
    if (!userAtTop) {
      $scrollBtn.removeClass('hidden');
      $composeBtn.addClass('hidden');
      return;
    }
    $scrollBtn.addClass('hidden');
    $composeBtn.removeClass('hidden');
  });

  // on click: scroll to page top, show tweet form, and focus on textarea
  $('.scroll-btn').on('click', function () {
    $(window).scrollTop(0);
    $('.new-tweet').show('slow');
    $('#tweet-text').focus();
  });
});
