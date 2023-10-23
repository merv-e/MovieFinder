const API_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=06037b2c68e092d4ab77bebfba7db548&page=1";

const IMG_PATH = "https://api.themoviedb.org/3/collection/{collection_id}/images";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=06037b2c68e092d4ab77bebfba7db548&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');

// Get Initial Movies
getMovies(API_URL);

async function getMovies (url) {
  const res = await fetch(url)
  const data = await res.json();

  console.log(data.results);
}

form.addEventListener('submit', function name(e) {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm)
    search.value = "";
  } else {
    window.location.reload();
  }
})