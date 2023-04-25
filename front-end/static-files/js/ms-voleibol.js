/**
 * @file Volley.js
 * @description Funciones para el procesamiento de la info enviada por el MS Volley
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Volley = {};
var hacia_donde;
var pos = 0;

Volley.form = {
    NOMBRE: "form-jug-nombre",
    APELLIDOS: "form-jug-apellidos",
    NACIMIENTO: "form-jug-nac",
    PAIS: "form-jug-pais",
    PARTICIPACIONESMUNDIAL: "form-jug-part",
    NUMPARTICIPACIONES: "form-jug-numPart",
    CLUB: "form-jug-club",
    POSICION: "form-jug-posicion",
}


Volley.jugadorMostrado = null
// Volley de datosDescargados vacíos
Volley.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

Volley.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "FECHA": "### FECHA ###",
    "PAIS_NACIMIENTO": "### PAIS ###",
    "PARTICIPACIONESMUNDIAL": "### PARTICIPACIONES MUNDIAL ###",
    "NUMPARTICIPACIONES": "### NUMPARTICIPACIONES ###",
    "CLUB_ACTUAL": "### CLUB ACTUAL ###",
    "POSICION": "### POSICION ###"

}

Volley.plantillaTablaJugadores = {}


// Cabecera de la tabla
Volley.plantillaTablaJugadores.cabecera = `<table width="100%" class="listado-jugadores">
                    <thead>
                        <th width="10%">Id</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="10%">Fecha de nacimiento</th>
                        <th width="15%">País</th>
                        <th width="15%">Participaciones mundial</th>
                        <th width="15%">Número de participaciones</th>
                        <th width="15%">Club actual</th>
                        <th width="15%">Posición</th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
Volley.plantillaTablaJugadores.cuerpo = `
    <tr>
        <td>${Volley.plantillaTags.ID}</td>
        <td>${Volley.plantillaTags.NOMBRE}</td>
        <td>${Volley.plantillaTags.APELLIDOS}</td>
        <td>${Volley.plantillaTags.FECHA}</td>
        <td>${Volley.plantillaTags.PAIS_NACIMIENTO}</td>
        <td>${Volley.plantillaTags.PARTICIPACIONESMUNDIAL}</td>
        <td>${Volley.plantillaTags.NUMPARTICIPACIONES}</td>
        <td>${Volley.plantillaTags.CLUB_ACTUAL}</td>
        <td>${Volley.plantillaTags.POSICION}</td>
        
    </tr>
    `;

// Pie de la tabla
Volley.plantillaTablaJugadores.pie = `        </tbody>
             </table>
             `;



Volley.plantillaFormularioJugador = {}


Volley.plantillaFormularioJugador.formulario = 
`
<form method='post' action=''>
    <table width="100%" class="listado-jugadores">
        <thead>
        <th width="10%">Id</th>
        <th width="20%">Nombre</th>
        <th width="20%">Apellidos</th>
        <th width="10%">Fecha de nacimiento</th>
        <th width="15%">País</th>
        <th width="15%">Participaciones mundial</th>
        <th width="15%">Número de participaciones</th>
        <th width="15%">Club actual</th>
        <th width="15%">Posición</th>
        <th width="25%">Acciones</th>
        </thead>
        <tbody>
            <tr title="${Volley.plantillaTags.ID}">
                <td><input type="text" class="form-jug-elemento" disabled id="form-jug-id"
                        value="${Volley.plantillaTags.ID}" 
                        name="id_jug"/></td>

                <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-nombre" required value="${Volley.plantillaTags.NOMBRE}" 
                        name="nombre_jug"/></td>

                <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-apellidos" required value="${Volley.plantillaTags.APELLIDOS}" 
                        name="apellidos_jug"/></td>

                <td>
                <input type="number" class="form-jug-elemento editable" disabled
                id="form-jug-nac" required value="${Volley.plantillaTags.FECHA}"       
                name="nac_jug"/>    
                </td>

                <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-pais" required value="${Volley.plantillaTags.PAIS_NACIMIENTO}" 
                        name="pais_jug"/></td>

                <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-part" required value="${Volley.plantillaTags.PARTICIPACIONESMUNDIAL}" 
                        name="part_jug"/></td>
                
                <td><input type="number" class="form-jug-elemento editable" disabled
                        id="form-jug-numPart" required value="${Volley.plantillaTags.NUMPARTICIPACIONES}" 
                        name="numPart_jug"/></td>

                    <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-club" required value="${Volley.plantillaTags.CLUB_ACTUAL}" 
                        name="club_jug"/></td>
                        
                <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-posicion" required value="${Volley.plantillaTags.POSICION}" 
                        name="posicion_jug"/></td>

                <td>
                    <div><a href="javascript:Volley.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Volley.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Volley.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;
             
Volley.plantillaFormularioJugador.actualiza = function(jugador){
    return Volley.sustituyeTags(this.formulario, jugador)
}


Volley.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Volley.form) {
        document.getElementById(Volley.form[campo]).disabled = deshabilitando
    }
    return this
}

Volley.deshabilitarCamposEditables = function () {
    Volley.habilitarDeshabilitarCamposEditables(true)
    return this
}

Volley.habilitarCamposEditables = function () {
    Volley.habilitarDeshabilitarCamposEditables(false)
    return this
}


Volley.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}

Volley.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}

Volley.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}

Volley.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}

Volley.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}

Volley.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

Volley.cancelar = function () {
    this.imprimeJugador(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

Volley.recuperaDatosAlmacenados = function () {
    return this.jugadorMostrado;
}

Volley.jugadorComoForm = function (jugador) {
    return Volley.plantillaFormularioJugador.actualiza( jugador );
}

Volley.almacenaDatos = function (jugador) {
    Volley.jugadorMostrado = jugador;
}



Volley.sustituyeTags = function (plantilla, jugador) {
    return plantilla
        .replace(new RegExp(Volley.plantillaTags.ID, 'g'), jugador.ref['@ref'].id)
        .replace(new RegExp(Volley.plantillaTags.NOMBRE, 'g'), jugador.data.nombre)
        .replace(new RegExp(Volley.plantillaTags.APELLIDOS, 'g'), jugador.data.apellidos)
        .replace(new RegExp(Volley.plantillaTags.FECHA, 'g'), jugador.data.nacimiento)
        .replace(new RegExp(Volley.plantillaTags.PAIS_NACIMIENTO, 'g'), jugador.data.pais_nacimiento)
        .replace(new RegExp(Volley.plantillaTags.PARTICIPACIONESMUNDIAL, 'g'), jugador.data.participacionesMundial)
        .replace(new RegExp(Volley.plantillaTags.NUMPARTICIPACIONES, 'g'), jugador.data.numParticipaciones)
        .replace(new RegExp(Volley.plantillaTags.CLUB_ACTUAL, 'g'), jugador.data.club_actual)
        .replace(new RegExp(Volley.plantillaTags.POSICION, 'g'), jugador.data.posicion)
}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Volley.plantillaTablaJugadores.actualiza = function (jugador) {
    return Volley.sustituyeTags(this.cuerpo, jugador)
}
/**
 * Función que descarga la info MS Volley al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Volley.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Volley
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
 * Función principal para mostrarJugador los datos enviados por la ruta "home" de MS Volley
 */
