/**
 * @file ms-voleibolP.js
 * @description Funciones para el procesamiento de la info enviada por el MS Volley Playa
 * @author Álvaro Ordóñez Romero <aor00039@red.ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let voleyPlaya = {};

var vDatos;


// Plantilla de datosDescargados vacíos
voleyPlaya.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

voleyPlaya.plantillaTags = {
    "ID": " ID ",
    "nombre ": " nombre ",
    "apellidos ": " apellidos ",
    "dia": " dia ",
    "mes": " mes ",
    "Año": " Año ",
    "ciudad": " ciudad ",
    "pais": " pais ",
    "vectorCompeticiones": " vectorCompeticiones ",
    "talla": " talla ",
    "numMedallasOlimpicas": " numMedallasOlimpicas ",
    "posicion": " posicion "
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
voleyPlaya.descargarRuta = async function (ruta, callBackFn) {
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


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
voleyPlaya.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Volley Playa Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
voleyPlaya.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("Volley Playa Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
voleyPlaya.procesarHome = function () {
    this.descargarRuta("/voleyPlaya/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
voleyPlaya.procesarAcercaDe = function () {
    this.descargarRuta("/voleyPlaya/acercade", this.mostrarAcercaDe);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar nombres personas"
 */
voleyPlaya.procesarListarNombres = async function () {
    this.recupera(this.imprime);
}


voleyPlaya.imprime = function (vector) {
    
    let mensaje = "";
    mensaje += voleyPlaya.cabeceraTablaNombres();
    vector.forEach(e => mensaje+= voleyPlaya.cuerpoListarPersonas(e))
    mensaje += voleyPlaya.pieTabla();

    Frontend.Article.actualizar("Listado de personas", mensaje);
    return mensaje;
}

voleyPlaya.cabeceraTablaNombres = function () {
    return `<table class="listado-nombres"><thead><th>ID</th><th>Nombre</th></thead><tbody>`;
}

voleyPlaya.cuerpoListarPersonas = function (p) {
    const d = p.data
    return `<tr title="${p.ref['@ref'].ID}"><td>${p.ref['@ref'].id}</td><td>${d.nombre}</td></tr>`;
}

voleyPlaya.pieTabla = function () {
    return "</tbody></table>";
}


voleyPlaya.recupera = async function (callBackFn) {

    let respuesta = null
    try{
        const url = Frontend.API_GATEWAY + "/voleyPlaya/listarnPersonas"
        respuesta = await fetch(url)
    }catch (error){
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }

    let vectorPersonas = null
    if(respuesta){
        vectorPersonas = await respuesta.json()
        callBackFn(vectorPersonas.data)
    }
}

// Tercera historia de usuario

voleyPlaya.procesarListarNombresOrdenados = async function () {
    this.recupera(this.imprimexNombre);
}



voleyPlaya.ordenarPorNombre = function (vector) {
    vector.sort(function(a, b){
        var nombreA = a.data.nombre.toUpperCase(); // convierte los nombres a mayúsculas para ordenar correctamente
        var nombreB = b.data.nombre.toUpperCase();
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    });
}

voleyPlaya.imprimexNombre = function (vector) {
    voleyPlaya.ordenarPorNombre(vector); // ordena el vector por nombre
    let mensaje = "";
    mensaje += voleyPlaya.cabeceraTablaNombres();
    vector.forEach(e => mensaje+= voleyPlaya.cuerpoListarPersonas(e))
    mensaje += voleyPlaya.pieTabla();

    Frontend.Article.actualizar("Listado de personas ordenado por nombre", mensaje);
}

// Cuarta historia de usuario
voleyPlaya.procesarListarTodos = async function () {
    this.recupera(this.imprimeTodos);
}

voleyPlaya.imprimeTodos = function (vector) {
    let mensaje = "";
    mensaje += voleyPlaya.cabeceraTablaTodos();
    vector.forEach(e => mensaje += voleyPlaya.cuerpoListarTodos(e))
    mensaje += voleyPlaya.pieTabla();

    Frontend.Article.actualizar("Listado de personas", mensaje);
}

