'use strict';

const ulElement = document.querySelector('.js_palette_list');
const url = 'https://beta.adalab.es/ejercicios-de-los-materiales/js-ejercicio-de-paletas/data/palettes.json';

let listPalettesApi = [];
let listPalettesFavorities = [];
fetch(url)
.then((response) => response.json())
.then((data) => {
    console.log(data);
    listPalettesApi = data.palettes;
    renderPaletteList(listPalettesApi);

  });


function renderPaletteList(listData){
  for(const palette of listData){
    ulElement.innerHTML +=  renderPalette(palette);
}
  addEventPaltte();
}

function addEventPaltte(){
  const liElementList = document.querySelectorAll('.js_li_palette');
  for(const li of liElementList){
    li.addEventListener('click', handleClick);}
}

function renderPalette(palette) {
  let html = ` <li id="${palette.id}" class="js_li_palette">
  <h3>${palette.name}</h3>
  <div class="palette">`;

  for(const color of palette.colors){
    html += `<div class="palette__color" style="background-color:#${color}"></div>`;
  }

  html +=  `</div></li>`;
  return html;

}


function handleClick(event){
  const id = event.currentTarget.id;
  const selectedPlette = listPalettesApi.find((item) => item.id === id);
 
  const indexPaltte = listPalettesFavorities.findIndex((item) => item.id ===id);
  if(indexPaltte === -1) {
    listPalettesFavorities.push(selectedPlette); 
  }else{
    listPalettesFavorities.splice(indexPaltte, 1);


  }
  console.log(listPalettesFavorities);
}

