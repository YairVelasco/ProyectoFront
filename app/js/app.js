
var $movies = $('#movies');
var dataAjax = "";
$(function(){
    $.ajax({
    type: 'GET',
    async: false,
    url: 'http://api.tvmaze.com/shows',
    success: function(movies){
      dataAjax = movies;
      $.each(movies, function(i,movie){
        var movieTime = new Date(movie.premiered+" "+movie.schedule.time);
        //console.log(movieTime.getHours()+":"+(movieTime.getMinutes()+30));
        //$movies.append('<li>Nombre' +movie.name+ '</li>','<li>Nombre' +movie.image.medium+ '</li>' );
        $movies.append(`<li><p class="name">${movie.name}</p>
        <div>
          <a href= "${movie.officialSite}"><img src= "${movie.image.medium}"></a>
        </div>
        <div class= "info">Date: ${movie.premiered}<br>Rating: ★${movie.rating.average}</div>
        <div class= "summ">${movieTime}</div>
        `);
      });
    }
  });


});
