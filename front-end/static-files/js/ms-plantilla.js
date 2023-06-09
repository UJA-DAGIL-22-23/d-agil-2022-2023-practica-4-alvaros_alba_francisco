/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";
var historial = [];


/// Creo el espacio de nombres
let Plantilla = {};

/**
 * Crea la cabecera para mostrar la info como tabla de los nombres, apellidos y deporte de los deportistas
 * @returns Cabecera de la tabla 
 */
Plantilla.cabeceraTable = function () {
    return `<table class="listado-nombres"><thead><th>Nombre</th><th>Apellidos</th></thead><tbody>`;
}
Plantilla.cabeceraHistorial = function(){
  return `<table class="tabla-historial"><thead><th>Historial</th></thead><tbody>`
}

/**
 * Muestra el nombre de cada deportista en un elemento TR con sus correspondientes TD
 * @param {deportista} deportista Datos del deportista a mostrar con los nombres de los deportistas
 * @returns Cadena conteniendo todo el elemento TR que muestra los nombres.
 */
Plantilla.cuerpoTr = function (p, deporte) {
    const d = p.data

    return `<tr title="${p.ref['@ref'].id}">
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
 * @description función para mostrar las opciones de la plantilla
 */
Plantilla.mostrarOpcionesPlantilla = function () 
{
    document.getElementById("opciones-halterofilia").style.display = "none";
    document.getElementById("opciones-volley-playa").style.display = "none";
    document.getElementById("opciones-natacion").style.display = "none";
    document.getElementById("opciones-volley").style.display = "none";
    document.getElementById("opciones-surf").style.display = "none";
    document.getElementById("opciones-comun").style.display = "block";
}

/**
 * @description para descargar rutas
 * @param {} ruta la ruta que se pretende descargar
 * @param {*} callBackFn función que se llamará después
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
      const url = Frontend.API_GATEWAY + ruta
      const response = await fetch(url)
      const datosDescargados = await response.json()
      callBackFn(datosDescargados)
    } catch (error) {
      alert("Error: No se han podido acceder al API Gateway")
      console.error(error)
    }
}

Plantilla.procesarDatosDescargados = async function () {
  const rutas =  {
    
    "/surferos/acercade": 8001,
    "/voleyPlaya/acercade": 8001,
    /*
    "/natacion/procesarAcercaDe": 8028,
    "/volley/procesarAcercaDe": 8074,
    "/halterofilia/procesarAcercaDe": 8007,*/
  };
  
  /*const descargas = await Object.keys(rutas).map((ruta, indice) => {
    const puerto = rutas[ruta];
    return Plantilla.descargarRuta3(ruta, puerto, indice);
  });*/

  let descargas=[]
  descargas.push( await Plantilla.descargarRuta3( "/surferos/acercade", 8001, 0) )
  descargas.push( await Plantilla.descargarRuta3( "/voleyPlaya/acercade", 8001, 1) )
  descargas.push( await Plantilla.descargarRuta3( "/volley/acercade", 8001, 2) )
  descargas.push( await Plantilla.descargarRuta3( "/halterofilia/acercade", 8001, 3) )
  descargas.push( await Plantilla.descargarRuta3( "/natacion/acercade", 8001, 4) )

  var mensajesAMostrar = '<div>'; // Abre el contenedor de mensajes
  /*Promise.all(descargas)
    .then(respuestas => {
      respuestas.forEach(respuesta => {
        if (respuesta) {
          mensajesAMostrar += `
            <div>
              <p>${respuesta.mensaje}</p>
              <ul>
                <li><b>Autor/a</b>: ${respuesta.autor}</li>
                <li><b>E-mail</b>: ${respuesta.email}</li>
                <li><b>Fecha</b>: ${respuesta.fecha}</li>
              </ul>
            </div>
          `;
        }
      });*/
      if( descargas ) {
        descargas.forEach(d => {
          if (d) {
            console.log( d )
            mensajesAMostrar += `
              <div>
                <p>${d.datos.mensaje}</p>
                <ul>
                  <li><b>Autor/a</b>: ${d.datos.autor}</li>
                  <li><b>E-mail</b>: ${d.datos.email}</li>
                  <li><b>Fecha</b>: ${d.datos.fecha}</li>
                </ul>
              </div>
            `;
          }
        })
      }
      mensajesAMostrar += '</div>'; // Cierra el contenedor de mensajes
      Frontend.Article.actualizar("Datos descargados", mensajesAMostrar);
    /*}
    .catch(error => console.error(`Error al procesar descargas: ${error}`));*/
};

Plantilla.descargarRuta3 = async function (ruta, puerto, posicion) {
  try {
    const url = `http://localhost:${puerto}${ruta}`;
    const response = await fetch(url);
    const datosDescargados = await response.json();
    return { datos: datosDescargados, posicion: posicion };
  } catch (error) {
    console.error(`Error al descargar datos de ${ruta}:`, error);
    throw error;
  }
}; 


