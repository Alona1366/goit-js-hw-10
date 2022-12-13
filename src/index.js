import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix'; 
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

searchInput.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
    const countryName = e.target.value.trim();
    if (!countryName) {
        return;
    }

    fetchCountries(countryName)
    .then(data => {
        if (data.length > 10) {
            countryList.innerHTML = '';
            Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (data.length <= 10 && data.length >= 2) {
            countryList.innerHTML = '';
            createMarkupList(data);
        } else {
            countryList.innerHTML = '';
            createMarkupCard(data);
        }
    })
    .catch(onFetchError);    
}

function createMarkupList(arr) {
    const contriesItem = arr.map(({flags,name}) => {
        return `<li class="country-item">
        <img src="${flags.svg}" alt="${name.official}" width = "40px" height = "40px">
        <p class="country-name">${name.official}</p></li>`}).join('');
        countryList.innerHTML = contriesItem;
}

function createMarkupCard(arr) {
    const contryItem = arr.map(({flags,name,capital,population,languages}) => { return`
    <div class="title">
    <li class="country-card">
    <img src="${flags.svg}" alt="${name.official}" width = "120px" height = "120px">
    <h1>${name.official}</h1>
    <h2>Capital: ${capital}</h2>
    <p class="country-population">Population: ${population}</p>
    <p class="country-languages">Languages: ${Object.values(languages)}</p>
    </div>`}).join('');
    countryList.innerHTML = contryItem;
}

function onFetchError() {
    countryList.innerHTML = '';
    Notify.failure('Oops, there is no country with that name');
}