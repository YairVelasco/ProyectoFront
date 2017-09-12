
var $movies = $('#movies');
$(function(){
    $.ajax({
    type: 'GET',
    url: 'http://api.tvmaze.com/shows',
    success: function(movies){
      $.each(movies, function(i,movie){
        $movies.append('<li>Nombre' +movie.name+ '</li>');
      });
    }
  });


});