/**
 * Función que descarga la info de los microservicios al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {integer} posicion posición del dato descargado en el vector final
 * @returns {Promise} Promesa que se resuelve con los datos descargados y la posición
 */
Plantilla.descargarRuta2 = async function (ruta, posicion) {
    try {
      const url = Frontend.API_GATEWAY + ruta;
      const response = await fetch(url);
      const datosDescargados = await response.json();
      return { datos: datosDescargados, posicion: posicion };
    } catch (error) {
      console.error(`Error al descargar datos de ${ruta}:`, error);
      throw error;
    }
  };
  
  /**
   * Función para mostrar en pantalla todos los deportistas que se han recuperado de la BBDD.
   * @param {Array} datos Vector con los datos de los deportistas a mostrar
   */
  Plantilla.imprimeDeportistas = function (datos) {
    let msj = "";
    msj += Plantilla.cabeceraTable();
  
    datos.forEach(dato => {
      dato.datos.data.forEach(deportista => {
        msj += Plantilla.cuerpoTr(deportista);
      });
    });
  
    msj += Plantilla.pieTable();
  
    Frontend.Article.actualizar(
      "Listado de los nombres de los deportistas",
      msj
    );
  };
  
  /**
   * @description Función principal para recuperar los deportistas desde el MS y, posteriormente, imprimirlas.
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
      return Plantilla.descargarRuta2(ruta, indice);
    });
  
    // Espera hasta que se descarguen todos los datos
    Promise.all(descargas)
      .then(resultados => {
        const datosCompletos = resultados.sort(
          (a, b) => a.posicion - b.posicion
        );
        this.imprimeDeportistas(datosCompletos);
      })
      .catch(error => {
        console.error("Error al descargar los datos:", error);
      });
  };

  /**
   * @description Función para obtener el historial de cambios de la aplicación
   * @returns el historial
   */
  Plantilla.getHistorial = function (){
    return historial;
  }

  /**
   * @description Función para agregar al historial
   * @param {*} opcion la opción solicitada 
   */
  Plantilla.agregarAHistorial = function(opcion)
  {
    historial.push(opcion);
    //console.log(opcion);
        if (historial.length > 10)
        {
        historial.shift();
        }
    //console.log(Plantilla.getHistorial().length);
    }
  
  /**
   * @description función para mostrar el historial
   * @param {vector} vector vector con los datos del historial
   */
  Plantilla.mostrarHistorial = function(vector){
    vector = historial;
    let msj = "";
    msj += `<table class="listado-nombres">
      <thead>
        <th>ID</th>
        <th>Historial</th>
      </thead>
      <tbody>`;
    let contador = 1;
    vector.forEach(e => msj += `
        <tr>
          <td>${contador++}</td>
          <td>${e || ""}</td>
        </tr>
    `);
    msj += Plantilla.pieTable();
  
    Frontend.Article.actualizar("HISTORIAL", msj);
  }


  /**
   * @description Función para listar los elementos ordenados
   */
  Plantilla.listarOrdenado = function () 
  {
    const rutas = [
      "/halterofilia/getTodas",
      "/surferos/getTodas",
      "/voleyPlaya/listarnPersonas",
      "/natacion/listarnPersonas",
      "/volley/getTodos"
    ];
  
    const descargas = rutas.map((ruta, indice) => {
      return Plantilla.descargarRuta2(ruta, indice);
    });
  
    // Espera hasta que se descarguen todos los datos
    Promise.all(descargas)
      .then(resultados => {
        const datosCompletos = resultados.sort(
          (a, b) => a.posicion - b.posicion
        );
        let contador = 0;
        var vector = [];
        for(let i = 0;i<datosCompletos.length;i++){
          for(let j = 0; j<datosCompletos[i].datos.data.length;j++){
            vector.push(datosCompletos[i].datos.data[j]);  
          }
        } 
        
        vector.sort(function(a,b){
          let nombre1 = a.data.nombre;
          let nombre2 = b.data.nombre;

          if(nombre1<nombre2){
            return -1;
          }
          if(nombre1>nombre2){
            return 1;
          }
          return 0;
        });
        console.log(vector);
        this.imprimeDeportistas2(vector);
      })
      .catch(error => {
        console.error("Error al descargar los datos:", error);
      });
  };

  /**
   * @description Función para imprimir los deportistas ordenados
   * @param {*} datos los deportistas
   */
  Plantilla.imprimeDeportistas2 = function (datos) {
    let msj = "";
    msj += Plantilla.cabeceraTable();
  
    datos.forEach(e=>msj+=Plantilla.listarPersonas(e));
  
    msj += Plantilla.pieTable();
  
    Frontend.Article.actualizar(
      "Listado de los nombres de los deportistas ordenados",
      msj
    );
  };
  
  /**
   * @description Función para listar pdeportistas
   * @param {*} p deportistas
   * @returns el listado
   */
  Plantilla.listarPersonas = function (p) 
  {
    const d = p.data
    
  if(d.apellidos == null ||d.apellidos == undefined){
      return `<tr><td>${d.nombre}</td><td></td></tr>`;

  }
  if( d.nombre == null || d.nombre == undefined){
      return `<tr><td></td><td>${d.apellidos}</td></tr>`;
  }
  if((d.nombre == null || d.nombre == undefined) && (d.apellidos == null||d.apellidos == undefined)){
      return `<tr><td></td><td></td></tr>`;
  }
  return `<tr><td>${d.nombre}</td><td>${d.apellidos}</td></tr>`;
}

