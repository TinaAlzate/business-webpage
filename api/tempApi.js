import { jsonConstantes, mockApi } from '../constantes/constantes.js';
import { element } from '../jsEntregeble/modal.js';


// Empezar a comentar hasta aca ⬇️. 
const localSession = window.localStorage.getItem('locationKey');
if (localSession === null) {
  const response = await Swal.fire({
    text: 'Do you agree to use your geolocation?',
    showCancelButton: true,
    confirmButtonColor: '#22c55e',
    cancelButtonColor: '#ef4444',
    confirmButtonText: 'Confirm'
  });
  if(response.isConfirmed) {
    AddGeolocation()
  }
}

if (localSession === 'true'){
  AddGeolocation();
}

function AddGeolocation(){
  // Add geolocation
  window.localStorage.setItem('locationKey', true)
  navigator.geolocation.getCurrentPosition(aceptedGeolocation, errorGeolocation);
}

async function aceptedGeolocation({ coords }){
  try{
    const response = await fetch(`${jsonConstantes.API_TEMPERATURE}?location=${coords.latitude},${coords.longitude}&apikey=${jsonConstantes.API_KEY}`,{
      headers: { 'Accept-Encoding': 'gzip', 'accept': 'application/json' }
    });
    if(response.ok){
      const { timelines } = await response.json();
      createTemperatureHTML(timelines)
    }else{
      errorGeolocation('Error in request')
    }

  }catch(err){
    console.error(err);
  }
}

function errorGeolocation(error){
  Swal.fire({
    icon: 'error',
    title: `Oops: ${error.message}`,
    text: 'Something went wrong!',
  });
}

function createTemperatureHTML({ daily, hourly, minutely }){
  console.log(daily)
  let day = new Date();
  for(let { time, values } of daily){
    let dateApi = new Date(time);
    if (day.getDate() === dateApi.getDate()) {
      addTimeTagDocument();
      addTagDocumentTemp(values);
    }
  }
}

// Comentar hasta aca ⬆️. 

document.querySelector(`[data-btn="close-temp"]`).addEventListener('click', closeTemp);
const containerTemp = document.querySelector(`[data-temperature="temp"]`);

function closeTemp(event){
  containerTemp.classList.add(`${jsonConstantes.CLASS_HIDE}`);
}



// ?? Mock de la api de temperatura
// function createTemperatureTest(){
//   let { time, values } = mockApi
//   let dateApi = new Date(time);
//   // De esta forma comprobamos el dia y su temperatura.
//   let day = new Date();
//   if (day.getDate() === dateApi.getDate()){
//     addTimeTagDocument();
//     addTagDocumentTemp(values);
//   }
// }
// Interval para el cambio de minuto
setInterval(
  addTimeTagDocument
,jsonConstantes.MINUTES);

export function addTimeTagDocument(){
  try{
    let day = new Date();
    let isTodayOut = jsonConstantes.WEEK_DAYS[day.getDay()];
    const isToday = `${isTodayOut}, ${day.getDate()}`;
    document.querySelector(`[data-titleTemp="tite"]`).innerText = isToday;
    let minutes = day.getMinutes() < 10 ? '0' + day.getMinutes() : day.getMinutes();
    document.querySelector(`[data-time="time"]`).innerText = `${day.getHours()}:${minutes}`;
  } catch(err){
    console.error('Error: ',err)
  }
}

// createTemperatureTest();


function addTagDocumentTemp({ temperatureAvg, temperatureMax, temperatureMin, rainIntensityAvg, cloudCoverAvg, rainAccumulationSum, cloudBaseAvg }){
  // Create elements
  const tagElement = 
  element('div', { className: ['d-flex', 'gap-4', 'justify-content-center', 'align-items-center', 'pb-2'] }, 
    [
      element('img', { className: ['thermometer', 'm-0', ], textCont: '', id: 'data-ther', src: `${jsonConstantes.PATH_IMG_CLIMATE}/${jsonConstantes.HOT}`, alt: 'thermometer' }, []),
      element('div', { className: ['text-climate', 'd-flex', 'flex-column', 'gap-1'] }, [
        element('strong', { className: ['text-center'],textCont: 'MIN' }, []),
        element('span', { className: ['text-center'], textCont: `${Math.round(temperatureMin)}°C` }, []),
      ]),
      element('div', { className: ['text-climate', 'd-flex', 'flex-column', 'gap-1'] }, [
        element('strong', { className: ['text-center'], textCont: 'MAX' }, []),
        element('span', { className: ['text-center'], textCont: `${Math.round(temperatureMax)}°C` }, [])
      ]),
    ]
  );
  
  document.querySelector(`[data-avg="avg"]`).innerText = `${Math.round(temperatureAvg)}°C`;

  document.querySelector(`[data-temperature="temp"]`).appendChild(tagElement);
  // Add the new element.
  document.getElementById('data-ther').src = temperatureAvg > 20
    ? `${jsonConstantes.PATH_IMG_CLIMATE}/${jsonConstantes.HOT}`
    : `${jsonConstantes.PATH_IMG_CLIMATE}/${jsonConstantes.COLD}`;
  const rainNow = itRain(rainAccumulationSum + rainIntensityAvg);
  predictTemperature(cloudCoverAvg, rainNow, cloudBaseAvg)
  document.querySelector(`[data-climate="climate"]`).classList.remove('d-none');
}

function predictTemperature(cloudCoverAvg, rainIntensityAvg, cloudBaseAvg){
  // Comprueba si esta lloviendo 
  const img = containerTemp.querySelector(`[data-imgClimate="climate"]`);
  if (itRain(rainIntensityAvg) > jsonConstantes.IT_RAIN) {
    addPathTemperature(img, jsonConstantes.RAIN_SCR_IMG);
  }
  const timeDay = new Date();
  if(timeDay.getHours() > jsonConstantes.TIME_LIMIT){
    if (cloudCoverAvg > jsonConstantes.CLOUDY || cloudBaseAvg >= jsonConstantes.BASE_CLOUDY){
      addPathTemperature(img, jsonConstantes.NIGHT_CLOUD);
      return;
    }
    addPathTemperature(img, jsonConstantes.MOON );
  }else{
    if (cloudCoverAvg > jsonConstantes.CLOUDY || cloudBaseAvg >= jsonConstantes.BASE_CLOUDY){
      addPathTemperature(img, jsonConstantes.SUN_CLOUD)
      return;
    }
    addPathTemperature(img, jsonConstantes.SUN)
  }

}

function itRain(rainIntensityAvg){
  return rainIntensityAvg * 100
}


function addPathTemperature(htmlImg, pngAdd){
  htmlImg.src = `${jsonConstantes.PATH_IMG_CLIMATE}/${pngAdd}`;
}
