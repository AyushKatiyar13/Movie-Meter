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
    inputData = searchInput.value.trim();
    
    if (!inputData) {
        alert("Please enter a movie name.");
        return; 
    }

    const url = `${apiUrl}/search/movie?page=1&api_key=${accessKey}&query=${inputData}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const results = data.results || [];

        // Check if elements are found
        console.log('searchResults:', searchResults);
        console.log('forum:', forum);

        if (page === 1) {
            if (searchResults) searchResults.innerHTML = ""; 
            if (forum) forum.innerHTML = ""; 
        }

        if (results.length === 0) {
            if (searchResults) searchResults.innerHTML = "<p>No results found.</p>";
            return;
        }

        results.forEach((movie) => {
            const posterPath = movie.poster_path;
            const title = movie.title;
            const genres = movie.genre_ids.map(genreId => getGenreName(genreId)).join(', ');

            if (posterPath) {
                const imageWrapper = document.createElement('div');
                imageWrapper.classList.add("search-result");

                const img = document.createElement('img');
                img.src = imgBaseUrl + posterPath;
                img.alt = title;
                img.classList.add('movie-image');

                const imageLink = document.createElement('a');
                imageLink.href = `https://www.google.com/search?q=${title}`;
                imageLink.target = "_blank";
                imageLink.textContent = title;
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
        });

        searchInput.value = ''; 
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
