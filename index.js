
const formUser = document.getElementById('formUser');

const END_POIN_API_FORMUSER = 'https://servidorsalleform-production.up.railway.app/form';


// Función para extraer todos los datos del formualrio y convertirlos en un json para enviarlo al servidor.
formUser.addEventListener('submit', (event) => {
  event.preventDefault();
  const dataForm = new FormData(event.target);
  // Si necesitan algun valor de los datos se puede conseguir de la siguiente manera.
  const nameUser = dataForm.get('name');

  /**
   * El método Object.fromEntries() trasnforma una lista de pares [clave: valor] en un object
   */
  const dataFormComplet = Object.fromEntries(dataForm.entries());
  /**
   * JSON.stringify, convierte un objeto de js a json para la transferencia de datos HTTP
   */

  Swal.fire({
    title: 'Are you sure?',
    text: "Your data will be sent to the company.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, send!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Llamamos a la función que consumira el servicio de la api, pasando el objeto del formData
      serviceApiUserForm(dataFormComplet);
    }
  });

});


const serviceApiUserForm = async (userJson) => {
  try {
    await fetch(END_POIN_API_FORMUSER, {
      method: 'POST',
      body: JSON.stringify(userJson),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then((response) => {
        if (response.ok) return response; // Datos enviado en json por el servidor
        throw new Error(`Error ${response.status}`)
      })
      .then(async (json) => {
        const dataJson = await json.json(); // Esperar a que se resuelva la promesa.
        Swal.fire({
          icon: 'success',
          title: 'Your data has been saved',
          showConfirmButton: false,
          html: `<section class="informationUserForm">
                                <p><Strong>Name:</Strong> ${dataJson.data.name}</p>
                                <p><Strong>Email:</Strong> ${dataJson.data.email}</p>
                                <p><Strong>Phone:</Strong> ${dataJson.data.phone}</p>
                                <p><Strong>Company:</Strong> ${dataJson.data.company}</p>
                                <p><Strong>Subject:</Strong> ${dataJson.data.subject}</p>
                                <p><Strong>Message:</Strong> ${dataJson.data.message}</p>
                            </section>`,
          showCloseButton: true,
          showConfirmButton: true,
        });
      }
      );
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }
}

// Capturando eventos del teclado 

// 1. para que cuando se pulse un numero se sección haga scroll 

function listenerNumSections(event) {
  let numSelected = Number(event.key)
  let index = numSelected - 1
  let sections = document.querySelectorAll('section')
  let section = sections[index]
  section.scrollIntoView()
}

// 2. Cuando presionamos u vamos a la sección anterior y con d vamos a la posterior

// function listerUpDown(event) {
//    if (!(['u', 'd'].includes(String(event.key).toLowerCase()))) return
//    let sections = document.querySelectorAll("section");
//      for (let section of sections) {
//      let offsetSection = section.offsetTop
//      console.log(offsetSection)
//     }
//
//     let sections = document.querySelectorAll("section");
//     for(let section of sections){
//       const intersectionObserver = new IntersectionObserver((entries) => {
//       console.log(entries, 'entries')
//         section.scrollIntoView()
//       intersectionObserver.observe(sections[section]);
//     });
//     }
//   }
// }

function listerUpDown(event) {
  let carMin = String(event.key).toLowerCase()

  if (!(['u', 'd'].includes(carMin))) return

  let sections = document.querySelectorAll("section");

  let offsetSection = [...sections].map(section => section.offsetTop)

  if(carMin === 'u'){

    const arrayFilter = offsetSection.filter(offsetInd => offsetInd < window.scrollY)

    const ofMin = Math.max(0, ...arrayFilter)
    
    window.scroll(0, ofMin)
  }else{
    /*Si es d*/
    for (let offSetInd of offsetSection){
      if(offSetInd > Math.ceil(window.scrollY)){
        window.scroll(0, offSetInd)
        return
      }
    }
  }
}


document.addEventListener('keypress', listerUpDown)
document.addEventListener('keypress', listenerNumSections)