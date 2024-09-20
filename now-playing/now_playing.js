const apiKey = '7ac57520dbf0850668deb7c9be8fc2bd';
const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + apiKey;

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
async function fetchUpcomingMovies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const movies = data.results;

        const movieList = document.getElementById('search-results');
        movies.forEach((movie) => {
            const title = movie.title;

            const card = document.createElement('div');
            card.classList.add('search-result');

            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
            img.alt =title;
            img.classList.add('movie-poster');
            card.appendChild(img);

            const imageLink = document.createElement('a') 
            imageLink.href = `https://www.google.com/search?q=${title}&rlz=1C1ONGR_enIN1016IN1016&oq=a+bad+day&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDzSAQg1MDY5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8`;
            imageLink.target = "_blank" 
            imageLink.textContent = title;
            card.appendChild(imageLink);

            const releaseDate = document.createElement('p');
            releaseDate.textContent = 'Release Date: ' + movie.release_date;
            card.appendChild(releaseDate);

            const voteAverage = document.createElement('span');
            voteAverage.textContent = 'Rating: ' + movie.vote_average;
            card.appendChild(voteAverage);

            movieList.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

fetchUpcomingMovies();
