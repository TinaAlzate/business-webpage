import { jsonConstantes } from '../constantes/constantes.js';

export const fetchApi = async () => {
  try {
    return (await fetch(jsonConstantes.API_RICK_MORTY)).json();
  }catch{
    return new Error('Error en el consumo de la api')
  }
};

const template = document.querySelector('#apiRickmorty');
const objectFrezzer = {
  card: `[data-card="cardApi"]`,
  imgage: `[data-img="img-card"]`,
  name: `[data-name="name"]`,
  status: `[data-status="status"]`,
  species: `[data-species="species"]`,
  origin: `[data-origin="origin"]`,
  gender: `[data-gender="gender"]`
}
const sectionApi = document.querySelector('.rickMortyApi');
export function addCardCharacter(results, info){
  for (let { image, name, id, status, species, gender, episode } of results) {
    let container = `
            <div class="card m-3 col-md-4" style="width: 18rem;"  data-card="cardApi">
                <img
                    src="${image}"
                    class="card-img-top"
                    alt="${name}"
                    data-img="img-card"
                >
                <div class="card-body ${status === jsonConstantes.ALIVE ? 'alert alert-success' : 'alert alert-danger' }" 
                    role="alert" style="width: 18rem; margin:0" >
                    <h5 class="card-title" data-name="name">${name}</h5>
                    <div
                    class="${status === jsonConstantes.ALIVE ? 'alert alert-success' : 'alert alert-danger' }"
                    role="alert"
                    >
                      <p class="card-text" data-status="status">${status === jsonConstantes.ALIVE ? '✅' : '☠️' }</p>
                    </div>
                    <p class="card-text" data-species="species">${species === jsonConstantes.HUMAN ? '👩‍🦲' :  '👽' }
                  </p>
                    <p class="card-text" data-origin="origin">${id}</p>
                    <p class="card-text" data-gender="gender">${gender}</p>
                </div>
            </div>
    `;
    createTamplet(container);
  }
}


const rowContainer = document.createElement('div');
rowContainer.setAttribute('class', 'row mx-auto' );

function createTamplet(objectHtml){
  const tagMain = document.createElement('div');
  console.log(objectHtml)
  tagMain.setAttribute('class', 'col-4 d-flex justify-content-center align-items-center');
  tagMain.innerHTML = objectHtml;
  rowContainer.append(tagMain);
  sectionApi.append(rowContainer);
}







