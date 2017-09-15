
var $movies = $('#movies');
var dataAjax = "";
$(document).ready(function(){

    var petition = $.ajax({
      type: 'GET',
      async: false,
      url: 'http://api.tvmaze.com/shows',
      success: function(movies){dataAjax = movies;}
    });



  function printGrid(){
    //$movies.html("");
    $.each(dataAjax, function(i,movie){
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
  //Prints schedule in the index html
  function printSchedule(){
      $('#calendar').load('/views/kendo.html', function() {
        $movies.html("");
        //Fills the object array with the objects we need to print in the scheduler
            var shortMovies = new Array();
            for (var i = 0; i < dataAjax.length; i++) {
              //console.log(i);
              var movieTime = new Date(dataAjax[i].premiered+" "+dataAjax[i].schedule.time);   //
              shortMovies.push({title: dataAjax[i].name, image: dataAjax[i].image.medium, imdb: dataAjax[i].officialSite, start: new Date(dataAjax[i].premiered+" "+dataAjax[i].schedule.time), end: new Date(dataAjax[i].premiered+" "+(movieTime.getHours()+1+":"+(movieTime.getMinutes()+29)))}) ;
            }
            //Calls the ID scheduler and prints the scheduler on it
            $("#scheduler").kendoScheduler({
                date: new Date("2013/6/24"),
                startTime: new Date("2013/6/24 10:00"),
                endTime: new Date("2013/6/24 23:59"),
                height: 600,
                views: [
                    "day",
                    { type: "workWeek", selected: false },
                    {type: "week", selected: true },
                    "month",
                    "agenda",
                    { type: "timeline", eventHeight: 50}
                ],
                editable: true,
                eventTemplate: $("#event-template").html(),
                dataSource: shortMovies
            });
      });
    }

  console.log("ready");
  $.when(petition).done(
    printGrid()
  );


  $('#cal').click(function(){

    printSchedule();
  });
  $('#home').click(function(){
    printGrid();
  });
})