voleyPlaya.cabeceraTablaTodos = function () {
    return `<table class="listado-nombres"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Día</th><th>Mes</th><th>Año</th><th>Ciudad</th><th>País</th><th>VECTORCOMPETICIONES</th><th>Talla</th><th>NUMMEDALLASOLIMPICAS</th><th>Posicion</th></thead><tbody>`;
  }

  voleyPlaya.cuerpoListarTodos = function (p) {
    const d = p.data
    return `<tr title="${p.ref['@ref'].ID}"><td>${p.ref['@ref'].id}</td><td>${d.nombre}</td><td>${d.apellidos}</td><td>${d.nacimiento.dia}</td><td>${d.nacimiento.mes}</td><td>${d.nacimiento.Año}</td><td>${d.direccion.ciudad}</td><td>${d.direccion.pais}</td><td>${d.vectorCompeticiones}</td><td>${d.talla}</td><td>${d.numMedallasOlimpicas}</td><td>${d.posicion}</td></tr>`;
}


//Quinta historia de usuario

voleyPlaya.cambiarOrden = async function (){
    this.recupera(this.ordenarBoton)
 }

voleyPlaya.ordenarCampo = function(tipo, vDatos){
    if(tipo==0){
        vDatos.sort(function(a, b){
            let id1 = a.ref['@ref'].id
            let id2 = b.ref['@ref'].id
            if (id1 < id2) {
                return -1;
            }
            if (id1 > id2) {
                return 1;
            }
            return 0;
        });
    }
    if(tipo==1){
        vDatos.sort(function(a, b){
            let nombre1 = a.data.nombre.toUpperCase();
            let nombre2 = b.data.nombre.toUpperCase();
            if (nombre1 < nombre2) {
                return -1;
            }
            if (nombre1 > nombre2) {
                return 1;
            }
            return 0;
        });
    }
    if(tipo==2){
        vDatos.sort(function(a, b){
            let apellido1 = a.data.apellidos.toUpperCase();
            let apellido2 = b.data.apellidos.toUpperCase();
            if (apellido1 < apellido2) {
                return -1;
            }
            if (apellido1 > apellido2) {
                return 1;
            }
            return 0;
        });
    }
    if(tipo==3){
        vDatos.sort(function(a, b){
            let altura1 = a.data.talla;
            let altura2 = b.data.talla;
            if (altura1 < altura2) {
                return -1;
            }
            if (altura1 > altura2) {
                return 1;
            }
            return 0;
        });
    }
    if(tipo==4){
        vDatos.sort(function(a, b){
            let pConseguidos1 = a.data.numMedallasOlimpicas;
            let pConseguidos2 = b.data.numMedallasOlimpicas;
            if (pConseguidos1 < pConseguidos2) {
                return -1;
            }
            if (pConseguidos1 > pConseguidos2) {
                return 1;
            }
            return 0;
        });
    }
    voleyPlaya.ordenarBoton(vDatos, tipo);
}
 
voleyPlaya.ordenarBoton = function(vector){
    let mensaje = "";
    vDatos = vector;
    mensaje += `<div class="botones"><button class="miBoton" onclick="voleyPlaya.ordenarCampo(0, vDatos)">Ordenar por ID</button></div><br></br>`;
    mensaje += `<div class="botones"><button class="miBoton" onclick="voleyPlaya.ordenarCampo(1, vDatos)">Ordenar por Nombre</button></div><br></br>`;
    mensaje += `<div class="botones"><button class="miBoton" onclick="voleyPlaya.ordenarCampo(2, vDatos)">Ordenar por Apellidos</button></div><br></br>`;
    mensaje += `<div class="botones"><button class="miBoton" onclick="voleyPlaya.ordenarCampo(3, vDatos)">Ordenar por Altura</button></div><br></br>`;
    mensaje += `<div class="botones"><button class="miBoton" onclick="voleyPlaya.ordenarCampo(4, vDatos)">Ordenar por Número de medallas olímpicas</button></div><br></br>`;
    mensaje += voleyPlaya.cabeceraTablaTodos();
    vector.forEach(e => mensaje+= voleyPlaya.cuerpoListarTodos(e));
    mensaje += voleyPlaya.pieTabla();
    Frontend.Article.actualizar("Listado de personas con diferente orden", mensaje);
    return mensaje;
}