Volley.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Volley Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrarJugador los datos enviados por la ruta "acerca de" de MS Volley
 */
Volley.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("Volley Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Volley.procesarHome = function () {
    this.descargarRuta("/volley/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Volley.procesarAcercaDe = function () {
    this.descargarRuta("/volley/acercade", this.mostrarAcercaDe);
}

/**
 * Función que recupera todos los jugadores llamando al MSPlantilla
 */

Volley.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/volley/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorJugadores = null
    if (response) {
        vectorJugadores = await response.json()
        callBackFn(vectorJugadores.data)
    }
}


Volley.recuperaUnJugador = async function (idJug, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/volley/getPorId/" + idJug

        const response = await fetch(url);
        if (response) {
            const jugador1 = await response.json()
            callBackFn(jugador1)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}
/**
 * Crea la cabecera para mostrarJugador la info en una tabla
 * @returns cabecera de la tabla
 */

Volley.cabeceraTable = function () {
    return `<table class="listado-jugadores">
        <thead>
        <th>Nombre</th><th>Apellidos</th><th>Nacimiento</th><th>Pais</th><th>Mundiales</th><th>Num. Participaciones</th><th>Club Actual</th><th>Posicion</th>
        </thead>
        <tbody>
    `;
}

Volley.pieTable = function () {
    return "</tbody></table>";
}

Volley.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = Volley.plantillaTablaJugadores.cabecera
    vector.forEach(e => msj += Volley.plantillaTablaJugadores.actualiza(e))
    msj += Volley.plantillaTablaJugadores.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de datos de los jugadores", msj )

}

Volley.imprimeNombre = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += `<table class="listado-jugadores">
    <thead>
    <th>Nombre</th>
    </thead>
    <tbody>`;
    vector.forEach(e => msj += Volley.soloNombre(e))
    msj += Volley.pieTable();

    Frontend.Article.actualizar( "Listado de nombres de los jugadores", msj )

}

