const homeUrl = "http://localhost:8000/api/v1/titles/"
const bestMovie = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="

async function getBestMovie(url) {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();

    const bestMovieId = jsonData.results[0].id;
    const bestMovieUrl = `http://localhost:8000/api/v1/titles/${bestMovieId}`

    const movieDetailsResponse = await fetch(bestMovieUrl);
    const movieDetails = await movieDetailsResponse.json();

    const content = `
      <div id="best-movie">
        <h2> The Best Movie </h2>
        <div class="movie-container">
          <img src=${movieDetails.image_url} alt=${movieDetails.title}>
          <div class="movie-content">
            <h3> ${movieDetails.title} (${movieDetails.imdb_score}/10)</h3>
            <p> ${movieDetails.description}</p>
          </div>
        </div>
        <div id="button">
          <button id="open-modal" class="button"> Show Details </button>
        </div>
      </div>

      <div id="modal">
         <h2> The Best Movie </h2>
        <div class="movie-container">
          <img src=${movieDetails.image_url} alt=${movieDetails.title}>
          <div class="movie-content">
            <h3> ${movieDetails.title} (${movieDetails.imdb_score}/10) </h3>
            <p> ${movieDetails.genres} </p>
            <p> ${movieDetails.date_published} </p>
            <p> ${movieDetails.avg_vote} </p>
            <p> ${movieDetails.directors} </p>
            <p> ${movieDetails.actors} </p>
            <p> ${movieDetails.duration} </p>
            <p> ${movieDetails.countries} </p>
            <p> ${movieDetails.budget} </p>
            <p> ${movieDetails.long_description} </p>
          </div>
        </div>
        <div id="button">
          <button id="close-modal" class="button"> Close </button>
        </div>
      </div>
    `

    let section = document.getElementById("the-best");
    section.innerHTML = content;

    const bestMovie = document.getElementById("best-movie");
    const openModal = document.getElementById("open-modal");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");

    openModal.addEventListener("click", function (event) {
      event.preventDefault();
      modal.classList.add("show");
      bestMovie.classList.add("hide");
    });

    closeModal.addEventListener("click", function () {
      modal.classList.remove("show");
      bestMovie.classList.remove("hide");
    });

  } catch (error) {
    console.error(error);
  }
}

getBestMovie(bestMovie)


/*
      <div id="modal-container">
        <h2> The Best Movie - Details </h2>
        <img src=${movieDetails.imageUrl} alt=${movieDetails.title}>
        <div class="modal-content">
          <h3> ${movieDetails.title} </h3>
          <p>
        </div>
      </div>  
      */