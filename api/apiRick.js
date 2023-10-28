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

  const titleSectionScroll = document.createElement('h2');
  titleSectionScroll.innerText = 'Section scroll infinity'
  for (let { image, name, id, status, species, gender } of results) {
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
    createTemplate(container);
  }
}


const rowContainer = document.createElement('div');
rowContainer.setAttribute('class', 'row mx-auto');

function createTemplate(objectHtml) {
  const tagMain = document.createElement('div');
  tagMain.setAttribute('class', 'col-4 d-flex justify-content-center align-items-center');
  tagMain.innerHTML = objectHtml;
  rowContainer.append(tagMain);
  sectionApi.append(rowContainer);
}
