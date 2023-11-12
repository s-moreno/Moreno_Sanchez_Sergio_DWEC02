"use strict";

// ------------------- VARIABLES GLOBALES ------------------------

// capturamos el formulario de introduccion de socios - Ejercicio 1
const formulario = document.querySelector("#formNombre");

// capturamos el contenedor donde escribiremos los socios - Ejercicio 2
const contenedorEscribirSocios = document.getElementById(
  "contenedorPintarSocios"
);

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
  let htmlPintar = "";

  //borramos todo lo que hay en el div
  contenedorEscribirSocios.innerHTML = htmlPintar;

  // creamos la estructura html (lista ordenada) con todos los datos socios
  htmlPintar = "<ul class=\"not-dott is-italic is-family-monospace	\">";
  for (let socio of arraySocios) {
    htmlPintar += `<li>Socio número ${socio.id}: ${socio.nombre} ${socio.apellido}.</li>`;
  }
  htmlPintar += "</ul>";

  //Añadir los socios a la pagina web
  contenedorEscribirSocios.innerHTML = htmlPintar;
}

// ------------------- MAIN ------------------------
cargarSociosJSON();