// Sexta historia de usuario

//Se ha comentado esta parte porque la séptima historia de usuario es similar pero añadiendo 2 botones

/*Plantilla.muestroPersona = async function(id) {
    this.recupera(function(vector) {
      let persona = vector.find(e => e.ref['@ref'].id == id);
      if (persona) {
        Plantilla.mostrarPersona(persona, id);
      }
    });
  }

Plantilla.mostrarPersona = function (persona, idPos) {
    const d = persona.data;
    let mensaje = "";
    mensaje += Plantilla.cabeceraTablaTodos();
    mensaje += `<tr title="${persona.ref['@ref'].ID}"><td>${idPos}</td><td>${d.nombre}</td><td>${d.apellidos}</td><td>${d.nacimiento.dia}</td><td>${d.nacimiento.mes}</td><td>${d.nacimiento.Año}</td><td>${d.direccion.ciudad}</td><td>${d.direccion.pais}</td><td>${d.vectorCompeticiones}</td><td>${d.talla}</td><td>${d.numMedallasOlimpicas}</td><td>${d.posicion}</td></tr>`;
    mensaje += Plantilla.pieTabla();
    Frontend.Article.actualizar("Detalles de persona", mensaje);
    return mensaje;
  }*/


  //Séptima historia de usuario

  //Vector ordenado con los iD
const idJugadores = [359175635380207820, 359290943230181581, 359740219224752332, 359740327119028429, 359740477276160204, 359740594528977100, 359740680986165452, 359740808552775885, 359741028675092684, 359741261320552652];

let indiceActual = 0;

voleyPlaya.muestroPersona = async function (id) {
  this.recupera(function (vector) {
    let persona = vector.find((e) => e.ref["@ref"].id == id);
    if (persona) {
      voleyPlaya.mostrarPersona(persona, indiceActual);
    }
  });
};

// Esta función muestra el jugador anterior
voleyPlaya.anteriorJugador = function () {
  if (indiceActual > 0) {
    indiceActual--;
    voleyPlaya.muestroPersona(idJugadores[indiceActual]);
  }
};

// Esta función muestra el siguiente jugador
voleyPlaya.siguienteJugador = function () {
  if (indiceActual < idJugadores.length - 1) {
    indiceActual++;
    voleyPlaya.muestroPersona(idJugadores[indiceActual]);
  }
};

voleyPlaya.mostrarPersona = function (persona, indiceActual) {
  const d = persona.data;
  let mensaje = "";
  mensaje += `<div class="botones"><button class="anterior" onclick="voleyPlaya.anteriorJugador()">Anterior</button></div><br></br>`;
  mensaje += `<div class="botones"><button class="siguiente" onclick="voleyPlaya.siguienteJugador()">Siguiente</button></div><br></br>`;
  mensaje += voleyPlaya.cabeceraTablaTodos();
  mensaje += `<tr title="${persona.ref['@ref'].ID}"><td>${indiceActual+1}</td><td>${d.nombre}</td><td>${d.apellidos}</td><td>${d.nacimiento.dia}</td><td>${d.nacimiento.mes}</td><td>${d.nacimiento.Año}</td><td>${d.direccion.ciudad}</td><td>${d.direccion.pais}</td><td>${d.vectorCompeticiones}</td><td>${d.talla}</td><td>${d.numMedallasOlimpicas}</td><td>${d.posicion}</td></tr>`;
  mensaje += voleyPlaya.pieTabla();
  Frontend.Article.actualizar("Detalles de persona", mensaje);
  return mensaje;
};


//Octava historia de usuario
voleyPlaya.buscarNombre = function(){
  this.recupera(this.pantallaBuscarNombre);
}

voleyPlaya.pantallaBuscarNombre=function(vector){
  vDatos=vector;
  let mensaje = "";
  console.log(vector);
  mensaje+='<input type="text" id="buscaNombre" placeholder="Introduce un nombre"><button onclick="voleyPlaya.busca(vDatos)">Buscar</button>'
  Frontend.Article.actualizar("Buscar persona por nombre", mensaje);
  return mensaje;
}

