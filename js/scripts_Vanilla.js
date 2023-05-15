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

    let imageUrl = movieDetails.image_url;
    let title = movieDetails.title;
    let imdb_score = movieDetails.imdb_score;
    let description = movieDetails.long_description;

    const content = `
      <div>
        <h2> The Best Movie </h2>
        <div class="container">
          <img src=${imageUrl} alt=${title}>
          <div class="content">
            <h3> ${title} (${imdb_score}/10)</h3>
            <p> ${description}</p>
          </div>
        </div>
        <div id="button">
          <button class="button">Show Details</button>
        </div>
      </div>
    `

    let section = document.getElementById("the-best");
    section.innerHTML = content;

    /*
    let imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = title;
    document.getElementById("the-best").appendChild(imgElement);

    let titleElement = document.createElement("h3");
    let textTitle = `${title} (${imdb_score}/10)`;
    titleElement.textContent = textTitle;
    document.getElementById("the-best").appendChild(titleElement);

    let descriptionElement = document.createElement("p");
    let textDescription = description;
    descriptionElement.textContent = textDescription;
    document.getElementById("the-best").appendChild(descriptionElement);
    */

  } catch (error) {
    console.error(error);
  }
}

getBestMovie(bestMovie)

