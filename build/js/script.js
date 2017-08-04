$(document).ready( () => {
  // Urls for API
  var getSumUrl = 'http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetDebtsCount';
  var getTopDebts = 'http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetTopDebts';
  var getFilteredDebts = 'http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetFilteredDebts';

  var link;

  // sum of all cases
  $.get(getSumUrl, function(data) {
    $('.header__sum').html(data);
    console.log('Sum loaded')
  });

  // top10 debts
  $.get(getTopDebts, function (data) {
    dataToHtml(data);
  });

  // Data from API to html
  function dataToHtml(data) {
    $('.content__data').html('');
    $.each(data, function(key, value) {
      /*
      var htmledData = `<div class="content__item"><div id="heading${value.Id}" class="row" role="tab"><div class="col-5">${value.Name}</div>`;
      htmledData += `<div class="col-3">${value.NIP}</div>`;
      htmledData += `<div class="col-2">${value.Value}</div>`;
      htmledData += `<div class="col-2"><a data-toggle="collapse" data-parent="#accordion" href="#collapse${value.Id}" aria-expanded="true" aria-controls="collapse${value.Id}">więcej</a></div></div>`;
      htmledData += `<div id="collapse${value.Id}" class="row collapse" role="tabpanel" aria-labelledby="heading${value.Id}"><div class="col-5">${value.Address}</div>`;
      htmledData += `<div class="col-3">${value.DocumentType}</div>`;
      htmledData += `<div class="col-2">${value.Price}</div>`;
      htmledData += `<div class="col-2">${value.Number}</div></div></div>`;
      */
      var htmledData = `
      <div class="content__row">
        <div class="row" role="tab" id="heading${value.Id}">
          <div class="col-5">${value.Name}</div>
          <div class="col-3">${value.NIP}</div>
          <div class="col-2">${value.Value}</div>
          <div class="col-2">
            <a href="#collapse${value.Id}" class="content__link" data-link="#collapse${value.Id}">
            więcej
            </a>
          </div>
        </div>
        <div id="collapse${value.Id}" class="row content__hidden">
          <div class="col-5">${value.Address}</div>
          <div class="col-3">${value.DocumentType}</div>
          <div class="col-2">${value.Price}</div>
          <div class="col-2">${value.Number}</div>
        </div>
      </div>
      `;
      $('.content__data').append(htmledData);
      //$('.content__data').append(hiddenData);
    });
  }

  // accordion

  $('body').on('click', '.content__link', function() {
    link = $(this).data('link');

    if (! $(link).hasClass('content__hidden--not')) {
      console.log('nie ma');
      console.log(link);
      $('#accordion').find('.content__hidden--not').removeClass('content__hidden--not');
      $(link).addClass('content__hidden--not');
    } else {
      console.log('ma');
      $('#accordion').find('.content__hidden--not').removeClass('content__hidden--not');
    }
  });



});
