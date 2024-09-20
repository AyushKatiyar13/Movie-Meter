
const apiKey = '7ac57520dbf0850668deb7c9be8fc2bd';
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

const genreBlock = document.getElementById('genre-block');
const movieList = document.getElementById('movie-list');

async function fetchData() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

    try {
        // Fetch genre data from TMDB API
        const genreResponse = await fetch(url);
        const genreData = await genreResponse.json();
        const genres = genreData.genres;

        // Create genre blocks and add event listeners
        genres.forEach(genre => {
            const genreDiv = document.createElement('div');
            genreDiv.classList.add('genre');
            genreDiv.textContent = genre.name;
            genreDiv.setAttribute('data-id', genre.id);
            genreBlock.appendChild(genreDiv);

            genreDiv.addEventListener('click', async () => {
                const selectedGenreId = genreDiv.getAttribute('data-id');
                await fetchMoviesByGenre(selectedGenreId);
                window.scrollTo({
                    top: 1030,
                    behavior: "smooth"
                })
            });
        });
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}

async function fetchMoviesByGenre(genreId) {
    const url1 = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;

    try {
        // Fetch movies by genre
        const movieResponse = await fetch(url1);
        const movieData = await movieResponse.json();
        const movies = movieData.results;

        // Clear previous results
        movieList.innerHTML = '';

        // Display movies
        movies.forEach(movie => {
            const title = movie.title;
            const posterPath = movie.poster_path;
            
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

            const voteAverage = document.createElement('span');
            voteAverage.textContent = 'Rating: ' + movie.vote_average;

            imageWrapper.appendChild(img);
            imageWrapper.appendChild(imageLink);
            imageWrapper.appendChild(voteAverage);
            movieList.appendChild(imageWrapper);
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Call fetchData function to initialize
fetchData();

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
