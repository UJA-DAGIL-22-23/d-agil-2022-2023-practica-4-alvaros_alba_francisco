"use strict";

/// Creo el espacio de nombres
let Surferos = {};

let num = 0;

Surferos.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "CIUDAD": "### CIUDAD ###",
    "PAIS": "### PAIS ###",
    "NUM": "### NUM ###",
    "EVENTO": "### EVENTO ###",
    "AÑOS COMPITIENDO": "### AÑOS COMPITIENDO ###",
    "PUNTUACION": "### PUNTUACION ###",
    "NUM VICTORIAS": "### NUM VICTORIAS ###",
}

/// Plantilla para poner los datos de varias personas dentro de una tabla
Surferos.plantillaTablaPersonas = {}


// Cabecera de la tabla
Surferos.plantillaTablaPersonas.cabecera = `<style>table, th, td { border: 1px solid black;}</style><table width="100%" class="listado-personas"><thead><th width="15%">Id</th><th width="10%">Nombre</th><th width="10%">Apellidos</th><th width="15%">Lugar nacimiento</th><th width="15%">Numero de campeonatos disputados</th><th width="20%">Años compitiendo</th><th width="10%">Puntuación máxima</th><th width="10%">Numero de victorias</th></thead><tbody>`;

// Elemento TR que muestra los datos de una persona
Surferos.plantillaTablaPersonas.cuerpo = `<tr title="${Surferos.plantillaTags.ID}"><td>${Surferos.plantillaTags.ID}</td><td>${Surferos.plantillaTags.NOMBRE}</td><td>${Surferos.plantillaTags.APELLIDOS}</td><td>${Surferos.plantillaTags.CIUDAD}, ${Surferos.plantillaTags.PAIS}</td><td>${Surferos.plantillaTags.NUM} (${Surferos.plantillaTags.EVENTO})</td><td>${Surferos.plantillaTags["AÑOS COMPITIENDO"]}</td><td>${Surferos.plantillaTags.PUNTUACION}</td><td>${Surferos.plantillaTags["NUM VICTORIAS"]}</td></tr>`;

// Pie de la tabla
Surferos.plantillaTablaPersonas.pie = `</tbody></table>`;




//-----------------------------------------------------------------------------------------------------------------------

Surferos.plantillaTablaNombres = {}


// Cabecera de la tabla
Surferos.plantillaTablaNombres.cabecera = function()
{ 
    return `<style>table, th, td {border: 1px solid black;}</style><table width="100%" class="listado-personas"><thead><th width="15%">Id</th><th width="10%">Nombre</th></thead><tbody>`;
}

// Elemento TR que muestra los datos de una persona
Surferos.plantillaTablaNombres.cuerpo = function(campo)
{
    if(campo = "NOMBRE")
    return  "<tr title='"+ Surferos.plantillaTags.ID +"'><td>"+ Surferos.plantillaTags.ID+ "</td><td>" + Surferos.plantillaTags.NOMBRE + "</td></tr>";
    else if(campo = "APELLIDOS")
    return  "<tr title='"+ Surferos.plantillaTags.ID +"'><td>"+ Surferos.plantillaTags.ID+ "</td><td>" + Surferos.plantillaTags.APELLIDOS + "</td></tr>";

}

// Pie de la tabla
Surferos.plantillaTablaNombres.pie = function()
{
    return "</tbody></table>";
}



/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {surfero} Surferos Objeto con los datos de la surfero que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Surferos.sustituyeTags = function (plantilla, surfero) {
    return plantilla
        .replace(new RegExp(Surferos.plantillaTags.ID, 'g'), surfero.ref['@ref'].id)
        .replace(new RegExp(Surferos.plantillaTags.NOMBRE, 'g'), surfero.data.nombre)
        .replace(new RegExp(Surferos.plantillaTags.APELLIDOS, 'g'), surfero.data.apellidos)
        .replace(new RegExp(Surferos.plantillaTags["CIUDAD"], 'g'), surfero.data.lugarNacimiento.ciudad)
        .replace(new RegExp(Surferos.plantillaTags["PAIS"], 'g'), surfero.data.lugarNacimiento.pais)
        .replace(new RegExp(Surferos.plantillaTags.NUM, 'g'), surfero.data.numCampeonatosDisputados.cantidad)
        .replace(new RegExp(Surferos.plantillaTags.EVENTO, 'g'), surfero.data.numCampeonatosDisputados.evento)
        .replace(new RegExp(Surferos.plantillaTags["AÑOS COMPITIENDO"], 'g'), surfero.data.añosCompitiendo)
        .replace(new RegExp(Surferos.plantillaTags.PUNTUACION, 'g'), surfero.data.puntuacion)
        .replace(new RegExp(Surferos.plantillaTags["NUM VICTORIAS"], 'g'), surfero.data.numVictorias)
}


