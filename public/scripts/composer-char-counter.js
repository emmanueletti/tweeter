'use strict';

$(document).ready(() => {
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
});
