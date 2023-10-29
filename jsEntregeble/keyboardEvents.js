import { showModal, removeModal } from './modal.js';

const listenerNumSections = ({key}) => {

  if(key === 'Escape'){
    removeModal()
  }
  if (key.toLowerCase() === 'h') {
    helpModal(key);
  }
  let numSelected = Number(key)
  
  let index = numSelected - 1
  
  let sections = document.querySelectorAll('section[data-key]')
  
  if (index >= 0 && index < sections.length) {
    let section = sections[index];
    section.scrollIntoView();
  }
}

document.addEventListener('keypress', listenerNumSections)
document.addEventListener('keydown', listenerNumSections)

const helpModal= () => {
  showModal();
  setTimeout(removeModal, 20000);
}

function callback(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let { nextElementSibling, previousElementSibling } = entry.target;
      document.addEventListener('keypress', ({key}) => {
        let carMin = String(key).toLowerCase();
        
        if (!(['u', 'd'].includes(carMin))) return;
        
        if (carMin === 'u' && previousElementSibling) {
          previousElementSibling.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          
        } else if (carMin === 'd' && nextElementSibling) {
          nextElementSibling.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
      })
    }
  });
}

const options = {
  root: null,
  rootMargin: '-50px',
  threshold: 0
};

const observerSection = new IntersectionObserver(callback, options);

document.querySelectorAll('section[data-key]').forEach((sec) => {
  observerSection.observe(sec);
});

let form = document.querySelector('form')

function stopPropagationForm(event){
  event.stopPropagation()
}

form.addEventListener('keydown', stopPropagationForm)
form.addEventListener('keypress', stopPropagationForm)
