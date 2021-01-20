const fetch = require('node-fetch');

// fetch('https://swapi.dev/api/people/1');
// console.log(fetch('https://swapi.dev/api/people/1/'));
function findPerson (personID) { //Return person obj.
    return getURL(`https://swapi.dev/api/people/${personID}`)
}

function getURL (URL) {
    return fetch(URL)
        .then(response => response.json())
}

function findHomeWorld (personID) {
    return findPerson(personID)
        .then(person => person.homeworld)
        .then(homeworld => getURL(homeworld))
}

// findHomeWorld(1).then(console.log)

function findFilms (personID) {
    return findPerson(personID)
        .then(person => person.films)
        .then(films => Promise.all(films.map(film => getURL(film))))
        // .then(films => {
        //     let movies = films.map(film => getURL(film))
        //     return Promise.all(movies)
        // })
}

findFilms(1).then(console.log)
