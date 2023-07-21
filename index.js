
const formUser = document.getElementById('formUser');

const END_POIN_API_FORMUSER = 'https://servidorsalleform-production.up.railway.app/form';


// Función para extraer todos los datos del formualrio y convertirlos en un json para enviarlo al servidor.
formUser.addEventListener('submit',(event)=>{
    event.preventDefault();
    const dataForm = new FormData(event.target);
    // Si necesitan algun valor de los datos se puede conseguir de la siguiente manera.
    const nameUser = dataForm.get('name');
    // console.log(nameUser);

    /**
     * El método Object.fromEntries() trasnforma una lista de pares [clave: valor] en un object
     */
    const dataFormComplet = Object.fromEntries(dataForm.entries());
    /**
     * JSON.stringify, convierte un objeto de js a json para la transferencia de datos HTTP
     */
    // console.log(JSON.stringify(dataFormComplet));

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


const serviceApiUserForm = async (userJson)=>{
    try {
        await fetch(END_POIN_API_FORMUSER,{
            method: 'POST',
            body: JSON.stringify(userJson),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
        .then((response)=>{
            if(response.ok) return response; // Datos enviado en json por el servidor
            throw new Error(`Error ${response.status}`)
        })
        .then( async (json)=> 
            {
                const dataJson = await json.json(); // Esperar a que se resuelva la promesa.
                // for (const key in dataJson.data){
                //     if(dataJson.data.hasOwnProperty(key)){
                //         console.log(`${key} - ${dataJson.data[key]}`);
                //     }
                // }
                Swal.fire({
                    icon: 'success',
                    title: 'Your data has been saved',
                    showConfirmButton: false,
                    // timer: 150000,
                    html:   `<section class="informationUserForm">
                                <p><Strong>Name:</Strong> ${ dataJson.data.name }</p>
                                <p><Strong>Email:</Strong> ${ dataJson.data.email }</p>
                                <p><Strong>Phone:</Strong> ${ dataJson.data.phone }</p>
                                <p><Strong>Company:</Strong> ${ dataJson.data.company }</p>
                                <p><Strong>Subject:</Strong> ${ dataJson.data.subject }</p>
                                <p><Strong>Message:</Strong> ${ dataJson.data.message }</p>
                            </section>`,
                    showCloseButton: true,
                    showConfirmButton: true,
                });
                // console.log( 'data: ', JSON.stringify(dataJson.data), 'status: ', json.status);
            }
        );
    } catch (error) {
        console.log('Upss a ocurrido un error en el envio del formulario');
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            // footer: '<a href="">Why do I have this issue?</a>'
        });
    } 
}