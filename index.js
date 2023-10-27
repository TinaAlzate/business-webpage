
import { startIntersection, stickyElement, visitElementIntersec } from './jsEntregeble/functionsLocation.js';

const formUser = document.getElementById('formUser');

const END_POIN_API_FORMUSER = 'https://servidorsalleform-production.up.railway.app/form';

formUser.addEventListener('submit', (event) => {
  event.preventDefault();
  const dataForm = new FormData(event.target);
  const nameUser = dataForm.get('name');

  const dataFormComplet = Object.fromEntries(dataForm.entries());

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


let navBar = document.querySelector('nav');
const options = {
  style: {
    position: 'fixed',
    width: '100%',
    top: '0'
  }
}
stickyElement(navBar, options, 'a');

let optionIntersec = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7
}

export let sections = [...document.querySelectorAll('section')]
  .map((section) => {
    startIntersection(section, optionIntersec);
    let titleElement = document.querySelector('h2');
    let dataKey = section.dataset.key;
  });

