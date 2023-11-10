const movieList = document.querySelector(".movie-list");
const form = document.getElementById("form");
const search = document.getElementById("search");

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=06037b2c68e092d4ab77bebfba7db548&page=1";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=06037b2c68e092d4ab77bebfba7db548&query="';

const IMG_PATH = "https://image.tmdb.org/t/p/w500/";

const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  // console.log(data.results);
  showMovies(data.results);
};

// Fetch All Movies
getMovies(API_URL);

const showMovies = (movies) => {
  if (movies.length === 0) {
    movieList.innerHTML = "No movie with this query has been found.";
  } else {
    movieList.innerHTML = "";

    const sortMoviesByRate = movies.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    console.log(sortMoviesByRate);

    movies.forEach((movie) => {
      const { title, poster_path, vote_average, overview, popularity } = movie;

      const vote_avarage_fixed = Number.isInteger(vote_average)
        ? vote_average
        : vote_average.toFixed(1);

      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");

      // form the structure of the movie element in the DOM
      if (poster_path) {
        movieElement.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(
          vote_average
        )}">${vote_avarage_fixed}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        `;

        movieList.appendChild(movieElement);
      }
    });
  }
};

// change color depending on the rating
const getClassByRate = (vote) => {
  if (vote >= 7.5) {
    return "high";
  } else if (vote >= 5.5) {
    return "medium";
  } else return "low";
};

form.addEventListener("submit", function name(e) {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  }

  // if not, reload the page (code below)
  else {
    window.location.reload();
  }
});
