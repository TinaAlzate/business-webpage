import { jsonConstantes } from "../constantes/constantes.js";
import { fetchApi, addCardCharacter } from "./apiRick.js";

let observer;
let urlApiNext;
/**
 * Actualiza la url de la request, 
 * @param {*} param Objecto con las opciones del intersector
 */
export function startIntersectionApi({ options, element, urlApi }) {
  options ||= {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  };
  urlApiNext = urlApi;
  observer = new IntersectionObserver(callbackIntersector, options);
  observer.observe(element)
}

const callbackIntersector = async (entries) => {
  for (let { isIntersecting } of entries){
    if (isIntersecting){
      urlApiNext === null ? urlApiNext = jsonConstantes.API_RICK_MORTY : urlApiNext
      const { results, info } = await fetchApi(urlApiNext);
      addCardCharacter(results, info);
        urlApiNext = info.next
    }
  }
}
