import { movies } from "./lib/movies";
import "./scss/main.scss";

const selectorList = [...document.querySelector('.navbar__list').children];

selectorList.forEach(selector => {
    selector.addEventListener('click', setSelector)
})

function addMovieToDom(movie) {
    const el = document.createElement("li");
    const link = document.createElement("a");
    const img = document.createElement("img");
    img.src = movie.poster;
    link.appendChild(img)
    link.href = `https://imdb.com/title/${movie.imdbID}`;
    link.target='_blank';
    link.classList.add('container__link')
    link.setAttribute('data-content', `\n ${movie.title}`)
    el.appendChild(link)
    el.classList.add('container__item')
    const movieList = document.querySelector('.container__list')
    movieList.appendChild(el);
}

function filterMovies(filter) {
    return movies.filter(movie => movie.title.includes(filter));
}

function setSelector(e = '', selector = '') {
    
    if (e !== '') {
        selector = e.target.childNodes[1].value;
        [...document.querySelector('.container__list').children].forEach(item => item.parentNode.removeChild(item));
        document.querySelector(`#${e.target.childNodes[1].value}`).checked = true;
    }

    switch (selector) {
        case 'latest':
            const yearNumberMovies = movies.filter(movie => Number(movie.year.split("–")[0]) >= 2014 )
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

setSelector();