'use strict';

var $movies = $('#movies');
$(function () {
  $.ajax({
    type: 'GET',
    url: 'http://api.tvmaze.com/shows',
    success: function success(movies) {
      $.each(movies, function (i, movie) {
        //$movies.append('<li>Nombre' +movie.name+ '</li>','<li>Nombre' +movie.image.medium+ '</li>' );
        $movies.append('<li><p class="name">' + movie.name + '</p>\n        <div>\n          <a href= "' + movie.officialSite + '"><img src= "' + movie.image.medium + '"></a>\n        </div>\n        <div class= "info">Date: ' + movie.premiered + '<br>Rating: \u2605' + movie.rating.average + '</div>\n        <div class= "summ">' + movie.summary + '</div>\n        ');
      });
    }
  });
});