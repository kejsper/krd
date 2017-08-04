$(document).ready( () => {
  // Urls for API
  var getSumUrl = 'http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetDebtsCount';
  var getTopDebts = 'http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetTopDebts';
  var getFilteredDebts = 'http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetFilteredDebts';

  var link;

  // sum of all cases
  $.get(getSumUrl, function(data) {
    $('.header__sum').html(data);
  });

  // top10 debts
  $.get(getTopDebts, function (data) {
    var dataSorted = data.sort( function (a,b) {
      return b.Value - a.Value;
    });
    dataToHtml(dataSorted);
  });

  // Data from API to html
  function dataToHtml(data) {
    $('.content__data').html('');
    $.each(data, function(key, value) {
      var htmledData = `
      <div class="content__row" data-div="#collapse${value.Id}">
        <div class="row" role="tab" id="heading${value.Id}">
          <div class="col-5"><p class="content__p">dłużnik</p><p class="content__value">${value.Name}</p></div>
          <div class="col-3"><p class="content__p">nip</p><p class="content__value">${value.NIP}</p></div>
          <div class="col-2"><p class="content__p">kwota zadłużenia</p><p class="content__value">${value.Value}</p></div>
          <div class="col-2">
            <a href="#" class="content__link" data-link="#collapse${value.Id}">
            więcej
            </a>
          </div>
        </div>
        <div id="collapse${value.Id}" class="row content__hidden">
          <div class="col-5"><p class="content__p">adres</p><p class="content__value content__value--more">${value.Address}</p></div>
          <div class="col-3"><p class="content__p">typ dokumentu</p><p class="content__value content__value--more">${value.DocumentType}</p></div>
          <div class="col-2"><p class="content__p">cena zadłużenia</p><p class="content__value content__value--more">${value.Price}</p></div>
          <div class="col-2"><p class="content__p">numer</p><p class="content__value content__value--more">${value.Number}</p></div>
        </div>
      </div>
      `;
      $('.content__data').append(htmledData);
      //$('.content__data').append(hiddenData);
    });
  }

  // accordion

  $('body').on('click', '.content__link', function() {
    that = $(this);
    link = $(this).data('link');

    if (! $(link).hasClass('content__hidden--not')) {

      that.html('mniej');
      // changing background color for wrapper
      $('[data-div]').removeClass('content__row--shadow');
      $(`[data-div = "${link}"]`).addClass('content__row--shadow');
      // showing additional info
      $('#accordion').find('.content__hidden--not').removeClass('content__hidden--not');
      $(link).addClass('content__hidden--not');
      // showing hints
      $('#accordion').find('.content__p--show').removeClass('content__p--show');
      $(`[data-div = "${link}"]`).find('.content__p').addClass('content__p--show');

    } else {
      that.html('więcej');
      $(`[data-div = "${link}"]`).find('.content__p--show').removeClass('content__p--show');
      $(`[data-div = "${link}"]`).removeClass('content__row--shadow');
      $('#accordion').find('.content__hidden--not').removeClass('content__hidden--not');
    }
  });



});
