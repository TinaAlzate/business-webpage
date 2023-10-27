
let observeElementIntersec;
let observer;
let titleSection;
let elementRef;

export function startIntersection(elements, options){
  options ||= {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  };
  elements ||= [];
  observer = new IntersectionObserver(callbackIntersector, options);
  observer.observe(elements)
}

function callbackIntersector(entries, observer){
  entries ||=[];
  entries.map(({ intersectionRatio , target}) =>{
    if (intersectionRatio){
      observeElementIntersec = target
      titleSection = observeElementIntersec.querySelector('h2').textContent;
      addStyleFocus(elementRef, titleSection)
      document.addEventListener('keypress', catchKeyboard )
    }
  })
}

function catchKeyboard({ key }) {
  console.log(key)
  const nextOrPrevius = {
    n: 'n',
    p: 'p'
  };

  key.toLowerCase();
  if (key === nextOrPrevius.n){
    let { nextElementSibling } = observeElementIntersec;
    scrollIntoElement(nextElementSibling)
  }

  if(key === nextOrPrevius.p){
    let { previousElementSibling } = observeElementIntersec;
    scrollIntoElement(previousElementSibling)
  }
}

function scrollIntoElement(element){
  if(!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

export function stickyElement(element, { style }, tag){
  if(!element) return;
  style ||= {}
  for (const prop in style){
    if(style.hasOwnProperty(prop)){
      element.style[prop] = style[prop]
    }
  }
  elementRef = Array.from(element.querySelectorAll(tag));
}

function addStyleFocus(tagElements, title){
  tagElements ||= [];
  tagElements.map(el => {
    if (el.textContent.trim() === title){
      // el.className = `${el.className} liHoverSection`;
      el.classList.add('liHoverSection')
    }else{
      el.classList.remove('liHoverSection')
    }
  });
}

export { observeElementIntersec as visitElementIntersec }



