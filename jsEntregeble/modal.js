const modal = document.querySelector(`[data-modal="modal"]`);

export function showModal(){
  modal.classList.add('modalShow')
  const section = document.querySelectorAll(`section[data-key]`);
  let objectSection = [];
  [...section].map(element => {
    objectSection.push({
      textTitle: element.querySelector('h2').innerText,
      numberSerction: element.attributes['data-key'].value
    }) ;    
  });

  createModal(objectSection)
}


const listHelp = document.querySelector(`[data-list="list"]`);

function createModal(objectInfo){

  const addElementList = [];

  if(listHelp.children.length !== 0){
    return;
  }

  const firstElementList = element('li', { className: ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'm-0', 'bg-secondary-subtle']},[
    element('div', { className: ['m-0', 'fw-semibold'], textCont: 'Navigate sections' }, [])
  ]);

  listHelp.appendChild(firstElementList);

  for(let info of objectInfo){
    let elment = element('li', { className:['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'm-0'] },
      [
        element('div', { className: ['m-0'], textCont: info.textTitle }, [] ),
        element('div', { className: ['m-0'] }, [
          element('kbd', { className: ['bg-secondary-subtle', 'text-black', 'border', 'border-secondary', 'px-2']}, [
            element('span', { className: ['text-black'], textCont: info.numberSerction } ,[])
          ])
        ])
      ]
    );
    addElementList.push(elment)
  };
  addElementList.forEach(tag => {
    listHelp.appendChild(tag);
  })

}

function element(tag, options, children) {
  options ||= {}
  let { className, textCont } = options

  const el = document.createElement(tag)
  for (const child of children) {
    el.append(child)
  }
  for (const classN of className || []) {
    el.classList.add(classN)
  }
  if(textCont){
    el.innerText = textCont
  }
  return el;
}

const buttonClose = document.querySelector('[data-close]')
buttonClose.addEventListener('click', removeModal)

export function removeModal(){
  modal.classList.remove('modalShow');
}

