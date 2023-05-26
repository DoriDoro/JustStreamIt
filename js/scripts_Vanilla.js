const homeUrl = "http://localhost:8000/api/v1/titles/"
const categories = ["best-movies", "romance", "drama", "history"];
const categoryTitle = ["The Best Movie", "Best Rated Movies", "Romance Movies", "Dramas", "History Movies"];


// generate the urls:
async function createUrls(category) {
  let url;

  if (category === "best-movies") {
    url = `${homeUrl}?sort_by=-imdb_score`
  } else {
    url = `${homeUrl}?genre=${category}`
  }

  return url;
}

// get all necessary data of two pages:
async function getAllData(category) {
  const url = await createUrls(category);
  const url2 = `${url}&page=2`;
  const urlsList = [url, url2];

  let categoryData = [];
  for (let i = 0; i < urlsList.length; i++) {
    try {
      const response = await fetch(urlsList[i]);
      const jsonData = await response.json();

      categoryData.push(jsonData);

    } catch (error) {
      console.error(error);
    }
  }

  const resultCombinedDataArray = await combineData(categoryData);

  // add the category to the array:
  resultCombinedDataArray.push(category);

  return resultCombinedDataArray;
}

// combine data of both pages into one array:
async function combineData(data) {
  let combinedDataArray = [];
  for (let i = 0; i < data.length; i++) {
    combinedDataArray.push(data[i].results)
  }

  return combinedDataArray;
}

// create the first part: the best movie
// create carousel
// store url or id with img for the details

async function displayImgUrl(data, categoryTitle) {
  // get the category
  const category = data[2];
  // remove category out of the data array:
  data.pop()

  try {
    if (category === "best-movies") {
      const theBestMovieId = data[0][0].id;

      await theBestMovie(theBestMovieId);

      await carouselMovies(data, category, categoryTitle);
      
    } else {
      await carouselMovies(data, category, categoryTitle);
    }

  } catch(error) {
    console.log(error);
  }
}

// create the-best-movie section:
async function theBestMovie(id) {
  try {
    const theBestMovieUrl = `${homeUrl}${id}`

    const movieDetailsResponse = await fetch(theBestMovieUrl);
    const movieDetails = await movieDetailsResponse.json();

    // issue class at modal, creates little quader when clicking on one 
    // picture of Best Rated Movies
    const content = `
      <div class="container">
        <img src=${movieDetails.image_url} alt=${movieDetails.title}>
        <div class="movie-content">
          <h3> ${movieDetails.title} (${movieDetails.imdb_score}/10)</h3>
          <p> ${movieDetails.description}</p>
        </div>
      </div>
      <div id="button">
        <button id="open-modal" class="open-button button"> Show Details </button>
      </div>

      <div id="modal-best" class="modal border">
         <h2> The Best Movie </h2>
        <div class="container">
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
    const modalElement = document.getElementById("modal-best");
    const closeModal = document.getElementById("close-modal");

    openModal.addEventListener("click", function (event) {
      event.preventDefault();
      modalElement.classList.add("show");
    });

    closeModal.addEventListener("click", function () {
      modalElement.classList.remove("show");
    });

  } catch (error) {
    console.error(error);
  }
}

// create carousel:
async function carouselMovies(data, category, categoryTitle) {
  try {
    let carouselImgContent = `
      <div class="btn-right">
        <button class="button"> Right </button>
      </div>
      <div class="container margin-left">
    `;

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < 5; j++) {

        carouselImgContent += `
          <div id="${data[i][j].id}">
            <img src="${data[i][j].image_url}" alt="${data[i][j].title}">
          </div>
        `;
      }
    }

    carouselImgContent += `
      </div>
      <div class="btn-left">
        <button class="button"> Left </button>
      </div>
    `;

    let section = document.getElementById(`${category}`);
    section.innerHTML = carouselImgContent;

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < 5; j++) {
        const openModal = document.getElementById(`${data[i][j].id}`);

        openModal.addEventListener("click", function (event) {
        event.preventDefault();
        displayModal(data[i][j].url, category, categoryTitle);
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function displayModal(url, category, categoryTitle) {
  try {
    const movieDetailsResponse = await fetch(url);
    const movieDetails = await movieDetailsResponse.json();

    modalContent = `
      <h2> ${categoryTitle} </h2>
      <div class="container">
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
    `;


    let modalElement = document.getElementById(`modal-${category}`);
    modalElement.innerHTML = modalContent;
    modalElement.classList.add("show");
    console.log(modalElement);

    const closeModal = document.getElementById("close-modal");

    closeModal.addEventListener("click", function () {
      modalElement.classList.remove("show");
    });
  } catch (error) {
    console.error(error);
  }
}


async function main() {
  const allData = await getAllData(categories[3]);
  await displayImgUrl(allData, categoryTitle[1]);
}


main();
