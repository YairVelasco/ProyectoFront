
var $movies = $('#movies');
$(function(){
    $.ajax({
    type: 'GET',
    url: 'http://api.tvmaze.com/shows',
    success: function(movies){
      $.each(movies, function(i,movie){
        //$movies.append('<li>Nombre' +movie.name+ '</li>','<li>Nombre' +movie.image.medium+ '</li>' );
        $movies.append(`<li><h3 id="name">${movie.name}</h3><div><img src= "${movie.image.medium}"></div></li>`);
      });
    }
  });


});
