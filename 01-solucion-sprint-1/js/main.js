'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');

const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');


//Objetos con cada gatito
const kittenData_1 = {
    image: "https://dev.adalab.es/gato-siames.webp",
    name: "Anastacio",
    desc: "Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.",
    race: "Siamés",
};
const kittenData_2 = {
    image: "https://dev.adalab.es/sphynx-gato.webp",
    name: "Fiona",
    desc: "Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.",
    race: "Sphynx",
};
const kittenData_3 = {
    image: "https://dev.adalab.es/maine-coon-cat.webp",
    name: "Sofia",
    desc: " Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.",
    race: "",
};

let kittenDataList = [];


//Funciones
function renderKitten(kittenData) {
    let html = '';
    if (kittenData.race === "") {
        html = `Uy que despiste, no sabemos su raza`;
      } else {
        html = kittenData.race;
      }

    /////////crear li
    const liElement = document.createElement('li');
    liElement.setAttribute('class', 'card');
    listElement.appendChild(liElement); 

    /////////crear article
    const artElement = document.createElement('article');
    liElement.appendChild(artElement); 
    
    /////////crear imagen
    const imgElement = document.createElement('img');
    artElement.appendChild(imgElement); 
    imgElement.setAttribute('src', kittenData.image);
    imgElement.setAttribute('alt', 'gatito');
    imgElement.setAttribute('class', 'card_img');

    /////////crear titulo nombre
    const titleElement = document.createElement('h3');
    artElement.appendChild(titleElement); 
    const titleText = document.createTextNode (kittenData.name); 
    titleElement.setAttribute('class', 'card_title');
    titleElement.appendChild(titleText);

    ///////////crear  race
    const raceElement = document.createElement('h3');
    artElement.appendChild(raceElement); 
    const raceText = document.createTextNode (kittenData.race); 
    raceElement.setAttribute('class', 'card_race');
    raceElement.appendChild(raceText);

    /////////crear parrafo descripcion
    const descElement = document.createElement('p');
    artElement.appendChild(descElement); 
    const descText = document.createTextNode (kittenData.desc); 
    descElement.setAttribute('class', 'card_description');
    descElement.appendChild(descText);

    return liElement;
    
  }


/*function renderKitten(kittenData) {
    let html = '';
    if (kittenData.race === "") {
        html = `Uy que despiste, no sabemos su raza`;
      } else {
        html = kittenData.race;
      }

    const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${html}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;

    return kitten;
}*/

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
      listElement.appendChild(renderKitten (kittenItem));
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
//Adicionar nuevo gatito
function addNewKitten(event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;

    
    if (valueDesc === "" || valuePhoto === "" || valueName === "") {
        labelMessageError.innerHTML = "¡Uy! parece que has olvidado algo";
    }
    else if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
        labelMessageError.innerHTML = "'Mola! Un nuevo gatito en Adalab!'";
    }
    const newKittenDataObject = {
        image: valuePhoto,
        name: valueName,
        desc: valueDesc,
        race: valueRace,
  };
    kittenDataList.push(newKittenDataObject);

    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
    inputRace.value = "";

    renderKittenList(kittenDataList);
};

//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
    inputRace.value = "";
}

//Filtrar por descripción
/*function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        if (kittenItem.desc.includes(descrSearchText)) {
            listElement.innerHTML += renderKitten(kittenItem);
        }
    }
}*/
function filterKitten(event) {
    event.preventDefault();
    const filteredCat = kittenDataList
    .filter ((eachCat)=> eachCat.desc)
    .filter ((eachCat)=> eachCat.race); 
    const filteredCatList = kittenDataList
        .filter(filteredCat)
        .filter(filteredCat);
        
    renderKittenList (filteredCatList);
  }

//Mostrar el litado de gatitos en ell HTML
renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);


////2.11 agregar un nuevo gatito al listado

/////2.13 peticion al servidor

const GITHUB_USER = '<AlbaGG25>';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;


const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));
if (kittenListStored !== null) { 
    renderKittenList(kittenListStored);
 
  } else {
 
    fetch(SERVER_URL)
      .then((response) => response.json())
      .then((data) => {
        kittenDataList = data.results
        renderKittenList(kittenDataList); 
        localStorage.setItem('kittensList', JSON.stringify(kittenDataList));
        console.log(kittenDataList);
      })
      .catch((error) => {
        console.error(error);
      });
  }