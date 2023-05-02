/**
 * @file ms-voleibol-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Volley en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Volley Home"
const TITULO_ACERCA_DE = "Volley Acerca de"
const TITULO_MOSTRAR_NOMBRES = "Listado de nombres de los jugadores"
const TITULO_MOSTRAR_DATOS = "Listado de datos de los jugadores"
const TITULO_MOSTRAR_ALFABETICAMENTE = "Listado de jugadores"
const TITULO_MOSTRAR_JUGADOR = "Mostrar un jugador"
 
const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

let jug1= {
    data: {
        nombre: "Tijana",
        apellidos: "Boskovic",
        nacimiento: {
          dia: 8,
          mes: 3,
          año: 1997
        },
        pais_nacimiento: "Serbia",
        participacionesMundial: [
          2014,
          2018
        ],
        numParticipaciones: 2,
        club_actual: "Eczacibasi VitrA Istanbul",
        posicion: "Opuesta"
      }
  }

let jugadores = [
{
    ref: {
        "@ref": {
            id: "ref jug 1"
        }
    },
    data: {
    nombre: "Tijana",
    apellidos: "Boskovic",
    nacimiento: 1997,
    pais_nacimiento: "Serbia",
    participacionesMundial: [
        2014,
        2018
    ],
    numParticipaciones: 2,
    club_actual: "Eczacibasi VitrA Istanbul",
    posicion: "Opuesta"
    }
},
{
    ref: {
        "@ref": {
            id: "ref jug 2"
        }
    },
    data: {
    nombre: "Nataliya",
    apellidos: "Goncharova",
    nacimiento: 1990,
    pais_nacimiento: "Rusia",
    participacionesMundial: [
        2010,
        2014,
        2018
    ],
    numParticipaciones: 3,
    club_actual: "Dinamo Moscow",
    posicion: "Opuesta"
    }
},
{
    ref: {
        "@ref": {
            id: "ref jug 3"
        }
    },
    data: {
      nombre: "Facundo",
      apellidos: "Conte",
      nacimiento: 1989,
      pais_nacimiento: "Argentina",
      participacionesMundial: [
        2010,
        2014,
        2018,
        2022
      ],
      numParticipaciones: 4,
      club_actual: "Modena Volley",
      posicion: "Receptor-punta"
    }
  }
  
];
  
// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Volley.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Volley.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Volley.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Volley.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Volley.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Volley.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Volley.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Volley.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Volley.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Volley.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Volley.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Volley.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Volley.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Volley.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Volley.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Volley.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Volley.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Volley.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Volley.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Volley.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Volley.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Volley.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Volley.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Volley.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Volley.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Volley.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })

    
})
describe("Volley.soloNombre: ", function () {
    it("muestra el nombre del jugador en cuestión correctamente",
        function () {
            Volley.soloNombre(jug1)
            expect(Volley.soloNombre(jug1)).toBe(`<tr><td><em>${jug1.data.nombre}</em></td></tr>`)
        })

    
})

describe("Volley.imprimeNombre: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Volley.imprimeNombre(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_NOMBRES)
    }
    )

    it("Muestra correctamente el contenido de la tabla con los dos jugadores de prueba. ",
    function (){
        Volley.imprimeNombre(jugadores)
        expect(elementoContenido.innerHTML.search(jugadores[0].data.nombre)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[1].data.nombre)>= 0).toBeTrue();
    }
    )
})

describe("Volley.listar: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Volley.imprime(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_DATOS)
    }
    )
    it("Muestra correctamente el contenido de la tabla con los dos jugadores de prueba. ",
    function (){
        Volley.imprime(jugadores)
        expect(elementoContenido.innerHTML.search(jugadores[0].data.nombre)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[0].data.pais_nacimiento)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[0].data.apellidos)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[0].data.nombre)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[1].data.numParticipaciones)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[1].data.posicion)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[1].data.club_actual)>= 0).toBeTrue();
    }
    )
})

describe("Volley.listarAlfabeticamenteNombre: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Volley.imprimeAlfabeticamenteNombre(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_ALFABETICAMENTE)
    }
    )

    it("Ordena correctamente el vector de jugadores ",
    function (){
        // Tijana, Nataliya, Facundo ---> Facundo, Nataliya, Tijana
        Volley.imprimeAlfabeticamenteNombre(jugadores)
        expect(jugadores[0].data.nombre).toBe("Facundo");
        expect(jugadores[1].data.nombre).toBe("Nataliya");
        expect(jugadores[2].data.nombre).toBe("Tijana");
    }
    )
})

describe("Volley.listarAlfabeticamenteApellidos: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Volley.imprimeAlfabeticamenteApellidos(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_ALFABETICAMENTE)
    }
    )

    it("Ordena correctamente el vector de jugadores ",
    function (){
        Volley.imprimeAlfabeticamenteApellidos(jugadores)
        expect(jugadores[0].data.apellidos).toBe("Boskovic");
        expect(jugadores[1].data.apellidos).toBe("Conte");
        expect(jugadores[2].data.apellidos).toBe("Goncharova");
    }
    )
})

describe("Volley.listarAlfabeticamentePais: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Volley.imprimeAlfabeticamentePais(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_ALFABETICAMENTE)
    }
    )

    it("Ordena correctamente el vector de jugadores ",
    function (){
        Volley.imprimeAlfabeticamentePais(jugadores)
        expect(jugadores[0].data.pais_nacimiento).toBe("Argentina");
        expect(jugadores[1].data.pais_nacimiento).toBe("Rusia");
        expect(jugadores[2].data.pais_nacimiento).toBe("Serbia");
    }
    )
})

describe("Volley.listarOrdenFecha: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Volley.imprimeOrdenFecha(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_ALFABETICAMENTE)
    }
    )

    it("Ordena correctamente el vector de jugadores ",
    function (){
        Volley.imprimeOrdenFecha(jugadores)
        expect(jugadores[0].data.nacimiento).toEqual(1989);
        expect(jugadores[1].data.nacimiento).toEqual(1990);
        expect(jugadores[2].data.nacimiento).toEqual(1997);
    }
    )
})

describe("Volley.listarOrdenParticipaciones: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Volley.imprimeOrdenParticipaciones(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_ALFABETICAMENTE)
    }
    )

    it("Ordena correctamente el vector de jugadores ",
    function (){
        Volley.imprimeOrdenParticipaciones(jugadores)
        expect(jugadores[0].data.numParticipaciones).toEqual(4);
        expect(jugadores[1].data.numParticipaciones).toEqual(3);
        expect(jugadores[2].data.numParticipaciones).toEqual(2);
    }
    )
})

describe("Volley.listarAlfabeticamenteClub: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Volley.imprimeAlfabeticamenteClub(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_ALFABETICAMENTE)
    }
    )

    it("Ordena correctamente el vector de jugadores ",
    function (){
        Volley.imprimeAlfabeticamenteClub(jugadores)
        expect(jugadores[0].data.club_actual).toBe("Dinamo Moscow");
        expect(jugadores[1].data.club_actual).toBe("Eczacibasi VitrA Istanbul");
        expect(jugadores[2].data.club_actual).toBe("Modena Volley");
    }
    )
})

describe("Volley.listarAlfabeticamentePosicion: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Volley.imprimeAlfabeticamentePosicion(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_ALFABETICAMENTE)
    }
    )

    it("Ordena correctamente el vector de jugadores ",
    function (){
        Volley.imprimeAlfabeticamentePosicion(jugadores)
        expect(jugadores[0].data.posicion).toBe("Opuesta");
        expect(jugadores[1].data.posicion).toBe("Opuesta");
        expect(jugadores[2].data.posicion).toBe("Receptor-punta");
    }
    )
})

describe("Volley.mostrarJugador(): ", function(){
    it("Muestra correctamente el titulo de la tabla. ",
    function(){
        Volley.imprimeJugador(jugadores[0])
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_JUGADOR)
    }
    )
    it("Muestra correctamente los datos del jugador ",
    function(){
        Volley.imprimeJugador(jugadores[0])
        expect(elementoContenido.innerHTML.search(jugadores[0].data.nombre)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[0].data.apellidos)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[0].data.posicion)>= 0).toBeTrue();
    }
    )

})

describe("Volley.mostrarOtroJugador(): ", function(){
    it("Pasa correctamente al siguiente jugador",
    function(){
        hacia_donde = 1;
        pos = 0; // Empieza en el jugador 0
        Volley.imprimeOtroJugador(jugadores);
        expect(elementoContenido.innerHTML.search(jugadores[1].data.nombre)>= 0).toBeTrue(); // Muestra el jugador 1

        pos = 1; // Empieza en el jugador 1
        Volley.imprimeOtroJugador(jugadores);
        expect(elementoContenido.innerHTML.search(jugadores[2].data.nombre)>= 0).toBeTrue(); // Muestra el jugador 2
    }
    )
    it("Vuelve correctamente al jugador anterior",
    function(){
        hacia_donde = -1;
        pos = 0; // Empieza en el jugador 0
        Volley.imprimeOtroJugador(jugadores);
        expect(elementoContenido.innerHTML.search(jugadores[2].data.nombre)>= 0).toBeTrue(); // Muestra el jugador 2

        pos = 1; // Empieza en el jugador 1
        Volley.imprimeOtroJugador(jugadores);
        expect(elementoContenido.innerHTML.search(jugadores[0].data.nombre)>= 0).toBeTrue(); // Muestra el jugador 0
    }
    )

})

describe("Volley.mostrarOtroJugador(): ", function(){
    it("Pasa correctamente al siguiente jugador",
    function(){
        hacia_donde = 1;
        pos = 0; // Empieza en el jugador 0
        Volley.imprimeOtroJugador(jugadores);
        expect(elementoContenido.innerHTML.search(jugadores[1].data.nombre)>= 0).toBeTrue(); // Muestra el jugador 1

        pos = 1; // Empieza en el jugador 1
        Volley.imprimeOtroJugador(jugadores);
        expect(elementoContenido.innerHTML.search(jugadores[2].data.nombre)>= 0).toBeTrue(); // Muestra el jugador 2
    }
    )
    it("Vuelve correctamente al jugador anterior",
    function(){
        hacia_donde = -1;
        pos = 0; // Empieza en el jugador 0
        Volley.imprimeOtroJugador(jugadores);
        expect(elementoContenido.innerHTML.search(jugadores[2].data.nombre)>= 0).toBeTrue(); // Muestra el jugador 2

        pos = 1; // Empieza en el jugador 1
        Volley.imprimeOtroJugador(jugadores);
        expect(elementoContenido.innerHTML.search(jugadores[0].data.nombre)>= 0).toBeTrue(); // Muestra el jugador 0
    }
    )

})

/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Volley.descargarRuta
 - Volley.procesarAcercaDe
 - Volley.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
