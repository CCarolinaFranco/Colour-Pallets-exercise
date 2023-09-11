'use strict';

const ulElement = document.querySelector('.js_palette_list');
const ulFavorites = document.querySelector('.js_palette_fav');
const url = 'https://beta.adalab.es/ejercicios-de-los-materiales/js-ejercicio-de-paletas/data/palettes.json';
const inputSearch = document.querySelector('.search');
const btnSearch = document.querySelector('.btnSearch');

let listPalettesApi = [];
let listPalettesFavorites = [];
const paletteLS = JSON.parse(localStorage.getItem('palettes'));

init();
function init() {

  if (paletteLS) {
    listPalettesApi = paletteLS;
    renderPaletteList(listPalettesApi);
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        listPalettesApi = data.palettes;
        renderPaletteList(listPalettesApi);

        //Local storage se guarda cuando se hace el fetch/dentro del then cuando ya tengo las
        //xq se  quiere guardar todas las paletas
        localStorage.setItem('palettes', JSON.stringify(listPalettesApi));
      });

  }
}


function renderPaletteList(listData) {
  ulElement.innerHTML = '';
  for (const palette of listData) {
    ulElement.innerHTML += renderPalette(palette);
  }
  addEventPaltte();
}

function addEventPaltte() {
  const liElementList = document.querySelectorAll('.js_li_palette');
  for (const li of liElementList) {
    li.addEventListener('click', handleClick);
  }
}

function renderPalette(palette) {
  let html = ` <li id="${palette.id}" class="js_li_palette">
  <h3>${palette.name}</h3>
  <div class="palette">`;

  for (const color of palette.colors) {
    html += `<div class="palette__color" style="background-color:#${color}"></div>`;
  }

  html += `</div></li>`;
  return html;

}


function handleClick(event) {
  const id = event.currentTarget.id;
  const selectedPlette = listPalettesApi.find((item) => item.id === id);

  const indexPaltte = listPalettesFavorites.findIndex((item) => item.id === id);
  if (indexPaltte === -1) {
    listPalettesFavorites.push(selectedPlette);
  } else {
    listPalettesFavorites.splice(indexPaltte, 1);
  }
  console.log(listPalettesFavorites);
  renderFavoritesList();
}

function renderFavoritesList() {
  ulFavorites.innerHTML = '';
  for (const fav of listPalettesFavorites) {
    ulFavorites.innerHTML += renderPalette(fav);
  }
}


const handleSearch = (event) => {
  event.preventDefault();
  const inputValue = inputSearch.value;
  const filterList =  listPalettesApi.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));

  console.log(filterList);
  renderPaletteList(filterList);


};

btnSearch.addEventListener('click', handleSearch);