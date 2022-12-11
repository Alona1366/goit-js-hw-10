import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const filtres = 'name,capital,population,flags,languages'

function notFound() {
    Notify.failure("Oops, there is no country with that name")
}

export default function fetchCountries(name) {
    return fetch (`${BASE_URL}${name}?fields=${filtres}`
    ).then(r => {
        if (!r.ok) {
            notFound();
            throw Error(statusText);
        }
        return r.json()
    });
}

// fetchCountries().then(data => console.log(data))

// export default {fetchCountries};