/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

/**
 * Crea la cabecera para mostrar la info como tabla de los nombres, apellidos y deporte de los deportistas
 * @returns Cabecera de la tabla 
 */
Plantilla.cabeceraTable = function () {
    return `<table class="listado-nombres"><thead><th>Deporte</th><th>Nombre</th><th>Apellidos</th></thead><tbody>`;
}

/**
 * Muestra el nombre de cada deportista en un elemento TR con sus correspondientes TD
 * @param {deportista} deportista Datos del deportista a mostrar con los nombres de los deportistas
 * @returns Cadena conteniendo todo el elemento TR que muestra los nombres.
 */
Plantilla.cuerpoTr = function (p, deporte) {
    const d = p.data

    return `<tr title="${p.ref['@ref'].id}">
    <td><em>${deporte}</em></td>
    <td><em>${d.nombre}</em></td>
    <td><em>${d.apellidos}</em></td>
    </tr>
    `;
}

/**
 * Muestra el pie de tabla de los nombres de los deportistas
 * @returns Cadena conteniendo el pie de tabla
 */
Plantilla.pieTable = function () {
    return "</tbody></table>";
}

/**
 * Función que descarga la info de los microservicios al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {integer} posicion posición del dato descargado en el vector final
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, posicion, callBackFn) {
    let response = null
  
    // Intento conectar con el microservicio Halterofilia
    try {
      const url = Frontend.API_GATEWAY + ruta
      response = await fetch(url)
    } catch (error) {
      alert("Error: No se han podido acceder al API Gateway")
      console.error(error)
    }
  
    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
      datosDescargados = await response.json()
      callBackFn(datosDescargados, posicion)
    }
  }
  

/**
 * Función para mostrar en pantalla todos los deportistas que se han recuperado de la BBDD.
 * @param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
 */
Plantilla.imprimeDeportistas = function (vector) 
{

    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.data.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Halterofilia.pieTable();

    Frontend.Article.actualizar("Listado de los nombres de los deportistas", msj)
}


/**
 * Función principal para recuperar los deportistas desde el MS y, posteriormente, imprimirlas.
 */
Plantilla.listar = function () 
{
    this.descargarRuta("/halterofilia/getTodas", this.imprimeDeportistas);
}

