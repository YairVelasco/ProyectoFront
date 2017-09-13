
var $movies = $('#movies'),
    dataAjax = "";
$(function(){
    $.ajax({
    type: 'GET',
    url: 'http://api.tvmaze.com/shows',
    success: function(movies){
      $.each(movies, function(i,movie){
        dataAjax = movies;
        var movieTime = new Date(movie.premiered+" "+movie.schedule.time);
        console.log(movieTime.getHours()+":"+(movieTime.getMinutes()+30));
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
