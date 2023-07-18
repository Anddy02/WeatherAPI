/**
 * Link Api = https://openweathermap.org/
 */

//Seleciono los elementos importantes del documento HTML
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});


function buscarClima(e) {
    e.preventDefault(); //

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === "" || pais === ""){
        mostrarError('Ambos campos son obligatorios');  
    }else{
    //consultar
    consultarApi(ciudad, pais);
    }
}


function consultarApi(ciudad, pais) {
    const appId = 'aa51c4a90d9f8c215a51a5eb82e35425';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner(); //Muestra un spinner de carga

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            limpiarHTML(); //Limpiar html previo

            if(datos.cod === "404"){
                mostrarError("Ciudad no encontrada");
            }else{
            //Imprimir la respuesta en el HTML
            mostrarClima(datos);
            }
        });
}

function mostrarClima(datos) {
    const {name, main: {temp, temp_max, temp_min} } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    let nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('city_temp');

    let actual = document.createElement('p');
    actual.innerHTML =`${centigrados} &#8451;`;
    actual.classList.add('temperature');

    let tempMaxima = document.createElement('p');
    tempMaxima.innerHTML =`Max: ${max} &#8451;`;
    tempMaxima.classList.add('max-min__Temperature');

    let tempMinima = document.createElement('p');
    tempMinima.innerHTML =`Min: ${min} &#8451;`;
    tempMinima.classList.add('max-min__Temperature');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('result'); 
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);

}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.alert');

    if(!alerta){
        //crar una alerta
        let alerta = document.createElement('div');
        alerta.classList.add('alert');
    
        alerta.innerHTML = `
            <strong class="message">Error!!</strong>
            <span class="message">${mensaje}</span>
        `;
        container.appendChild(alerta);

        //Eliminar alerta
        setTimeout(()=>{
            alerta.remove();
        },2000);
    }
}

//Funcion para pasar de kelvin a centigrdos
const kelvinACentigrados =  grados => parseInt(grados - 273.15);


function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){
    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `
    resultado.appendChild(divSpinner);
}



// function Saludar(callback){
//     setTimeout(()=>{
//         callback();
//     },5000)
// }

// Saludar(()=>{
//     console.log('Hello!!');
// });

// console.log('Andres');
