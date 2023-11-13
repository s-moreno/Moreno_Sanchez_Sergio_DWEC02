"use strict";

// ------------------- VARIABLES GLOBALES ------------------------

// capturamos el formulario de introduccion de socios - Ejercicio 1
const formulario = document.querySelector("#formNombre");

// capturamos el contenedor donde escribiremos los socios - Ejercicio 2
const contenedorEscribirSocios = document.getElementById(
  "contenedorPintarSocios"
);

// capturamos el formulario de eliminación de socios
const formID = document.querySelector("#formID");

// Array para añadir los socios
var arraySocios = [];

// ------------------- FUNCIONES ------------------------

// ***** EJERCICIO 1 *******

/*
  Función para leer del JSON
*/
function cargarSociosJSON() {
  let path = "model/datosSocios.json";

  let request = new Request(path, {
    headers: new Headers({
      "Content-Type": "text/json",
    }),
    method: "GET",
  });

  fetch(request).then((response) => {
    response.json().then((data) => {
      console.log("Datos del JSON", data);
      aniadirSociosInicialesArray(data);
    });
  });
}

/* 
  Método para añadir socios al array  cuando arranca la pagina web
*/
function aniadirSociosInicialesArray(data) {
  // Cargar el fichero JSON, parsearlo a objetos tipo "socio" y añadirlos al array
  data.forEach((socio) => {
    arraySocios.push(socio);
  });
  console.log("Array Socios", arraySocios);
}

/*
  Método para capturar los datos del socio introducidos en el formulario
*/
function capturarDatosSocio() {
  let nombre = formulario.querySelector("#fnombre").value;
  let apellido = formulario.querySelector("#fapellido").value;
  crearSocio(nombre, apellido);
}

/* 
  Método para crear un socio pasándole el nombre y el apellido
  y añadirlo al array de socios
 */
function crearSocio(nombre, apellido) {
  // Crear el objeto 'socio'
  let socio = {
    id: crearID(),
    nombre: nombre,
    apellido: apellido,
  };
  // Añadir el objeto 'socio' al array de socios
  arraySocios.push(socio);
  console.log("Array Socios", arraySocios);

  // pintamos en la web el socio que ha sido creado
  let mensajeHtml = '<article class="message is-success">'
  mensajeHtml += '<div class="message-header">'
  mensajeHtml += 'Socio añadido'
  mensajeHtml += '<button class="delete" aria-label="delete" onclick="borrarListaSocios()"></button>'
  mensajeHtml += '</div>'
  mensajeHtml += '<div class="message-body">'
  mensajeHtml += `<b>${socio.nombre} ${socio.apellido}</b> ha sido añadido con <b>ID ${socio.id}</b>.`
  mensajeHtml += '</div>'
  mensajeHtml += '</article>'
  contenedorEscribirSocios.innerHTML = mensajeHtml
}

/*
  Método para crear el ID del socio en función del último
  ID que hay en el array de socios
*/
function crearID() {
  return arraySocios.length + 1;
}

// ***** EJERCICIO 2 ******

/*
  Método que elimina la lista previamente pintada en el contenedor asignado 
  para pintar socios, recorre el array con un bucle y pinta los socios 
*/
function pintarListaSocios() {
  //borramos todo lo que hay en el div
  borrarListaSocios();

  // creamos la estructura html (lista ordenada) con todos los datos socios
  let htmlPintar = '<ul class="not-dott is-italic is-family-monospace	">';
  for (let socio of arraySocios) {
    htmlPintar += `<li>Socio número ${socio.id}: ${socio.nombre} ${socio.apellido}.</li>`;
  }
  htmlPintar += "</ul>";

  //Añadir los socios a la pagina web
  contenedorEscribirSocios.innerHTML = htmlPintar;
}

/*
  Método que elimina la lista previamente pintada en el contenedor asignado 
*/
function borrarListaSocios() {
  contenedorEscribirSocios.innerHTML = "";
}

// EJERCICIO EXTRA : ELIMINAR SOCIO CON SU ID

function eliminarSocio() {
  let indice;

  // obtenemos el el id del socio a eliminar
  let idSocio = formID.querySelector("#fid").value;

  // controlamos que el id introducido sea correcto
  if (idSocio !== "" && idSocio >= 0 && idSocio <= arraySocios.length) {
    indice = idSocio - 1;

    // pintamos en la web el socio que ha sido eliminado
    let mensajeHtml = '<article class="message is-info">'
    mensajeHtml += '<div class="message-header">'
    mensajeHtml += 'Socio eliminado'
    mensajeHtml += '<button class="delete" aria-label="delete" onclick="borrarListaSocios()"></button>'
    mensajeHtml += '</div>'
    mensajeHtml += '<div class="message-body">'
    mensajeHtml += `<b>${arraySocios[indice].nombre} ${arraySocios[indice].apellido}</b> ha sido eliminado.`
    mensajeHtml += '</div>'
    mensajeHtml += '</article>'
    contenedorEscribirSocios.innerHTML = mensajeHtml
    
    //eliminamos el elemento del array
    arraySocios.splice(indice, 1);

    // actualizamos el resto de IDs de socios
    for (let i = indice; i < arraySocios.length; i++) {
      arraySocios[i].id = i + 1;
    }

    console.log("Array Socio", arraySocios);

  } else {
    alert("El número de socio no existe");
  }
}

// ------------------- MAIN ------------------------
cargarSociosJSON();
