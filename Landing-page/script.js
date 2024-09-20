// //-------------------------------------------------------------------
const accessKey = '7ac57520dbf0850668deb7c9be8fc2bd';
const apiUrl = 'https://api.themoviedb.org/3';
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.querySelector(".search-results");
const paraMsg = document.getElementById("para");
const textt = document.querySelectorAll('a');
const genreview = document.querySelector('.overview');
const resett = document.getElementById("reset");
const txt = document.getElementById("name");
const subj = document.getElementById("sub");
const email = document.getElementById("em");
const txtArea = document.getElementById("long-message");
const forum = document.querySelector(".forum");


let inputData = ""
let page = 1



async function searchMovies() {
    inputData = searchInput.value;
    const url = `${apiUrl}/search/movie?page=1&api_key=${accessKey}&query=${inputData}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if(page==1){ //starts from page 1
            searchResults.innerHTML = "" //for the 1st page the inner html set to be empty
            forum.innerHTML = "" //for the 1st page the inner html set to be empty
        }
        results.map((movie) => {
            //results.forEach((movie) => {
                const posterPath = movie.poster_path;
                const title = movie.title;
                const genres = movie.genre_ids.map(genreId => getGenreName(genreId)).join(', ');

                if (posterPath) {
                    const imageWrapper = document.createElement('div') //creating a div to store the new datas
                    imageWrapper.classList.add("cards") 
                    const img = document.createElement('img');
                    img.src = imgBaseUrl + posterPath;
                    img.alt = title;
                    img.classList.add('movie-image');
                    const imageLink = document.createElement('a') //create anchor tag
                    imageLink.href = `https://www.google.com/search?q=${title}&rlz=1C1ONGR_enIN1016IN1016&oq=a+bad+day&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDzSAQg1MDY5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8`; //for href
                    imageLink.target = "_blank" //for target
                    imageLink.textContent = title
                    imageLink.classList.add('aLink');

                    const genresEl = document.createElement('div');
                    genresEl.textContent = `Genres: ${genres}`;
                    genresEl.classList.add('overview');

                    const voteAverage = document.createElement('span');
                    voteAverage.textContent = 'Rating: ' + movie.vote_average;
                    
                    imageWrapper.appendChild(img);
                    imageWrapper.appendChild(imageLink);
                    imageWrapper.appendChild(genresEl);
                    imageWrapper.appendChild(voteAverage);
                    searchResults.appendChild(imageWrapper);
                }
            //})
        });

        searchInput.value = ''; //set the userInput empty after the search button is pressed
        page++;

       

    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}
function getGenreName(genreId) {

    const genres = [
        { "id": 28, "name": "Action" },
        { "id": 12, "name": "Adventure" },
        { "id": 16, "name": "Animation" },
        { "id": 35, "name": "Comedy" },
        { "id": 80, "name": "Crime" },
        { "id": 99, "name": "Documentary" },
        { "id": 18, "name": "Drama" },
        { "id": 10751, "name": "Family" },
        { "id": 14, "name": "Fantasy" },
        { "id": 36, "name": "History" },
        { "id": 27, "name": "Horror" },
        { "id": 10402, "name": "Music" },
        { "id": 9648, "name": "Mystery" },
        { "id": 10749, "name": "Romance" },
        { "id": 878, "name": "Science Fiction" },
        { "id": 10770, "name": "TV Movie" },
        { "id": 53, "name": "Thriller" },
        { "id": 10752, "name": "War" },
        { "id": 37, "name": "Western" }
    ];
    const genre = genres.find(genre => genre.id === genreId);
    return genre ? genre.name : 'Unknown';
}

const goTopBtn = document.querySelector('.btn');
window.addEventListener('scroll', checkHeight)

function checkHeight(){
    if(window.scrollY > 400){
        goTopBtn.style.display = "flex"
    } else{
        goTopBtn.style.display = "none"
    }
}
goTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    paraMsg.style.display = "none";
    searchMovies();
});
resett.addEventListener('click', () => {
    txt.value = "";
    txtArea.value = "";
    email.value = "";
    subj.value = "";
})
