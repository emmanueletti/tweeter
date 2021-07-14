$(document).ready(() => {
  // input event on composer text field to update character counter
  $('#tweet-text').on('input', function () {
    const chars = $(this).val().length;
    const counter = $(this).next().children('.counter')[0];

    $(counter).text(`${140 - chars}`);
    const currentChar = $(counter).text();

    if (currentChar < 0) {
      $(counter).addClass('negative');
    } else {
      $(counter).removeClass('negative');
    }
  });

  // submit event on form to make post request to create a new tweet followed by get reqeust to re-render page with new post
  const $form = $('#create-tweet');
  $form.submit(function (event) {
    event.preventDefault();

    const chars = $('#tweet-text').val();
    const emptyAlert = $('#alert--empty');
    const tooLongAlert = $('#alert--long');

    // validate input data
    if (chars.length > 140) {
      emptyAlert.slideUp();
      tooLongAlert.slideDown();
      return;
    }
    if (!chars) {
      tooLongAlert.slideUp();
      emptyAlert.slideDown();
      return;
    }

    // hide alerts and reset char counter
    tooLongAlert.slideUp();
    emptyAlert.slideUp();
    $('.counter').val(140);

    // make posts requests and re-render page with newest tweets
    const data = $($form).serialize();
    $.post('/tweets', data, function () {
      loadNewestTweets();
      $('#tweet-text').val('').focus();
    });
  });
});
