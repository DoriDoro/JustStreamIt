const homeUrl = "http://localhost:8000/api/v1/titles/"
const categories = ["best-movies", "romance", "drama", "history"];
const categoryTitle = ["The Best Movie", "Romance Movies", "Dramas", "History Movies"];


// TODO: carousel movement
// TODO: effects like when hovering over the image

// generate the urls:
async function createUrls(category) {
  try {
    let url;

  if (category === "best-movies") {
    url = `${homeUrl}?sort_by=-imdb_score`
  } else {
    url = `${homeUrl}?genre=${category}`
  }

  return url;

  } catch (error) {
    console.error(error);
  }
}

// get all necessary data of two pages:
async function getAllData(category) {
  try {
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

  } catch(error) {
    console.log(error);
  }
}

// combine data of both pages into one array:
async function combineData(data) {
  try {
    let combinedDataArray = [];
    for (let i = 0; i < data.length; i++) {
      combinedDataArray.push(data[i].results)
    }

    return combinedDataArray;
  } catch(error) {
    console.log(error);
  }
}

// display Images on website:
async function displayImgUrl(data, categoryTitle) {
  try {
    // get the category
    const category = data[2];
    // remove category out of the data array:
    data.pop()

    if (category === "best-movies") {
      const theBestMovieId = data[0][0].id;
      const bestRatedMovieData = data[0].shift();

      categoryTitle2 = "Best Rated Movies";

      await theBestMovie(theBestMovieId, category, categoryTitle);

      await carouselMovies(data, category, categoryTitle2);
      
    } else {
      await carouselMovies(data, category, categoryTitle);
    }

  } catch(error) {
    console.log(error);
  }
}

// create the-best-movie section:
async function theBestMovie(id, category, categoryTitle) {
  try {
    const theBestMovieUrl = `${homeUrl}${id}`

    const movieDetailsResponse = await fetch(theBestMovieUrl);
    const movieDetails = await movieDetailsResponse.json();

    const content = `
      <div class="container">
        <img src=${movieDetails.image_url} alt=${movieDetails.title}>
        <div class="movie-content">
          <h3> ${movieDetails.title} (${movieDetails.imdb_score}/10)</h3>
          <p> ${movieDetails.description}</p>
        </div>
      </div>
      <div id="best-btn">
        <button id="open-modal" class="open-button button"> Show Details </button>
      </div>
    `;

    let section = document.getElementById("the-best");
    section.innerHTML = content;

    const openModal = document.getElementById("open-modal");

    openModal.addEventListener("click", function (event) {
      event.preventDefault();
      displayModal(theBestMovieUrl, category, categoryTitle);
    });

  } catch (error) {
    console.error(error);
  }
}

// create carousel:
async function carouselMovies(data, category, categoryTitle) {
  try {
    // shorten second array to 2 items, total 7:
    if (category === "best-movies") {
      data[1].splice(3);
    } else {
      data[1].splice(2);
    }

    let carouselImgContent = "";

    let index = 1;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {

        carouselImgContent += `
          <li id="${data[i][j].id}-${index}">
            <img class="image" src="${data[i][j].image_url}" alt="${data[i][j].title}">
          </li>
        `;
        index += 1;
      }
    }

    let section = document.getElementById(category);
    section.innerHTML = carouselImgContent;

    index = 1;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {

        const openModal = document.getElementById(`${data[i][j].id}-${index}`);

        openModal.addEventListener("click", function (event) {
          event.preventDefault();
          displayModal(data[i][j].url, category, categoryTitle);
        });
        index += 1;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// create modal:
async function displayModal(url, category, categoryTitle) {
  try {
    const movieDetailsResponse = await fetch(url);
    const movieDetails = await movieDetailsResponse.json();

    modalContent = `
      <h2> ${categoryTitle} </h2>
      <div class="container">
        <div>
          <img class="image" src=${movieDetails.image_url} alt=${movieDetails.title}>
        </div>
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
      <div class="button-close">
        <button id="close-modal-${category}" class="close-button button"> Close </button>
      </div>
    `;


    let modalElement = document.getElementById(`modal-${category}`);
    modalElement.innerHTML = modalContent;
    modalElement.classList.add("show");

    const closeModal = document.getElementById(`close-modal-${category}`);

    closeModal.addEventListener("click", function () {
      modalElement.classList.remove("show");
    });
  } catch (error) {
    console.error(error);
  }
}

// carousel selection:
async function playCarousel(category) {
  try {
    const carousel = document.querySelector(`[data-target="carousel-${category}"]`);
    const image = carousel.querySelector(`[data-target='image-content-${category}']`);
    const leftButton = document.querySelector(`[data-action='slideLeft-${category}']`);
    const rightButton = document.querySelector(`[data-action='slideRight-${category}']`);

    const imageWidth = 186;
    const imageMarginRight = 20;

    const imageCount = 7;

    let offset = 0;
    const maxX = -(((imageCount * imageWidth) + (imageCount - 1) * imageMarginRight) - ((imageWidth * 4) + imageMarginRight * 3));
    // -648

    leftButton.addEventListener("click", function() {
      if (offset !== 0) {
        offset += imageWidth + imageMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      }
    })

    rightButton.addEventListener("click", function() {
      if (offset !== maxX) {
        offset -= imageWidth + imageMarginRight;
        carousel.style.transform = `translateX(${offset}px)`;
      }
    })
  } catch(error) {
    console.log(error);
  }
}


// startpoint:
async function main() {
  try {
    for (let i = 0; i < 4; i++) {
    const allData = await getAllData(categories[i]);

    await displayImgUrl(allData, categoryTitle[i]);

    await playCarousel(categories[i])
    }
  } catch (error) {
    console.error(error);
  }
}


main();