/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Surferos} Surferos Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Surferos.plantillaTablaPersonas.actualiza = function (surfero) {
    return Surferos.sustituyeTags(this.cuerpo, surfero)
}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Surferos} Surferos Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Surferos.plantillaTablaNombres.actualiza = function (surfero, campo) {
    return Surferos.sustituyeTags(this.cuerpo(campo), surfero)
}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Surferos.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Surferos.plantillaTablaPersonas.cabecera
    vector.forEach(e => msj += Surferos.plantillaTablaPersonas.actualiza(e))
    msj += Surferos.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de datos completo", msj)
}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Surferos.imprimeMuchasPersonasN = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Surferos.plantillaTablaNombres.cabecera()
    vector.forEach(e => msj += Surferos.plantillaTablaNombres.actualiza(e))
    msj += Surferos.plantillaTablaNombres.pie()

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de nombres", msj)
}


/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Surferos.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/surferos/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Surferos.listar = function () {
    Surferos.recupera(Surferos.imprimeMuchasPersonas);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Surferos.procesarListaNombres = function () {
    this.descargarRuta("/surferos/getTodas", this.imprimeMuchasPersonas);
}

/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Surferos.listarNombres = function () {
    Surferos.recupera(Surferos.imprimeMuchasPersonasN);
}


/**
 * Función para guardar los nuevos datos de una persona
 */
Surferos.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/surferos/setTodo/"
        let id_persona = document.getElementById("form-persona-id").value
        let datosGuardar ={
            "id": id_persona,
            "nombre": document.getElementById("form-persona-nombre").value,
            "apellidos": document.getElementById("form-persona-apellidos").value,
            "ciudad": document.getElementById("form-persona-ciudad").value,
            "pais": document.getElementById("form-persona-pais").value,
            "puntuacion": document.getElementById("form-persona-puntuacion").value,
            "numVictorias": document.getElementById("form-persona-numVictorias").value
        }
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
            body: JSON.stringify(datosGuardar), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const persona = await response.json()
            alert(persona)
        }
        */
        Surferos.mostrar(id_persona)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}

/// Nombre de los campos del formulario para editar una persona
Surferos.form = {
    NOMBRE: "form-persona-nombre",
    APELLIDOS: "form-persona-apellidos",
    CIUDAD: "form-persona-ciudad",
    PAIS: "form-persona-pais",
    PUNTUACION: "form-persona-puntuacion",
    NUMVICTORIAS: "form-persona-numVictorias",
}

/// Objeto para almacenar los datos de la persona que se está mostrando
Surferos.personaMostrada = null

Surferos.plantillaFormularioPersona = {}

// Cabecera del formulario
Surferos.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
        <th width="15%">Id</th>
        <th width="10%">Nombre</th>
        <th width="10%">Apellidos</th>
        <th width="15%">Ciudad</th>
        <th width="25%">País</th>
        <th width="10%">Puntuación máxima</th>
        <th width="5%">Numero de victorias</th>
        </thead>
        <tbody>
            <tr title="${Surferos.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Surferos.plantillaTags.ID}" 
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Surferos.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-apellidos" value="${Surferos.plantillaTags.APELLIDOS}" 
                        name="apellidos_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-ciudad" required value="${Surferos.plantillaTags["CIUDAD"]}" 
                        name="email_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-pais" required value="${Surferos.plantillaTags["PAIS"]}" 
                        name="año_entrada_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-añosCompitiendo" required
                        value="${Surferos.plantillaTags["AÑOS COMPITIENDO"]}" 
                        name="año_entrada_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-puntuacion" required value="${Surferos.plantillaTags.PUNTUACION}" 
                        name="email_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-numVictorias" required value="${Surferos.plantillaTags["NUM VICTORIAS"]}" 
                        name="email_persona"/></td>
            </tr>
        </tbody>
    </table>
    <br/>
                <br/>
                <td>
                    <div><a href="javascript:Surferos.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Surferos.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Surferos.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
