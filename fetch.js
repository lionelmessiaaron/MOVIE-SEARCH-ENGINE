
const movieSearchBox = document.getElementsByTagName("input")[0];
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');


const searchInput = document.getElementById('searchbar');



const searchContainer = document.querySelector('.search-container');
const searchList1 = document.querySelector('.search-list');

searchContainer.addEventListener('mouseenter', () => {
  searchList1.classList.add('show'); // add the "show" class to show the search list
});

searchContainer.addEventListener('mouseleave', () => {
  searchList1.classList.remove('show'); // remove the "show" class to hide the search list
});

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=24b125dc`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    searchList.innerHTML = '';
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    // Build the query string for the movie details
    const queryString = Object.keys(details).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`).join('&');
    
    // Open the new page with the query string
    const url = `page2.html?${queryString}`;
    window.open(url, '_blank');
   
      
  }
  






const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let scrollPos = 0;

prevBtn.addEventListener('click', () => {
  slider.scrollLeft -= slider.offsetWidth;
});

nextBtn.addEventListener('click', () => {
  slider.scrollLeft += slider.offsetWidth;
});

slider.addEventListener('scroll', () => {
  scrollPos = slider.scrollLeft;
});

window.addEventListener('resize', () => {
  slider.scrollLeft = scrollPos;
});

