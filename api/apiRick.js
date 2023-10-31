import { jsonConstantes } from '../constantes/constantes.js';
import { element } from '../events/modal.js';

export const fetchApi = async (url) => {
  try {
    return (await fetch(url)).json();
  } catch {
    return new Error('Error in fetch api')
  }
};

const sectionApi = document.querySelector('.rickMortyApi');

export function addCardCharacter(results) {
  for (let { image, name, status, species, gender } of results) {
    let container = 
      element('div', {className: ['card', 'border-0', 'm-3', 'col-md-4', 'shadow', 'card-rick'] }, [
        element('img', { className: ['card-img-top'], src: image, alt: name }, []),
        element('div', { className: ['card-body', 'rounded-bottom', 'card-body-rick', `${status === jsonConstantes.ALIVE ? 'bg-success-subtle' : 'bg-danger-subtle' }`]}, [
          element('div', { className: ['d-flex', 'm-0', 'mb-2']}, [
            element('h5', { className: ['card-title', 'text-black', 'fw-semibold', 'm-0'], textCont: name}, []),
            element('span', { className: ['mx-2', 'text-black'], textCont: '-'},  []),
            element('p', { className: ['card-text', 'text-black', 'm-0'], textCont: status }, []),
          ]),
          element('p', { className: ['card-text', 'text-black', 'm-0'], textCont: `Specie: ${species} ${species === jsonConstantes.HUMAN ? '👩‍🦲' : '👽' } ` }, []),
          element('p', { className: ['card-text', 'text-black'], textCont: `Gender: ${gender}` }, [])
        ])
      ]);
    
    createTemplate(container);
  }
}

const rowContainer = element('div', { className: ['row', 'mx-auto']}, []);

function createTemplate(objectHtml) {
  const tagMain = element('div', { className: ['col-md-6', 'col-lg-4', 'd-flex', 'justify-content-center', 'align-items-center'] }, [objectHtml])
  rowContainer.append(tagMain);
  sectionApi.append(rowContainer);
}
