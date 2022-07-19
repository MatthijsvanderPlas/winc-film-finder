import "./scss/main.scss";
import { movies } from "./lib/movies";


const selectorList = [...document.querySelector('.navbar__list').children];
const searchBar = document.querySelector('.head__search-icon');
const formSubmit = document.querySelector('.head__search');
const reset = document.querySelector('.head__title');

const resetMovieList = () => [...document.querySelector('.container__list').children].forEach(item => item.parentNode.removeChild(item));

const searchMovie = (e) => {
    e.preventDefault();
    let movieToSearch = '';
    if(e.target.parentNode.children[0].value){
         movieToSearch = e.target.parentNode.children[0].value;
    } else {
        movieToSearch = e.target.children[0].value;
    }

    resetMovieList();
    const returnedSearch = filterMovies(movieToSearch);
    if(returnedSearch.length){
        returnedSearch.forEach(movie => addMovieToDom(movie));
    } else {
        const message = document.createElement('p')
        message.innerHTML = 'No movie matching your search was found...'
        message.classList.add('container__par')
        const movieList = document.querySelector('.container__list');
        movieList.appendChild(message);
    }
}

selectorList.forEach(selector => {
    selector.addEventListener('click', setSelector);
})

function addMovieToDom(movie) {
    const el = document.createElement("li");
    const link = document.createElement("a");
    const img = document.createElement("img");
    img.src = movie.poster;
    link.appendChild(img);
    img.classList.add('container__img');
    link.href = `https://imdb.com/title/${movie.imdbID}`;
    link.target='_blank';
    link.classList.add('container__link');
    link.setAttribute('data-content', `\n ${movie.title}`);
    el.appendChild(link);
    el.classList.add('container__item');
    const movieList = document.querySelector('.container__list');
    movieList.appendChild(el);
}

function filterMovies(filter) {
    return movies.filter(movie => movie.title.includes(filter));
}

const resetList = () => {
    resetMovieList();
    setSelector();
}

function setSelector(e = '', selector = '') {
    
    if (e !== '') {
        selector = e.target.childNodes[1].value;
        resetMovieList();
        document.querySelector(`#${e.target.childNodes[1].value}`).checked = true;
    }

    switch (selector) {
        case 'latest':
            const yearNumberMovies = movies.filter(movie => Number(movie.year.split("–")[0]) >= 2014);
            yearNumberMovies.forEach(movie => addMovieToDom(movie));
            break;
        case 'avenger':
            filterMovies('Avengers').forEach(movie => addMovieToDom(movie));
            break;
        case 'xmen':
            filterMovies('X-Men').forEach(movie => addMovieToDom(movie));
            break;
        case 'princess':
            filterMovies('Princess').forEach(movie => addMovieToDom(movie));
            break;
        case 'batman':
            filterMovies('Batman').forEach(movie => addMovieToDom(movie));
            break;
        default:
        movies.forEach(movie => addMovieToDom(movie));
        break;
    }
}

searchBar.addEventListener('click', searchMovie);
formSubmit.addEventListener('submit', searchMovie);
reset.addEventListener('click', resetList)

setSelector();