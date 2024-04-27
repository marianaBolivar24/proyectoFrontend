const inputs = document.querySelectorAll('#regis_form input');
const smallForm = document.querySelectorAll('#regis_form small');



const expresiones = {
    name: /^[a-zA-Z\s]{3,25}$/, // Letras y espacios
    lastName: /^[a-zA-Z\s]{3,25}$/,  // Letras y espacios
    cell: /^\+?[0-9]\d{1,14}$/, // Solo numeros sin espacios
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // Expresion basica para validar un correo
    pass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, // Expresion basica para validar una clave
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
    $('#regis_form').on("submit", function (e) {
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

        case 'cell':
            validateData(expresiones.cell, e.target, 'cell');
            break;

        case 'email':
            validateData(expresiones.email, e.target, 'email');
            break;

        case 'pass':
            validateData(expresiones.pass, e.target, 'pass');
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
    let valite_cell = $('#cell').hasClass('form-control-danger');
    let valite_email = $('#email').hasClass('form-control-danger');
    let valite_pass = $('#pass').hasClass('form-control-danger');

    if ($('#name').val() == '' || $('#lastName').val() == '' || $('#cell').val() == '' || $('#email').val() == '' || $('#pass').val() == '') {
        swal({
            title: "Advertencia!",
            text: "Campos vacios",
            type: "warning",
            confirmButtonClass: "btn-warning",
            confirmButtonText: "OK"
        });
    } else if (valite_name || valite_lastName || valite_cell || valite_email || valite_pass) {
        swal({
            title: "Advertencia!",
            text: "Los campos son invalidos...",
            type: "error",
            confirmButtonClass: "btn-danger",
            confirmButtonText: "OK"
        });
    } else {
        registrar();
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

//------------------------------------------------------------------------------------------------------------
// Obtenemos el formulario de registro por su ID 
function registrar() {

    const name = document.querySelector('#name').value
    const lastName = document.querySelector('#lastName').value
    const cell = document.querySelector('#cell').value
    const email = document.querySelector('#email').value
    const inputRol = document.querySelector('#inputRol').value
    const active = document.querySelector('#active').value
    const pass = document.querySelector('#pass').value

    // Validamos si ya tenemos este usuario o si lo creamos de cero
    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistred = Users.find(user => user.email === email)
    // Si encontramos que el usuario (email) ya existe en nuestra BD devolvemos una alerta
    if (isUserRegistred) {
        return alert('El usuario ya esta registrado');
    }

    //En el caso de que no este registrado, creamos el usuario
    Users.push({ name: name, lastName: lastName, cell: cell, email: email, inputRol: inputRol, active: active, pass: pass });
    localStorage.setItem('users', JSON.stringify(Users))
    alert('Registro Exitoso!');
    // Una vez sale la alerta nos dirige al login
    window.location.href = '../../index.html'
}


//invocamos init para que se ejecute una vez se abra la pestaña
init();
