import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix'; 
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
    const countryName = e.target.value.trim();

    fetchCountries(countryName)
    .then(data => {
        if (data.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (data.length <= 10 & data.length > 1) {
            countryList.innerHTML = ''
            createMarkupList(data)
        } else if (data.length = 1) {
            countryList.innerHTML = ''
            createMarkupCard(data)
        }
    })
    .catch(err => console.error(err));

    if (!countryName) {
        clearMarkup(countryList);
        clearMarkup(countryInfo);
        return;
    }
}

function createMarkupList(arr) {
    const list = arr.map(({flags,name}) => {
        return `<li class="country-item">
        <img src="${flags.svg}" alt="${name.official}" width = "40px" height = "40px">
        <p class="country-name">${name.official}</p></li>`}).join('')
        countryList.insertAdjacentHTML('beforeend', list)
}

function createMarkupCard(arr) {
    const list = arr.map(({flags,name,capital,population,languages}) => { return`
    <div class="title">
    <li class="country-card">
    <img src="${flags.svg}" alt="${name.official}" width = "120px" height = "120px">
    <h1>${name.official}</h1>
    <h2>Capital: ${capital}</h2>
    <p class="country-population">Population: ${population}</p>
    <p class="country-languages">Languages: ${Object.values(languages)}</p>
    </div>`}).join('')
    countryList.insertAdjacentHTML('beforeend', list)
}