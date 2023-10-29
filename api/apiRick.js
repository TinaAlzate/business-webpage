import { jsonConstantes } from '../constantes/constantes.js';

export const fetchApi = async (url) => {
  try {
    return (await fetch(url)).json();
  } catch {
    return new Error('Error en el consumo de la api')
  }
};


const sectionApi = document.querySelector('.rickMortyApi');
export function addCardCharacter(results) {

  for (let { image, name, status, species, gender } of results) {
    let container = `
            <div class="card border-0 m-3 col-md-4 shadow" style="width: 18rem;"  data-card="cardApi">
                <img
                  src="${image}"
                  class="card-img-top"
                  alt="${name}"
                  data-img="img-card"
                >
                <div 
                  class="card-body rounded-bottom ${status === jsonConstantes.ALIVE ? 'bg-success-subtle' : 'bg-danger-subtle' }" 
                  role="alert" style="width: 18rem; margin:0">
                  <div class="d-flex m-0 mb-2">
                    <h5 class="card-title text-black fw-semibold m-0" data-name="name">${name} </h5> 
                    <span class="mx-2 text-black"> - </span>
                    <p class="card-text text-black m-0" data-species="species">${status}</p>
                  </div>
                  <p class="card-text text-black m-0" data-status="status">Specie: ${species} ${species === jsonConstantes.HUMAN ? '👩‍🦲' :  '👽' }</p>
                  <p class="card-text text-black" data-gender="gender">Gender: ${gender}</p>
                </div>
            </div>
    `;
    createTemplate(container);
  }
}


const rowContainer = document.createElement('div');
rowContainer.setAttribute('class', 'row mx-auto');

function createTemplate(objectHtml) {
  const tagMain = document.createElement('div');
  tagMain.setAttribute('class', 'col-md-6 col-lg-4 d-flex justify-content-center align-items-center');
  tagMain.innerHTML = objectHtml;
  rowContainer.append(tagMain);
  sectionApi.append(rowContainer);
}