/**
 * @description Función para mostrar las opciones del volley playa
 */
Plantilla.mostrarOpcionesVolleyPlaya = function() 
{
    document.getElementById("opciones-halterofilia").style.display = "none";
     document.getElementById("opciones-volley-playa").style.display = "block";
     document.getElementById("opciones-natacion").style.display = "none";
     document.getElementById("opciones-volley").style.display = "none";
     document.getElementById("opciones-surferos").style.display = "none";
     document.getElementById("opciones-comun").style.display = "none";
}


/**
 * @description Función para mostrar las opciones del volley
 */
Plantilla.mostrarOpcionesVolley = function() 
{
    document.getElementById("opciones-halterofilia").style.display = "none";
    document.getElementById("opciones-volley-playa").style.display = "none";
    document.getElementById("opciones-natacion").style.display = "none";
    document.getElementById("opciones-volley").style.display = "block";
    document.getElementById("opciones-surf").style.display = "none";
    document.getElementById("opciones-comun").style.display = "none";
}

/**
 * Función para mostrar las opciones de inicio
 */
Plantilla.mostrarInicio = function() 
{
    document.getElementById("opciones-halterofilia").style.display = "none";
     document.getElementById("opciones-volley-playa").style.display = "none";
     document.getElementById("opciones-natacion").style.display = "none";
     document.getElementById("opciones-volley").style.display = "none";
     document.getElementById("opciones-surf").style.display = "none";
     document.getElementById("opciones-comun").style.display = "none";
}

/**
 * Función para mostrar las opciones de natación
 */
Plantilla.mostrarOpcionesnatacion = function() 
{
    document.getElementById("opciones-halterofilia").style.display = "none";
    document.getElementById("opciones-volley-playa").style.display = "none";
    document.getElementById("opciones-natacion").style.display = "block";
    document.getElementById("opciones-volley").style.display = "none";
    document.getElementById("opciones-surf").style.display = "none";
    document.getElementById("opciones-comun").style.display = "none";
}

/**
 * Función para mostrar las opciones del surf
 */
Plantilla.mostrarOpcionesSurf = function() 
{
    document.getElementById("opciones-halterofilia").style.display = "none";
    document.getElementById("opciones-volley-playa").style.display = "none";
    document.getElementById("opciones-natacion").style.display = "none";
    document.getElementById("opciones-volley").style.display = "none";
    document.getElementById("opciones-surf").style.display = "block";
    document.getElementById("opciones-comun").style.display = "none";
}

/**
 * Función para mostrar las opciones de halterofilia
 */
Plantilla.mostrarOpcionesHalterofilia = function() 
{
  document.getElementById("opciones-halterofilia").style.display = "block";
  document.getElementById("opciones-volley-playa").style.display = "none";
  document.getElementById("opciones-natacion").style.display = "none";
  document.getElementById("opciones-volley").style.display = "none";
  document.getElementById("opciones-surf").style.display = "none";
  document.getElementById("opciones-comun").style.display = "none";
}