</form>
`;



/**
 * Imprime los datos de una persona como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Surferos.personaComoFormulario = function (surfero) {
    return Surferos.plantillaFormularioPersona.actualiza( surfero );
}

/**
 * Actualiza el formulario con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Surferos.plantillaFormularioPersona.actualiza = function (surfero) {
    return Surferos.sustituyeTags(this.formulario, surfero)
}

/**
 * Imprime los datos de una persona como una tabla usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Surferos.personaComoTabla = function (surfero) {
    return Surferos.plantillaTablaPersonas.cabecera
        + Surferos.plantillaTablaPersonas.actualiza(surfero)
        + Surferos.plantillaTablaPersonas.pie;
}

/**
 * Almacena los datos de la persona que se está mostrando
 * @param {Persona} persona Datos de la persona a almacenar
 */

Surferos.almacenaDatos = function (surfero) {
    Surferos.personaMostrada = surfero;
}

/**
 * Recupera los valores almacenados de la persona que se estaba mostrando
 * @return Datos de la persona a almacenada
 */

Surferos.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Surferos.imprimeUnaPersona = function (surfero) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Surferos.personaComoFormulario(surfero);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Surferos.almacenaDatos(surfero)
}

/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idSurfero Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Surferos.recuperaUnaPersona = async function (idSurfero, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/surferos/getPorId/" + idSurfero
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}


/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idSurfero Identificador de la persona a mostrar
 */
Surferos.mostrar = function (idSurfero) {
    this.recuperaUnaPersona(idSurfero, this.imprimeUnaPersona);
}

/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Surferos.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Surferos.form) {
        document.getElementById(Surferos.form[campo]).disabled = deshabilitando
    }
    return this
}


/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Surferos.deshabilitarCamposEditables = function () {
    Surferos.habilitarDeshabilitarCamposEditables(true)
    return this
}


/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Surferos.habilitarCamposEditables = function () {
    Surferos.habilitarDeshabilitarCamposEditables(false)
    return this
}


/**
 * ????Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Surferos.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}

/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Surferos.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}


/**
 * Muestra todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Surferos.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Surferos.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}


/**
 * Oculta las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Surferos.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}


/**
 * Función que permite modificar los datos de una persona
 */
Surferos.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de una persona
 */
Surferos.cancelar = function () {
    this.imprimeUnaPersona(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

Surferos.procesarListarNombresOrdenados = function () {
    this.recupera(this.imprimexNombre);
}

Surferos.procesarListarApellidosOrdenados = function () {
    this.recupera(this.imprimexApellidos);
}


Surferos.ordenarPorNombre = function (vector) {
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
Surferos.ordenarPorApellido = function (vector) {
    vector.sort(function(a, b){
        var nombreA = a.data.apellidos.toUpperCase(); // convierte los nombres a mayúsculas para ordenar correctamente
        var nombreB = b.data.apellidos.toUpperCase();
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    });
}
Surferos.ordenarPorCiudad = function (vector) {
    vector.sort(function(a, b){
        var nombreA = a.data.lugarNacimiento.ciudad.toUpperCase(); // convierte los nombres a mayúsculas para ordenar correctamente
        var nombreB = b.data.lugarNacimiento.ciudad.toUpperCase();
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    });
}
Surferos.ordenarPorPais = function (vector) {
    vector.sort(function(a, b){
        var nombreA = a.data.lugarNacimiento.pais.toUpperCase(); // convierte los nombres a mayúsculas para ordenar correctamente
        var nombreB = b.data.lugarNacimiento.pais.toUpperCase();
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    });
}

Surferos.ordenarPorVictoriasEv = function (vector) {
    vector.sort(function(a, b){
        var nombreA = a.data.numCampeonatosDisputados.cantidad; // convierte los nombres a mayúsculas para ordenar correctamente
        var nombreB = b.data.numCampeonatosDisputados.cantidad;
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    });
}

Surferos.ordenarPorEvento = function (vector) {
    vector.sort(function(a, b){
        var nombreA = a.data.numCampeonatosDisputados.evento.toUpperCase(); // convierte los nombres a mayúsculas para ordenar correctamente
        var nombreB = b.data.numCampeonatosDisputados.evento.toUpperCase();
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    });
}

Surferos.ordenarPorPuntuacion = function (vector) {
    vector.sort(function(a, b){
        var nombreA = a.data.puntuacion; // convierte los nombres a mayúsculas para ordenar correctamente
        var nombreB = b.data.puntuacion;
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    });
}
Surferos.ordenarPorVictorias = function (vector) {
    vector.sort(function(a, b){
        var nombreA = a.data.numVictorias; // convierte los nombres a mayúsculas para ordenar correctamente
        var nombreB = b.data.numVictorias;
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    });
}
Surferos.imprimexNombre = function (vector,campo) {

    Surferos.ordenarPorNombre(vector); // ordena el vector por nombre
    let mensaje = "";
    mensaje += Surferos.plantillaTablaNombres.cabecera();
    vector.forEach(e => mensaje+= Surferos.plantillaTablaNombres.actualiza(e,campo))
    mensaje += Surferos.plantillaTablaNombres.pie();

    Frontend.Article.actualizar("Listado de personas ordenado por nombre", mensaje);
}
Surferos.imprimexApellidos = function (vector,campo) {
    if(num==0)
    Surferos.ordenarPorApellido(vector); // ordena el vector por nombre
    else if(num==1)
    Surferos.ordenarPorCiudad(vector);
    else if(num==2)
    Surferos.ordenarPorPais(vector);
    else if(num==3)
    Surferos.ordenarPorVictoriasEv(vector);
    else if(num==4)
    Surferos.ordenarPorEvento(vector);
    else if(num==5)
    Surferos.ordenarPorPuntuacion(vector);
    else if(num==6)
    Surferos.ordenarPorVictorias(vector);

    if(num==6)
    num=-1;
    
    num++;
    let mensaje = "";
    mensaje += Surferos.plantillaTablaPersonas.cabecera;
    vector.forEach(e => mensaje+= Surferos.plantillaTablaPersonas.actualiza(e,campo))
    mensaje += Surferos.plantillaTablaPersonas.pie;

    Frontend.Article.actualizar("Listado de personas ordenado por nombre", mensaje);
}

function mostrarOpcionessurf() 
{
    document.getElementById("opciones").style.display = "none";
     document.getElementById("opcionesVolleyPlaya").style.display = "none";
     document.getElementById("natacion").style.display = "none";
     document.getElementById("volley").style.display = "none";
     document.getElementById("surferos").style.display = "block";
  }