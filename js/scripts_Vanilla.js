const homeUrl = "http://localhost:8000/api/v1/titles/"
const bestMovie = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"

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
          <button id="open-modal" class="open-button button"> Show Details </button>
        </div>
      </div>

      <div id="modal" class="modal border">
         <h2> The Best Movie </h2>
        <div class="movie-container">
          <img src=${movieDetails.image_url} alt=${movieDetails.title}>
          <div class="movie-content">
            <h3> ${movieDetails.title} (${movieDetails.imdb_score}/10) </h3>
            <table>
              <tr>
                <th> Genre: </th>
                <th> Country: </th>
                <th> Published Date: </th>
                <th> Vote: </th>
                <th> Duration: </th>
                <th> Budget: </th>
              </tr>
              <tr>
                <td> ${movieDetails.genres} </td>
                <td> ${movieDetails.countries} </td>
                <td> ${movieDetails.date_published} </td>
                <td> ${movieDetails.avg_vote} </td>
                <td> ${movieDetails.duration} </td>
                <td> ${movieDetails.budget} </td>
              </tr>
            </table>

            <table id="second-table">
              <tr>
                <th> Director: </th>
                <td> ${movieDetails.directors} </td>
              </tr>
              <tr>
                <th> Actors: </th>
                <td> ${movieDetails.actors} </td>
              </tr>
              <tr>
                <th> Description: </th>
                <td> ${movieDetails.long_description} </td>
              </tr>
            </table>
          </div>
        </div>
        <div>
          <button id="close-modal" class="close-button button"> Close </button>
        </div>
      </div>
    `

    let section = document.getElementById("the-best");
    section.innerHTML = content;

    const openModal = document.getElementById("open-modal");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");


    openModal.addEventListener("click", function (event) {
      event.preventDefault();
      modal.classList.add("show");
    });

    closeModal.addEventListener("click", function () {
      modal.classList.remove("show");
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