voleyPlaya.busca = function(vector) {
  var nombre = document.getElementById("buscaNombre").value.toUpperCase();
  let encontrada = false;
  let mensaje = "";
  for (let i = 0; i < vector.length; i++) {
    console.log('nombre:', nombre);
    console.log('vector[i].data.nombre:', vector[i].data.nombre);
    if (vector[i].data.nombre.toUpperCase() === nombre) {
      encontrada = true;
      mensaje += voleyPlaya.cabeceraTablaTodos() + voleyPlaya.cuerpoListarTodos(vector[i]) + voleyPlaya.pieTabla();
    }
  }
  

  mensaje = voleyPlaya.generarMensaje(mensaje, encontrada);
  Frontend.Article.actualizar("Buscar persona por nombre", mensaje);
  return mensaje;
}


voleyPlaya.generarMensaje = function(mensaje, encontrada) {
  if (encontrada) {
    mensaje+='<input type="text" id="buscaNombre" placeholder="Introduce un nombre"><button onclick="voleyPlaya.busca(vDatos)">Buscar</button>';
  } else {
    mensaje+='<input type="text" id="buscaNombre" placeholder="Introduce un nombre"><button onclick="voleyPlaya.busca(vDatos)">Buscar</button>' + '<div class="error"><p>¡Error! No se ha encontrado el nombre.</p> </div>';
  }
  return mensaje;
}

  

  //Novena y última historia de usuario

  voleyPlaya.buscarCampos = function(){
    this.recupera(this.buscadorGeneral);
}

  voleyPlaya.buscadorGeneral = function(vector) {
    vDatos = vector;
    let mensaje = "";
    mensaje += '<select id="selectCampo">';
    mensaje += '<option value="apellidos">Apellidos</option>';
    mensaje += '<option value="talla">Talla</option>';
    mensaje += '<option value="numMedallasOlimpicas">Medallas olímpicas</option>';
    mensaje += '<option value="posicion">Posición</option>';
    mensaje += '</select>';
    mensaje += '<input type="text" id="busquedaCampin" placeholder="Introduce el valor a buscar">';
    mensaje += '<button onclick="voleyPlaya.buscador(vDatos)">Buscar</button>';
    Frontend.Article.actualizar("Buscar persona por campo", mensaje);
    return mensaje;
  }

  voleyPlaya.obtenerValorCampo = function(objeto, campo) {
    let propiedades = campo.split('.');
    let valor = objeto;
    for (let i = 0; i < propiedades.length; i++) {
      let propiedadActual = propiedades[i];
      if (typeof valor[propiedadActual] === 'string' && i !== propiedades.length - 1) {
        valor = valor[propiedades[i]].toUpperCase();
      } else {
        valor = valor[propiedades[i]];
      }
    }
    return valor;
  }
  
  
voleyPlaya.buscador = function(vector) {
    var campo = document.getElementById("selectCampo").value;
    var valor = document.getElementById("busquedaCampin").value;
    let encontrada = false;
    let mensaje = "";
    for (let i = 0; i < vector.length; i++) {
      let campoValor = voleyPlaya.obtenerValorCampo(vector[i].data, campo);
      if (typeof campoValor === "number" && !isNaN(parseInt(valor))) {
        valor = parseInt(valor);
      }
      if (campoValor.toString().toUpperCase() == valor.toString().toUpperCase()) {
        encontrada = true;
        mensaje += voleyPlaya.cabeceraTablaTodos() + voleyPlaya.cuerpoListarTodos(vector[i]) + voleyPlaya.pieTabla();
      }
    }
    Frontend.Article.actualizar("Buscar persona por campo", mensaje);
    return mensaje;
  }

  /*voleyPlaya.mostrarOpcionesVoleyPlaya = function() 
{
     // Oculta las opciones de Halterofilia
     document.getElementById("opciones").style.display = "none";
     document.getElementById("volley").style.display = "none";
     document.getElementById("natacion").style.display = "none";
     document.getElementById("surferos").style.display = "none";
     // Muestra las opciones de Volley-Playa
     document.getElementById("opcionesVolleyPlaya").style.display = "block";
}*/


  
 