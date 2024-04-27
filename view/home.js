function init() {
    userView()
}


//Para desplegar el menu de la foto de perfil del   
document.addEventListener("DOMContentLoaded", () => {
    const imagenUsuario = document.getElementById("imagenUsuario");
    const menuUsuario = document.getElementById("menuUsuario");

    imagenUsuario.addEventListener("click", () => {
        menuUsuario.style.display = menuUsuario.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
        if (!menuUsuario.contains(e.target) && e.target !== imagenUsuario) {
            menuUsuario.style.display = "none";
        }
    });
});

// No nos deja pasar al home si no hay una sesion iniciada
const user = JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href = '../index.html';
}

//Nos permite cerrar sesion
const logout = document.querySelector('#logout');

//enviamos una alerta de sesion cerrada y lo redirigimos al login
logout.addEventListener('click', () => {
    alert('Hasta Pronto!');
    localStorage.removeItem('login_success');
    window.location.href = '../index.html';
})



function userView() {

    // Paso 1: Obtener el JSON del Local Storage
    const jsonLocalStorage = localStorage.getItem('login_success');

    // Paso 2: Convertir la cadena de texto a un objeto JavaScript
    const objetoJSON = JSON.parse(jsonLocalStorage);

    //Obtenemos el valor de inputRol del arreglo login_success en el local storage
    const valor1 = objetoJSON.inputRol;

    // Si el valor de la llave inpuitRol es igual a 0 (admin) se mostrara la vista normal y si es diferente (1-user) se oculatara la ocion de registrar en el menu
    if (valor1 == 1) {
        const elemento = document.getElementById('opcRegistrar');
        // Ocultar el elemento cambiando su estilo
        elemento.style.display = 'none';
    }
}

init();