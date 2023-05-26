const homeUrl = "http://localhost:8000/api/v1/titles/"
const categories = ["best-movie", "romance", "drama", "history"];

// generate the urls:
async function createUrls(category) {
  let url;

  if (category === "best-movie") {
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

async function displayImgUrl(data) {
  // get the category
  const category = data[2];
  // remove category out of the data array:
  data.pop()

  try {
    if (category === "best-movie") {
      console.log('the best movie');
    } else {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < 5; j++) {
          console.log('img', data[i][j].image_url);
          
        }
        
      }
      /*
      let imgContent = 
          `
          <div>
              <img src="${data[i][j].image_url}" alt="${[i][j].title}">
          </div>
          `
          */

      console.log(data[0][0].image_url);
    }
    console.log('here', data);

  } catch(error) {
    console.log(error);
  }
}


async function main() {
  const allData = await getAllData(categories[1]);
  await displayImgUrl(allData);
}


main();

/*
async function getBestMovie(url) {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();

    const bestMovieId = jsonData.results[0].id;
    const bestMovieUrl = `${homeUrl}${bestMovieId}`

    const movieDetailsResponse = await fetch(bestMovieUrl);
    const movieDetails = await movieDetailsResponse.json();

    const content = `
      <div id="best-movie">
        <h2> The Best Movie </h2>
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
      </div>

      <div id="modal" class="modal border">
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

async function carousel(url1) {
  url2 = `${url1}&page=2`

  try {
    const response1 = await fetch(url1);
    const jsonData1 = await response1.json();

    const response2 = await fetch(url2);
    const jsonData2 = await response2.json();

    const carouselMovies1 = jsonData1.results;
    const carouselMovies2 = jsonData2.results;

    console.log(jsonData2)

    let carouselImg = `
      <div>
        <h2> Romance Movies </h2>
        <div class="btn-right">
          <button class="button"> Right </button>
        </div>
        <div class="container margin-left">
    `;

    for (let i = 0; i < 5; i++) {
      carouselImg += `
          <div>
            <img src="${results[i].image_url}" alt="${[i].title}">
          </div>
      `;
    }

    let button_left = `
        </div>
        <div class="btn-left">
          <button class="button"> Left </button>
        </div>
      </div>
    `;
    
    carouselImg += button_left;

    let section = document.getElementById("romance");
    section.innerHTML = carouselImg;

  } catch (error) {
    console.error(error);
  }

}

carousel(romance)
getBestMovie(bestMovie)
*/