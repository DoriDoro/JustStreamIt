
var bestMovie = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="

// create a reusable function
function getResponse(url, callback) {
    var r = new XMLHttpRequest();
    r.open("GET", url , true);
    r.onreadystatechange = function () {
      if (r.readyState != 4 || r.status != 200) {
        var response = JSON.parse(r.responseText);
        callback(response);
      }
    };
    r.send();
}

getResponse(bestMovie, function(response) {
    var imageUrl = response.results[0].image_url;
    var imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    document.getElementById("the-best").appendChild(imgElement);

    var title = response.results[0].title;
    var titleElement = document.createElement("h2");
    var textTitle = document.createTextNode(title)
    titleElement.appendChild(textTitle);
    document.getElementById("the-best").appendChild(titleElement);
});