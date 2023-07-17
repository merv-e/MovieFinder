const API_URL = ("https://api.themoviedb.org/3/discover/movie?api_key=06037b2c68e092d4ab77bebfba7db548");
  
// const IMG_PATH = '';

const IMG_PATH = fetch(
  "https://api.themoviedb.org/3/configuration"
);

  const fetchMovies = fetch(API_URL)
  .then(data => {
      console.log(data);
  })

  const fetchImages = IMG_PATH
  .then(img => {
      console.log(img);
  })

 const search = document.getElementById('search');

 search.addEventListener('', function (){

 })

async function getMovies(url) {
  
}

 //dk 4. => fetching images