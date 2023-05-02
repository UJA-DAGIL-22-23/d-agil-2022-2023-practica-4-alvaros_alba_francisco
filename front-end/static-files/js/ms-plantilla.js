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

function mostrarOpcionesPlantilla() 
{
    document.getElementById("opciones-halterofilia").style.display = "none";
    document.getElementById("opciones-volley-playa").style.display = "none";
    document.getElementById("opciones-natacion").style.display = "none";
    document.getElementById("opciones-volley").style.display = "none";
    document.getElementById("opciones-surf").style.display = "none";
    document.getElementById("opciones-comun").style.display = "block";
}


Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


Plantilla.mostrarAcercaDe = function (datosDescargados)
{
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}

Plantilla.procesarAcercaDe = async function () {
    const descargaSurferos = this.descargarRuta('/surferos/acercade')
    const descargaHalterofilia = this.descargarRuta('/halterofilia/acercade')
    const [datosSurferos, datosHalterofilia] = await Promise.all([descargaSurferos, descargaHalterofilia])
    const datosCombinados = {
      mensaje: `${datosSurferos.mensaje} y ${datosHalterofilia.mensaje}`,
      autor: `${datosSurferos.autor} y ${datosHalterofilia.autor}`,
      email: `${datosSurferos.email} y ${datosHalterofilia.email}`,
      fecha: `${datosSurferos.fecha} y ${datosHalterofilia.fecha}`
    }
    this.mostrarAcercaDe(datosCombinados)
  }

/**
 * Función que descarga la info de los microservicios al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {integer} posicion posición del dato descargado en el vector final
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, posicion, callBackFn) {
    let response = null;
  
    try {
      const url = Frontend.API_GATEWAY + ruta;
      response = await fetch(url);
    } catch (error) {
      alert("Error: No se ha podido acceder al API Gateway");
      console.error(error);
    }
  
    // Muestro la info que se ha descargado
    let datosDescargados = null;
    if (response) {
      datosDescargados = await response.json();
      callBackFn(datosDescargados, posicion);
    }
  };
  
  
  /**
   * Función para mostrar en pantalla todos los deportistas que se han recuperado de la BBDD.
   * @param {Array} datos Vector con los datos de los deportistas a mostrar
   */
  Plantilla.imprimeDeportistas = function (datos) {
    let msj = "";
    msj += Plantilla.cabeceraTable();
  
    datos.forEach(vector => {
      vector.forEach(e => {
        msj += Plantilla.cuerpoTr(e);
      });
    });
  
    msj += Halterofilia.pieTable();
  
    Frontend.Article.actualizar("Listado de los nombres de los deportistas", msj);
  };
  
  
  /**
   * Función principal para recuperar los deportistas desde el MS y, posteriormente, imprimirlas.
   */
  Plantilla.listar = function () {
    const rutas = [
      "/halterofilia/getTodas",
      "/surferos/getTodas",
      "/voleyPlaya/listarnPersonas",
      "/natacion/listarnPersonas",
      "/volley/getTodos"
    ];
  
    const descargas = rutas.map((ruta, indice) => {
      return new Promise(resolve => {
        Plantilla.descargarRuta(ruta, indice, resolve);
      });
    });
  
    // Espera hasta que se descarguen todos los datos
    Promise.all(descargas).then(resultados => {
      const datosCompletos = resultados.reduce((acumulador, datos) => {
        acumulador[datos.posicion] = datos;
        return acumulador;
      }, []);
  
      this.imprimeDeportistas(datosCompletos);
    });
  };
  