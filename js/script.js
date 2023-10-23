const main = document.getElementById("main");
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

  console.log(data.results);
  showMovies(data.results);
};

// Get Initial Movies
getMovies(API_URL);


// console.log(`SEARCHVAL: ${search}`);
console.log(`${search}`); //.value

const showMovies = (movies) => {

  if (movies.length ===0 ) {
    main.innerHTML = "No movie with this query has been found.";
  } else {
    main.innerHTML = "";
    
    movies.forEach((movie) => {
      const { title, poster_path, overview } = movie;
      
      const { vote_average} = movie;
      
      const vote_avarage_fixed =  vote_average.toFixed(1);
      
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      
      if(poster_path) {
        movieElement.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_avarage_fixed}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        `;
        
        main.appendChild(movieElement);
      } 
    });
  }
  };

const getClassByRate = (vote) => {
  if(vote >= 8) {
    return 'green';
  } else if (vote >=5) {
    return 'orange'
  } else return 'red';
};

form.addEventListener("submit", function name(e) {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  }

  // if not reload the page (code below)
  else {
    window.location.reload();
  }
});