Volley.imprimeAlfabeticamenteNombre = function(vector) {
    
    let msj = Volley.plantillaTablaJugadores.cabecera
    vector.sort(function(a, b){
        return a.data.nombre.localeCompare(b.data.nombre);
    });
    
    vector.forEach(e => msj += Volley.plantillaTablaJugadores.actualiza(e))
    msj += Volley.plantillaTablaJugadores.pie

    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Volley.imprimeAlfabeticamenteApellidos = function(vector){
    let msj = Volley.plantillaTablaJugadores.cabecera
    vector.sort(function(a, b){
        return a.data.apellidos.localeCompare(b.data.apellidos);
    });
    vector.forEach(e => msj += Volley.plantillaTablaJugadores.actualiza(e))
    msj += Volley.plantillaTablaJugadores.pie

    Frontend.Article.actualizar( "Listado de jugadores", msj )
}


Volley.imprimeOrdenFecha = function(vector){
    let msj = Volley.plantillaTablaJugadores.cabecera
        vector.sort(function(a, b){
            return a.data.nacimiento - b.data.nacimiento;
        });
        vector.forEach(e => msj += Volley.plantillaTablaJugadores.actualiza(e))
        msj += Volley.plantillaTablaJugadores.pie

    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Volley.imprimeAlfabeticamentePais = function(vector){
    let msj = Volley.plantillaTablaJugadores.cabecera
    vector.sort(function(a, b){
        return a.data.pais_nacimiento.localeCompare(b.data.pais_nacimiento);
    });
    vector.forEach(e => msj += Volley.plantillaTablaJugadores.actualiza(e))
    msj += Volley.plantillaTablaJugadores.pie
    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Volley.imprimeOrdenParticipaciones = function(vector){
    let msj = Volley.plantillaTablaJugadores.cabecera
    vector.sort(function(a, b){
        return b.data.numParticipaciones - a.data.numParticipaciones;
    });
    vector.forEach(e => msj += Volley.plantillaTablaJugadores.actualiza(e))
    msj += Volley.plantillaTablaJugadores.pie
    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Volley.imprimeAlfabeticamenteClub = function(vector){
    let msj = Volley.plantillaTablaJugadores.cabecera
    vector.sort(function(a, b){
        return a.data.club_actual.localeCompare(b.data.club_actual);
    });
    vector.forEach(e => msj += Volley.plantillaTablaJugadores.actualiza(e))
    msj += Volley.plantillaTablaJugadores.pie
    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Volley.imprimeAlfabeticamentePosicion = function(vector){
    let msj = Volley.plantillaTablaJugadores.cabecera
    vector.sort(function(a, b){
        return a.data.posicion.localeCompare(b.data.posicion);
    });
    vector.forEach(e => msj += Volley.plantillaTablaJugadores.actualiza(e))
    msj += Volley.plantillaTablaJugadores.pie
    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Volley.soloNombre = function (p){
    const d = p.data;
    return `<tr><td><em>${d.nombre}</em></td></tr>`
}



Volley.imprimeJugador = function (jugador) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Volley.jugadorComoForm(jugador)
    
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar un jugador", msj)
    // Actualiza el objeto que guarda los datos mostrados
    Volley.almacenaDatos(jugador)
}
Volley.imprimeOtroJugador = function (vector) {
    //console.log(hacia_donde);
    if (hacia_donde == 1){
        if (pos >= vector.length - 1){
            pos = 0;
        }
        //console.log(pos)
        pos++
        //console.log(vector[pos].ref['@ref'].id);
        Volley.imprimeJugador(vector[pos]);
    }

    if (hacia_donde == -1){
        if (pos <= 0){
            pos = vector.length;
        }
        //console.log(pos)
        pos--
        //console.log(vector[pos].ref['@ref'].id);
        Volley.imprimeJugador(vector[pos]);
    }
}


Volley.listarDatos = function(){
    this.recupera(this.imprime);

}
Volley.listarNombre = function(){
     this.recupera(this.imprimeNombre);
}
Volley.listarAlfabeticamenteNombre = function(){
    this.recupera(this.imprimeAlfabeticamenteNombre);
}
Volley.listarAlfabeticamenteApellidos = function(){
    this.recupera(this.imprimeAlfabeticamenteApellidos);
}
Volley.listarAlfabeticamentePais = function(){
    this.recupera(this.imprimeAlfabeticamentePais);
}
Volley.listarOrdenFecha = function(){
    this.recupera(this.imprimeOrdenFecha);
}
Volley.listarOrdenParticipaciones = function(){
    this.recupera(this.imprimeOrdenParticipaciones);
}
Volley.listarAlfabeticamenteClub = function(){
    this.recupera(this.imprimeAlfabeticamenteClub);
}
Volley.listarAlfabeticamentePosicion = function(){
    this.recupera(this.imprimeAlfabeticamentePosicion);
}
Volley.mostrarJugador = function (idJug) {
    this.recuperaUnJugador(idJug, this.imprimeJugador);
}
Volley.mostrarOtroJugador = function (hacia){
    hacia_donde = hacia;
    this.recupera(this.imprimeOtroJugador); 
}


Volley.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/volley/setTodo"
        let id_jugador = document.getElementById("form-jug-id").value
      
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_jug": id_jugador,
                "nombre_jug": document.getElementById("form-jug-nombre").value,
                "apellidos_jug": document.getElementById("form-jug-apellidos").value,
                "nac_jug": document.getElementById("form-jug-nac").value,
                "pais_jug": document.getElementById("form-jug-pais").value,
                "part_jug": document.getElementById("form-jug-part").value,
                "numPart_jug": document.getElementById("form-jug-numPart").value,
                "club_jug": document.getElementById("form-jug-club").value,
                "posicion_jug": document.getElementById("form-jug-posicion").value,
            }), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const persona = await response.json()
            alert(persona)
        }
        */
        Volley.mostrarJugador(id_jugador)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        console.error(error)
    }
}
