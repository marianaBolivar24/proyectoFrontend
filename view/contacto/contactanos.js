const inputs = document.querySelectorAll('#contacto_form input');
const smallForm = document.querySelectorAll('#contacto_form small');

const expresiones = {
    name: /^[a-zA-Z\s]{3,25}$/, // Letras y espacios
    lastName: /^[a-zA-Z\s]{3,25}$/,  // Letras y espacios
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // Expresion basica para validar un correo
    message: /^.{1,60}$/,  // Letras y espacios
}

// Por cada input del formulario se realiza la validacion
inputs.forEach((input) => {
    //keyup para que se realice siempre que se presione una tecla
    input.addEventListener('keyup', validateForm);
    //blur para que se realice siempre que se presione fuera del input
    input.addEventListener('blur', validateForm);
});

// Se ejecuta la función init tan pronto se abra la pestaña en mencion
function init() {
    $('#contacto_form').on("submit", function (e) {
        validarDatos(e);
    });
}



// funcion que nos ayuda a llamar el metodo validateData y a pasar los elementos que reuiere esta funcion
function validateForm(e) {
    switch (e.target.name) {
        case 'name':
            validateData(expresiones.name, e.target, 'name');
            break;

        case 'lastName':
            validateData(expresiones.lastName, e.target, 'lastName');
            break;

        case 'email':
            validateData(expresiones.email, e.target, 'email');
            break;

        case 'message':
            validateData(expresiones.message, e.target, 'message');
            break;
    }
}

// Con lo que recibimos de la funcion validateForm() validamos el valor del input y agregamos y eliminamos clase de acuerdo al caso
function validateData(expresion, input, campo) {
    if (expresion.test(input.value)) {
        $('#' + campo).removeClass('form-control-danger');
        $('#' + campo).addClass('form-control-success');
        $('#' + campo + '_alert').prop('hidden', true);

    } else {
        $('#' + campo).addClass('form-control-danger');
        $('#' + campo + '_alert').prop('hidden', false);
    }
}

// Funcion con algunas alertas
function validarDatos(e) {
    e.preventDefault();

    let valite_name = $('#name').hasClass('form-control-danger');
    let valite_lastName = $('#lastName').hasClass('form-control-danger');
    let valite_email = $('#email').hasClass('form-control-danger');
    let valite_message = $('#message').hasClass('form-control-danger');

    if ($('#name').val() == '' || $('#lastName').val() == '' || $('#email').val() == '' || $('#message').val() == '') {
        swal({
            title: "Advertencia!",
            text: "Campos vacios",
            type: "warning",
            confirmButtonClass: "btn-warning",
            confirmButtonText: "OK"
        });
    } else if (valite_name || valite_lastName || valite_email || valite_message) {
        swal({
            title: "Advertencia!",
            text: "Los campos son invalidos...",
            type: "error",
            confirmButtonClass: "btn-danger",
            confirmButtonText: "OK"
        });
    } else {
        contactanos();
    }
}


//funcion para remover las clases del formulario
function cleanValidation() {

    // Esconder borde de inputs
    inputs.forEach((input) => {
        input.classList.remove('form-control-danger');
        input.classList.remove('form-control-success');
    });

    // Esconder borde de inputs
    smallForm.forEach((small) => {
        small.hidden = true;
    });

}


// Obtenemos el formulario de login por su ID 
function contactanos() {

    const name = document.querySelector('#name').value
    const lastName = document.querySelector('#lastName').value
    const email = document.querySelector('#email').value
    const message = document.querySelector('#message').value

    const Messages = JSON.parse(localStorage.getItem('message')) || []

    //Creamos un nuevo mensaje
    Messages.push({ name: name, lastName: lastName, email: email, message: message });
    localStorage.setItem('message', JSON.stringify(Messages))
    alert('Se envio tu mensaje!');
    // Una vez sale la alerta nos dirige al home
    window.location.href = '../home.html'
}

//invocamos init para que se ejecute una vez se abra la pestaña
init();
