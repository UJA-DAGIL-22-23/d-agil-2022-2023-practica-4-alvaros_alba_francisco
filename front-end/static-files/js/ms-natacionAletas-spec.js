/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            natacion.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(natacion.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            natacion.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(natacion.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            natacion.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(natacion.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            natacion.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(natacion.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            natacion.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            natacion.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            natacion.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            natacion.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            natacion.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            natacion.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            natacion.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            natacion.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(natacion.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            natacion.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("Plantilla.cabeceraTablaNombres",function(){
    it("Tendría que devolver las etiquetas HTML para la cabecera de la tabla de listar personas.",
        function(){
            expect(natacion.cabeceraTablaNombres()).toBe('<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th></thead><tbody>');
        }
    );
});

describe("Plantilla.Pietabla", function () {
    it("Tendría que devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(natacion.pieTabla()).toBe("</tbody></table>");
        });
});

describe("Plantilla.cuerpoListarPersonas",function(){
    it("debería devolver una fila de tabla HTML con los datos de la persona proporcionada",
    function(){
        const personaPrueba = {ID: 1, nombre: 'Juan', apellidos: 'Pérez'};
        const fila = natacion.cuerpoListarPersonas({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td>Pérez</td></tr>');
    });

    it("debería manejar correctamente los valores nulos",function () {
        const personaPrueba = { ID: null, nombre: 'Juan', apellidos: 'González' };
        const fila = natacion.cuerpoListarPersonas({ data: personaPrueba });
        expect(fila).toBe('<tr><td></td><td>Juan</td><td>González</td></tr>');
      });
});

describe("Plantilla.imprime", function(){
    it("Deberia trabajar correctamente con vectores vacios", function(){
        const vector = [];
        const mensajeEsperado = natacion.cabeceraTablaNombres() + natacion.pieTabla();
        const mensaje = natacion.imprime(vector);
        expect(mensaje).toBe(mensajeEsperado); 
    });
    
    it('debería devolver un mensaje con una tabla HTML que muestre los datos de las personas proporcionadas', function() {
        const vector = [
          { ID: 1, nombre: 'Juan', apellidos: 'Pérez' },
          { ID: 2, nombre: 'Ana', apellidos: 'García' },
          { ID: 3, nombre: 'Pedro', apellidos: 'López' }
        ];
        const mensajeEsperado = '<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th></thead><tbody>' + 
          '<tr><td>1</td><td>Juan</td><td>Pérez</td></tr>' +
          '<tr><td>2</td><td>Ana</td><td>García</td></tr>' +
          '<tr><td>3</td><td>Pedro</td><td>López</td></tr>' +
          "</tbody></table>"
        const mensaje = natacion.cabeceraTablaNombres() + natacion.cuerpoListarPersonas({ data: vector[0] }) + 
        natacion.cuerpoListarPersonas({ data: vector[1] })+ natacion.cuerpoListarPersonas({ data: vector[2] })+natacion.pieTabla();
        expect(mensaje).toBe(mensajeEsperado);
      }); 
});

describe("Plantilla.imprimeNombreOrdenado", function(){
    it("Tendría que trabajar correctamente con vectores vacios", function(){
        const vector = [];
        const mensajeEsperado = natacion.cabeceraTablaNombres() + natacion.pieTabla();
        const mensaje = natacion.imprimeNombreOrdenado(vector);
        expect(mensaje).toBe(mensajeEsperado); 
    });
    it("Tendría que actualizar correctamente el titulo", function(){
        const vector = [];
        natacion.imprimeNombreOrdenado(vector);
        const tituloEsperado = "Listado de personas ordenado";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
    });

    
});

describe("Plantilla.ordenarPorApellido", function(){
    it("Tendría que ordenar correctamente el vector", function(){
        let vector = [
            { data: {
            ID: 1000,
            nombre: "Francisco",
            apellidos: "Salazar Segovia",
            altura: 190,
            nacimiento: {
            dia: 5,
            mes: 9,
            año: 1989,
            lugar: "España"
            },
            participacionesJJOO: [
            2012,
            2016
            ],
            numPodiosConseguidos: 1
            }},
            { data: {
            ID: 1001,
            nombre: "Paula",
            apellidos: "Aguirre Rodriguez",
            altura: 178,
            nacimiento: {
            dia: 19,
            mes: 11,
            año: 1978,
            lugar: "Colombia"
            },
            participacionesJJOO: [
            1996,
            2000,
            2004
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
            ID: 1002,
            nombre: "Viktoriia",
            apellidos: "Uvarova ",
            altura: 182,
            nacimiento: {
            dia: 17,
            mes: 11,
            año: 1983,
            lugar: "Ucrania"
            },
            participacionesJJOO: [
            2004
            ],
            numPodiosConseguidos: 0
            }},
            { data:{
            ID: 1003,
            nombre: "Peter",
            apellidos: "Holoda ",
            altura: 196,
            nacimiento: {
            dia: 9,
            mes: 1,
            año: 1996,
            lugar: "Hungría"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
            ID: 1004,
            nombre: "Derin",
            apellidos: "Toparlak",
            altura: 193,
            nacimiento: {
            dia: 20,
            mes: 7,
            año: 1995,
            lugar: "Turquía"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 1
            }}];  
            
            let vectorEsperado = [
                { data: {
                ID: 1001,
                nombre: "Paula",
                apellidos: "Aguirre Rodriguez",
                altura: 178,
                nacimiento: {
                dia: 19,
                mes: 11,
                año: 1978,
                lugar: "Colombia"
                },
                participacionesJJOO: [
                1996,
                2000,
                2004
                ],
                numPodiosConseguidos: 2
                }},
                { data:{
                    ID: 1003,
                    nombre: "Peter",
                    apellidos: "Holoda ",
                    altura: 196,
                    nacimiento: {
                    dia: 9,
                    mes: 1,
                    año: 1996,
                    lugar: "Hungría"
                    },
                    participacionesJJOO: [
                    2016,
                    2021
                    ],
                    numPodiosConseguidos: 2
                    }},
                { data: {
                    ID: 1000,
                    nombre: "Francisco",
                    apellidos: "Salazar Segovia",
                    altura: 190,
                    nacimiento: {
                    dia: 5,
                    mes: 9,
                    año: 1989,
                    lugar: "España"
                    },
                    participacionesJJOO: [
                    2012,
                    2016
                    ],
                    numPodiosConseguidos: 1
                    }}
                    ,{ data:{
                        ID: 1004,
                        nombre: "Derin",
                        apellidos: "Toparlak",
                        altura: 193,
                        nacimiento: {
                        dia: 20,
                        mes: 7,
                        año: 1995,
                        lugar: "Turquía"
                        },
                        participacionesJJOO: [
                        2016,
                        2021
                        ],
                        numPodiosConseguidos: 1
                        }},
                        { data:{
                            ID: 1002,
                            nombre: "Viktoriia",
                            apellidos: "Uvarova ",
                            altura: 182,
                            nacimiento: {
                            dia: 17,
                            mes: 11,
                            año: 1983,
                            lugar: "Ucrania"
                            },
                            participacionesJJOO: [
                            2004
                            ],
                            numPodiosConseguidos: 0
                            }}
                    
            ]
            natacion.ordenarPorApellido(vector);
            expect(vector).toEqual(vectorEsperado);

    });
    
    it("Tendría que dejar el vector tal cual esta si ya esta ordenado.", function(){
        let vector = [
            { data: {
            ID: 1001,
            nombre: "Paula",
            apellidos: "Aguirre Rodriguez",
            altura: 178,
            nacimiento: {
            dia: 19,
            mes: 11,
            año: 1978,
            lugar: "Colombia"
            },
            participacionesJJOO: [
            1996,
            2000,
            2004
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
                ID: 1003,
                nombre: "Peter",
                apellidos: "Holoda ",
                altura: 196,
                nacimiento: {
                dia: 9,
                mes: 1,
                año: 1996,
                lugar: "Hungría"
                },
                participacionesJJOO: [
                2016,
                2021
                ],
                numPodiosConseguidos: 2
                }},
            { data: {
                ID: 1000,
                nombre: "Francisco",
                apellidos: "Salazar Segovia",
                altura: 190,
                nacimiento: {
                dia: 5,
                mes: 9,
                año: 1989,
                lugar: "España"
                },
                participacionesJJOO: [
                2012,
                2016
                ],
                numPodiosConseguidos: 1
                }}
                ,{ data:{
                    ID: 1004,
                    nombre: "Derin",
                    apellidos: "Toparlak",
                    altura: 193,
                    nacimiento: {
                    dia: 20,
                    mes: 7,
                    año: 1995,
                    lugar: "Turquía"
                    },
                    participacionesJJOO: [
                    2016,
                    2021
                    ],
                    numPodiosConseguidos: 1
                    }},
                    { data:{
                        ID: 1002,
                        nombre: "Viktoriia",
                        apellidos: "Uvarova ",
                        altura: 182,
                        nacimiento: {
                        dia: 17,
                        mes: 11,
                        año: 1983,
                        lugar: "Ucrania"
                        },
                        participacionesJJOO: [
                        2004
                        ],
                        numPodiosConseguidos: 0
                        }}
                
        ]

        let vectorEsperado = [
            { data: {
            ID: 1001,
            nombre: "Paula",
            apellidos: "Aguirre Rodriguez",
            altura: 178,
            nacimiento: {
            dia: 19,
            mes: 11,
            año: 1978,
            lugar: "Colombia"
            },
            participacionesJJOO: [
            1996,
            2000,
            2004
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
                ID: 1003,
                nombre: "Peter",
                apellidos: "Holoda ",
                altura: 196,
                nacimiento: {
                dia: 9,
                mes: 1,
                año: 1996,
                lugar: "Hungría"
                },
                participacionesJJOO: [
                2016,
                2021
                ],
                numPodiosConseguidos: 2
                }},
            { data: {
                ID: 1000,
                nombre: "Francisco",
                apellidos: "Salazar Segovia",
                altura: 190,
                nacimiento: {
                dia: 5,
                mes: 9,
                año: 1989,
                lugar: "España"
                },
                participacionesJJOO: [
                2012,
                2016
                ],
                numPodiosConseguidos: 1
                }}
                ,{ data:{
                    ID: 1004,
                    nombre: "Derin",
                    apellidos: "Toparlak",
                    altura: 193,
                    nacimiento: {
                    dia: 20,
                    mes: 7,
                    año: 1995,
                    lugar: "Turquía"
                    },
                    participacionesJJOO: [
                    2016,
                    2021
                    ],
                    numPodiosConseguidos: 1
                    }},
                    { data:{
                        ID: 1002,
                        nombre: "Viktoriia",
                        apellidos: "Uvarova ",
                        altura: 182,
                        nacimiento: {
                        dia: 17,
                        mes: 11,
                        año: 1983,
                        lugar: "Ucrania"
                        },
                        participacionesJJOO: [
                        2004
                        ],
                        numPodiosConseguidos: 0
                        }}
                
        ]
        natacion.ordenarPorApellido(vector)
        expect(vector).toEqual(vectorEsperado);
    });

    
});

describe("Plantilla.cabeceraTablaConTodo", function(){
    it("Tendría que devolver las etiquetas HTML para la cabecera de la tabla de listar personas con todos sus datos.", function(){
        expect(natacion.cabeceraTablaConTodo()).toBe('<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Altura (cm)</th><th>Nacimiento</th><th>Participaciones en JJOO</th><th>Podios conseguidos</th></thead><tbody>');
    });
});

describe("Plantilla.cuerpoListarConTodo",function(){
    it("debería devolver una fila de tabla HTML con los datos de la persona proporcionada",
    function(){
        const personaPrueba = {ID: 1, nombre: 'Juan', apellidos: 'Pérez', altura: '190', nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: '1', numPodiosConseguidos: '1'};
        const fila = natacion.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td>Pérez</td><td>190</td><td>1/1/1 en España</td><td>1</td><td>1</td></tr>');
    });

    it("debería manejar correctamente los valores nulos e indefinidos",function () {
        let personaPrueba = {ID: 1, nombre: null, apellidos: 'Pérez', altura: '190', nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: '1', numPodiosConseguidos: '1'};
        let fila = natacion.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td></td><td>Pérez</td><td>190</td><td>1/1/1 en España</td><td>1</td><td>1</td></tr>');
        
        personaPrueba = {ID: undefined, nombre: 'Juan', apellidos: 'Pérez', altura: '190', nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: '1', numPodiosConseguidos: '1'};
        fila = natacion.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td></td><td>Juan</td><td>Pérez</td><td>190</td><td>1/1/1 en España</td><td>1</td><td>1</td></tr>');
    
        personaPrueba = {ID: 1, nombre: 'Juan', apellidos: undefined, altura: '190', nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: '1', numPodiosConseguidos: '1'};
        fila = natacion.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td></td><td>190</td><td>1/1/1 en España</td><td>1</td><td>1</td></tr>');
    
        personaPrueba = {ID: 1, nombre: 'Juan', apellidos: 'Pérez', altura: null, nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: '1', numPodiosConseguidos: '1'};
        fila = natacion.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td>Pérez</td><td></td><td>1/1/1 en España</td><td>1</td><td>1</td></tr>');
    
        personaPrueba = {ID: 1, nombre: 'Juan', apellidos: 'Pérez', altura: '190', nacimiento: undefined, participacionesJJOO: '1', numPodiosConseguidos: '1'};
        fila = natacion.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td>Pérez</td><td>190</td><td></td><td>1</td><td>1</td></tr>');
    
        personaPrueba = {ID: 1, nombre: 'Juan', apellidos: 'Pérez', altura: '190', nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: null, numPodiosConseguidos: '1'};
        fila = natacion.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td>Pérez</td><td>190</td><td>1/1/1 en España</td><td></td><td>1</td></tr>');
    
        personaPrueba = {ID: 1, nombre: 'Juan', apellidos: 'Pérez', altura: '190', nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: '1', numPodiosConseguidos: undefined};
        fila = natacion.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td>Pérez</td><td>190</td><td>1/1/1 en España</td><td>1</td><td></td></tr>');
        
    });
});

describe("Plantilla.imprimeConTodo", function(){
    it("Tendría que trabajar correctamente con vectores vacios", function(){
        const vector = [];
        const mensajeEsperado = natacion.cabeceraTablaConTodo() + natacion.pieTabla();
        const mensaje = natacion.imprimeConTodo(vector);
        expect(mensaje).toBe(mensajeEsperado); 
    });
    it("Tendría que actualizar correctamente el titulo", function(){
        const vector = [];
        natacion.imprimeConTodo(vector);
        const tituloEsperado = "Listado de personas con todo";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
    }); 
    it('debería devolver un mensaje con una tabla HTML que muestre los datos de las personas proporcionadas', function() {
        const personas = [
            {
              ID: 1,
              nombre: 'Juan',
              apellidos: 'Pérez',
              altura: '190',
              nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'},
              participacionesJJOO: '1',
              numPodiosConseguidos: '1'
            },
            {
              ID: 2,
              nombre: 'María',
              apellidos: 'García',
              altura: '165',
              nacimiento: {dia: '10', mes: '5', año: '1990', lugar: 'México'},
              participacionesJJOO: '2',
              numPodiosConseguidos: '3'
            },
            {
              ID: 3,
              nombre: 'Pedro',
              apellidos: 'Rodríguez',
              altura: '180',
              nacimiento: {dia: '15', mes: '3', año: '1985', lugar: 'Argentina'},
              participacionesJJOO: '3',
              numPodiosConseguidos: '2'
            }
          ];
        let mensajeEsperado =  natacion.cabeceraTablaConTodo()
        personas.forEach(persona => {
            const fila = `<tr><td>${persona.ID}</td><td>${persona.nombre}</td><td>${persona.apellidos}</td><td>${persona.altura}</td><td>${persona.nacimiento.dia}/${persona.nacimiento.mes}/${persona.nacimiento.año} en ${persona.nacimiento.lugar}</td><td>${persona.participacionesJJOO}</td><td>${persona.numPodiosConseguidos}</td></tr>`;
            mensajeEsperado = mensajeEsperado + fila;
        });
            mensajeEsperado=mensajeEsperado+natacion.pieTabla();
        const mensaje = natacion.cabeceraTablaConTodo() + natacion.cuerpoListarConTodo({ data: personas[0] }) + 
        natacion.cuerpoListarConTodo({ data: personas[1] })+ natacion.cuerpoListarConTodo({ data: personas[2] })+natacion.pieTabla();
        expect(mensaje).toBe(mensajeEsperado);
      }); 

      
    
});

describe("Plantilla.nuevoOrden", function() {
    beforeEach(function() {
        vDatos = [
            { data: {
            ID: 1000,
            nombre: "Francisco",
            apellidos: "Salazar Segovia",
            altura: 190,
            nacimiento: {
            dia: 5,
            mes: 9,
            año: 1989,
            lugar: "España"
            },
            participacionesJJOO: [
            2012,
            2016
            ],
            numPodiosConseguidos: 1
            }},
            { data: {
            ID: 1001,
            nombre: "Paula",
            apellidos: "Aguirre Rodriguez",
            altura: 178,
            nacimiento: {
            dia: 19,
            mes: 11,
            año: 1978,
            lugar: "Colombia"
            },
            participacionesJJOO: [
            1996,
            2000,
            2004
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
            ID: 1002,
            nombre: "Viktoriia",
            apellidos: "Uvarova ",
            altura: 182,
            nacimiento: {
            dia: 17,
            mes: 11,
            año: 1983,
            lugar: "Ucrania"
            },
            participacionesJJOO: [
            2004
            ],
            numPodiosConseguidos: 0
            }},
            { data:{
            ID: 1003,
            nombre: "Peter",
            apellidos: "Holoda ",
            altura: 196,
            nacimiento: {
            dia: 9,
            mes: 1,
            año: 1996,
            lugar: "Hungría"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
            ID: 1004,
            nombre: "Derin",
            apellidos: "Toparlak",
            altura: 193,
            nacimiento: {
            dia: 20,
            mes: 7,
            año: 1995,
            lugar: "Turquía"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 1
            }},
            { data:{
            ID: 1005,
            nombre: "Dora",
            apellidos: "Bassi",
            altura: 190,
            nacimiento: {
            dia: 12,
            mes: 4,
            año: 1999,
            lugar: "Croacia"
            },
            participacionesJJOO: [
            2021
            ],
            numPodiosConseguidos: 0
            }},
            { data:{
            ID: 1006,
            nombre: "Justus",
            apellidos: "Mörstedt",
            altura: 187,
            nacimiento: {
            dia: 13,
            mes: 5,
            año: 1992,
            lugar: "Alemania"
            },
            participacionesJJOO: [
            2012,
            2016,
            2021
            ],
            numPodiosConseguidos: 0
            }},
            {data:{
                ID: 1007,
                nombre: "Stefano",
                apellidos: "Figini",
                altura: 190,
                nacimiento: {
                dia: 14,
                mes: 6,
                año: 1987,
                lugar: "Italia"
                },
                participacionesJJOO: [
                2008,
                2012,
                2016,
                2021
                ],
                numPodiosConseguidos: 3
                }},
                { data:{
                ID: 1008,
                nombre: "Cesare",
                apellidos: "Fumarola",
                altura: 195,
                nacimiento: {
                dia: 23,
                mes: 1,
                año: 1991,
                lugar: "Italia"
                },
                participacionesJJOO: [
                2012,
                2016
                ],
                numPodiosConseguidos: 1
                }},
                { data:{
                ID: 1009,
                nombre: "Manuel",
                apellidos: "García Rivas",
                altura: 198,
                nacimiento: {
                dia: 28,
                mes: 7,
                año: 1989,
                lugar: "España"
                },
                participacionesJJOO: [
                2008,
                2012,
                2016,
                2021
                ],
                numPodiosConseguidos: 4
                }},
                { data:{
                ID: 1010,
                nombre: "Dymitro",
                apellidos: "Shekera",
                altura: 189,
                nacimiento: {
                dia: 1,
                mes: 12,
                año: 1993,
                lugar: "Rusia"
                },
                participacionesJJOO: [
                2012,
                2016
                ],
                numPodiosConseguidos: 0
                }},
            ];
        tipoOrden = 0;
      });
      it("debe ordenar los datos por ID", function() {
        natacion.nuevoOrden();
        expect(vDatos[0].data.ID).toEqual(1000);
        expect(vDatos[1].data.ID).toEqual(1001);
        expect(vDatos[2].data.ID).toEqual(1002);
      });
    
      it("debe ordenar los datos por Nombre", function() {
        tipoOrden = 1; // Simula un click en el botón 
        natacion.nuevoOrden();
        expect(vDatos[0].data.nombre).toEqual("Cesare");
        expect(vDatos[1].data.nombre).toEqual("Derin");
        expect(vDatos[2].data.nombre).toEqual("Dora");
       });
    
      it("debe ordenar los datos por Apellidos", function() {
        tipoOrden = 2; // Simula un click en el botón 
        natacion.nuevoOrden();
        expect(vDatos[0].data.apellidos).toEqual("Aguirre Rodriguez");
        expect(vDatos[1].data.apellidos).toEqual("Bassi");
        expect(vDatos[2].data.apellidos).toEqual("Figini");
      });
    
      it("debe ordenar los datos por Altura", function() {
        tipoOrden = 3; // Simula un click en el botón 
        natacion.nuevoOrden();
        expect(vDatos[0].data.altura).toEqual(178);
        expect(vDatos[1].data.altura).toEqual(182);
        expect(vDatos[2].data.altura).toEqual(187);
      });
    
      it("debe ordenar los datos por Número de podios conseguidos", function() {
        tipoOrden = 4; // Simula un click en el botón 
        natacion.nuevoOrden();
        expect(vDatos[0].data.numPodiosConseguidos).toEqual(0);
        expect(vDatos[1].data.numPodiosConseguidos).toEqual(0);
        expect(vDatos[2].data.numPodiosConseguidos).toEqual(0);
      });
    
    
   
  }); 

  
  
describe("Plantilla.creaBoton", function(){
    it("Tendría que devolver las etiquetas HTML para el botón y saber en que orden se encuentra en ese momento.", function(){
        const tipoOrdenes = ['ID', 'Nombre', 'Apellidos', 'Altura', 'Número de podios conseguidos'];
        tipoOrden = 0;
        expect(natacion.creaBoton()).toContain('<button class="miBoton" onclick="Plantilla.nuevoOrden()">Cambiar orden</button>');
        expect(natacion.creaBoton()).toContain(`<a class="subtitulo">Ordenado por ${tipoOrdenes[tipoOrden % 5]}</a>`);
        
    });
});

describe("Plantilla.imprimeConBoton", function(){
    it("Tendría que actualizar correctamente el titulo", function(){
        const vector = [];
        natacion.imprimeConBoton(vector);
        const tituloEsperado = "Listado de personas con diferente orden";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
    });
    
});

describe("Plantilla.buscarPersona", function(){
    beforeEach(function() {
        vDatos = [
            { data: {
            ID: 1000,
            nombre: "Francisco",
            apellidos: "Salazar Segovia",
            altura: 190,
            nacimiento: {
            dia: 5,
            mes: 9,
            año: 1989,
            lugar: "España"
            },
            participacionesJJOO: [
            2012,
            2016
            ],
            numPodiosConseguidos: 1
            }},
            { data: {
            ID: 1001,
            nombre: "Paula",
            apellidos: "Aguirre Rodriguez",
            altura: 178,
            nacimiento: {
            dia: 19,
            mes: 11,
            año: 1978,
            lugar: "Colombia"
            },
            participacionesJJOO: [
            1996,
            2000,
            2004
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
            ID: 1002,
            nombre: "Viktoriia",
            apellidos: "Uvarova ",
            altura: 182,
            nacimiento: {
            dia: 17,
            mes: 11,
            año: 1983,
            lugar: "Ucrania"
            },
            participacionesJJOO: [
            2004
            ],
            numPodiosConseguidos: 0
            }},
            { data:{
            ID: 1003,
            nombre: "Peter",
            apellidos: "Holoda ",
            altura: 196,
            nacimiento: {
            dia: 9,
            mes: 1,
            año: 1996,
            lugar: "Hungría"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
            ID: 1004,
            nombre: "Derin",
            apellidos: "Toparlak",
            altura: 193,
            nacimiento: {
            dia: 20,
            mes: 7,
            año: 1995,
            lugar: "Turquía"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 1
            }},
            { data:{
            ID: 1005,
            nombre: "Dora",
            apellidos: "Bassi",
            altura: 190,
            nacimiento: {
            dia: 12,
            mes: 4,
            año: 1999,
            lugar: "Croacia"
            },
            participacionesJJOO: [
            2021
            ],
            numPodiosConseguidos: 0
            }},
            { data:{
            ID: 1006,
            nombre: "Justus",
            apellidos: "Mörstedt",
            altura: 187,
            nacimiento: {
            dia: 13,
            mes: 5,
            año: 1992,
            lugar: "Alemania"
            },
            participacionesJJOO: [
            2012,
            2016,
            2021
            ],
            numPodiosConseguidos: 0
            }},
            {data:{
                ID: 1007,
                nombre: "Stefano",
                apellidos: "Figini",
                altura: 190,
                nacimiento: {
                dia: 14,
                mes: 6,
                año: 1987,
                lugar: "Italia"
                },
                participacionesJJOO: [
                2008,
                2012,
                2016,
                2021
                ],
                numPodiosConseguidos: 3
                }},
                { data:{
                ID: 1008,
                nombre: "Cesare",
                apellidos: "Fumarola",
                altura: 195,
                nacimiento: {
                dia: 23,
                mes: 1,
                año: 1991,
                lugar: "Italia"
                },
                participacionesJJOO: [
                2012,
                2016
                ],
                numPodiosConseguidos: 1
                }},
                { data:{
                ID: 1009,
                nombre: "Manuel",
                apellidos: "García Rivas",
                altura: 198,
                nacimiento: {
                dia: 28,
                mes: 7,
                año: 1989,
                lugar: "España"
                },
                participacionesJJOO: [
                2008,
                2012,
                2016,
                2021
                ],
                numPodiosConseguidos: 4
                }},
                { data:{
                ID: 1010,
                nombre: "Dymitro",
                apellidos: "Shekera",
                altura: 189,
                nacimiento: {
                dia: 1,
                mes: 12,
                año: 1993,
                lugar: "Rusia"
                },
                participacionesJJOO: [
                2012,
                2016
                ],
                numPodiosConseguidos: 0
                }},
            ];
        tipoOrden = 0;
      });
    it("Tendría que trabajar correctamente si no se encuentra la persona", function(){
        expect(natacion.buscarPersona(111111)).toBe(undefined); 
        expect(natacion.buscarPersona(undefined)).toBe(undefined); 
    });
    it("Tendría que encontrar correctamente a las personas", function(){   
        let persona = vDatos[0];
        expect(natacion.buscarPersona(1000)).toEqual(persona);
        persona = vDatos[1];
        expect(natacion.buscarPersona(1001)).toEqual(persona);
        persona = vDatos[2];
        expect(natacion.buscarPersona(1002)).toEqual(persona);
        persona = vDatos[3];
        expect(natacion.buscarPersona(1003)).toEqual(persona);
        persona = vDatos[4];
        expect(natacion.buscarPersona(1004)).toEqual(persona);
        persona = vDatos[5];
        expect(natacion.buscarPersona(1005)).toEqual(persona);
        persona = vDatos[6];
        expect(natacion.buscarPersona(1006)).toEqual(persona);
        persona = vDatos[7];
        expect(natacion.buscarPersona(1007)).toEqual(persona);
        persona = vDatos[8];
        expect(natacion.buscarPersona(1008)).toEqual(persona);
        persona = vDatos[9];
        expect(natacion.buscarPersona(1009)).toEqual(persona);
        persona = vDatos[10];
        expect(natacion.buscarPersona(1010)).toEqual(persona);
    });
    
});

describe("Plantilla.imprimeUnaPersona", function(){
    beforeEach(function() {
        vDatos = [
            { data: {
            ID: 1000,
            nombre: "Francisco",
            apellidos: "Salazar Segovia",
            altura: 190,
            nacimiento: {
            dia: 5,
            mes: 9,
            año: 1989,
            lugar: "España"
            },
            participacionesJJOO: [
            2012,
            2016
            ],
            numPodiosConseguidos: 1
            }},
            { data: {
            ID: 1001,
            nombre: "Paula",
            apellidos: "Aguirre Rodriguez",
            altura: 178,
            nacimiento: {
            dia: 19,
            mes: 11,
            año: 1978,
            lugar: "Colombia"
            },
            participacionesJJOO: [
            1996,
            2000,
            2004
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
            ID: 1002,
            nombre: "Viktoriia",
            apellidos: "Uvarova ",
            altura: 182,
            nacimiento: {
            dia: 17,
            mes: 11,
            año: 1983,
            lugar: "Ucrania"
            },
            participacionesJJOO: [
            2004
            ],
            numPodiosConseguidos: 0
            }},
            { data:{
            ID: 1003,
            nombre: "Peter",
            apellidos: "Holoda ",
            altura: 196,
            nacimiento: {
            dia: 9,
            mes: 1,
            año: 1996,
            lugar: "Hungría"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
            ID: 1004,
            nombre: "Derin",
            apellidos: "Toparlak",
            altura: 193,
            nacimiento: {
            dia: 20,
            mes: 7,
            año: 1995,
            lugar: "Turquía"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 1
            }},
            { data:{
            ID: 1005,
            nombre: "Dora",
            apellidos: "Bassi",
            altura: 190,
            nacimiento: {
            dia: 12,
            mes: 4,
            año: 1999,
            lugar: "Croacia"
            },
            participacionesJJOO: [
            2021
            ],
            numPodiosConseguidos: 0
            }},
            { data:{
            ID: 1006,
            nombre: "Justus",
            apellidos: "Mörstedt",
            altura: 187,
            nacimiento: {
            dia: 13,
            mes: 5,
            año: 1992,
            lugar: "Alemania"
            },
            participacionesJJOO: [
            2012,
            2016,
            2021
            ],
            numPodiosConseguidos: 0
            }},
            {data:{
                ID: 1007,
                nombre: "Stefano",
                apellidos: "Figini",
                altura: 190,
                nacimiento: {
                dia: 14,
                mes: 6,
                año: 1987,
                lugar: "Italia"
                },
                participacionesJJOO: [
                2008,
                2012,
                2016,
                2021
                ],
                numPodiosConseguidos: 3
                }},
                { data:{
                ID: 1008,
                nombre: "Cesare",
                apellidos: "Fumarola",
                altura: 195,
                nacimiento: {
                dia: 23,
                mes: 1,
                año: 1991,
                lugar: "Italia"
                },
                participacionesJJOO: [
                2012,
                2016
                ],
                numPodiosConseguidos: 1
                }},
                { data:{
                ID: 1009,
                nombre: "Manuel",
                apellidos: "García Rivas",
                altura: 198,
                nacimiento: {
                dia: 28,
                mes: 7,
                año: 1989,
                lugar: "España"
                },
                participacionesJJOO: [
                2008,
                2012,
                2016,
                2021
                ],
                numPodiosConseguidos: 4
                }},
                { data:{
                ID: 1010,
                nombre: "Dymitro",
                apellidos: "Shekera",
                altura: 189,
                nacimiento: {
                dia: 1,
                mes: 12,
                año: 1993,
                lugar: "Rusia"
                },
                participacionesJJOO: [
                2012,
                2016
                ],
                numPodiosConseguidos: 0
                }},
            ];
        tipoOrden = 0;
      });
    it("Tendría que trabajar correctamente con personas indefinidas", function(){
        let persona;
        expect(natacion.imprimeUnaPersona(persona)).toBe("No se ha encontrado a la persona"); 
    });
    it("Tendría que actualizar correctamente el titulo", function(){
        let persona;
        natacion.imprimeUnaPersona(persona);
        const tituloEsperado = "Mostrar una persona";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
    });
    it("Tendría que mostrar correctamente una persona", function(){
        let persona = vDatos[0];
        let mensajeEsperado = '<div class="botones"><button class="anterior" onclick="Plantilla.anteriorPersona(idActual)">Anterior</button><button class="siguiente" onclick="Plantilla.siguientePersona(idActual)">Siguiente</button></div>'+natacion.cabeceraTablaConTodo() + natacion.cuerpoListarConTodo(persona) + natacion.pieTabla();
        expect(natacion.imprimeUnaPersona(persona)).toBe(mensajeEsperado); 
    });
    
});

describe("Plantilla.siguientePersona", function(){
    it("Tendría que pasar correctamente a la siguiente persona", function(){
        let idEsperado = 1001
        let id=natacion.siguientePersona(idEsperado-1)
        expect(idEsperado).toEqual(id);
        idEsperado = 1003;
        id=natacion.siguientePersona(idEsperado-1)
        expect(idEsperado).toEqual(id);
    });
    it("Tendría que ser ciclico, es decir, pasar del último al primero", function(){
        let id = idUltimaPersona
        expect(natacion.siguientePersona(id)).toEqual(idPrimeraPersona);
    });
    
});

describe("Plantilla.anteriorPersona", function(){
    it("Tendría que pasar correctamente a la anterior persona", function(){
        let idEsperado = 1001
        let id=natacion.anteriorPersona(idEsperado+1)
        expect(idEsperado).toEqual(id);
        idEsperado = 1003;
        id=natacion.anteriorPersona(idEsperado+1)
        expect(idEsperado).toEqual(id);
    });
    it("Tendría que ser ciclico, es decir, pasar del primero al ultimo", function(){
        let id = idPrimeraPersona;
        expect(natacion.anteriorPersona(id)).toEqual(idUltimaPersona);
    });
});


describe("Plantilla.pantallaBuscarNombre", function () {
    it("Tendría que devolver las etiquetas HTML para la pagina de buscar por nombre",function () {
            expect(natacion.pantallaBuscarNombre()).toBe('<input type="text" id="buscar" placeholder="Introduce un nombre"><button onclick="Plantilla.busca(vDatos)">Buscar</button>');
    });
});

describe("Plantilla.mostrarPBuscada", function () {
    it("Tendría que devolver las etiquetas HTML para la pagina de la persona buscada",function () {
        let persona = { data:{
            ID: 1003,
            nombre: "Peter",
            apellidos: "Holoda ",
            altura: 196,
            nacimiento: {
            dia: 9,
            mes: 1,
            año: 1996,
            lugar: "Hungría"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 2
            }};
            let mensajeEsperado = '<input type="text" id="buscar" placeholder="Introduce un nombre"><button onclick="Plantilla.busca(vDatos)">Buscar</button>'+natacion.cabeceraTablaConTodo() + natacion.cuerpoListarConTodo(persona) + natacion.pieTabla()    
        expect(natacion.mostrarPBuscada(persona)).toBe(mensajeEsperado);
    });
    it("Tendría que devolver un mensaje de error si la persona esta indefinida",function () {
        let persona = undefined
            let mensajeEsperado = '<input type="text" id="buscar" placeholder="Introduce un nombre"><button onclick="Plantilla.busca(vDatos)">Buscar</button>' + '<div class="error"><p>¡Error! No se ha encontrado el nombre.</p> </div>'    
        expect(natacion.mostrarPBuscada(persona)).toBe(mensajeEsperado);
    });
});

describe("Plantilla.busca", function () {
    it("Tendría que devolver undefined si no se encuentra a la persona",function () {
        vector = [
            { data: {
            ID: 1000,
            nombre: "Francisco",
            apellidos: "Salazar Segovia",
            altura: 190,
            nacimiento: {
            dia: 5,
            mes: 9,
            año: 1989,
            lugar: "España"
            },
            participacionesJJOO: [
            2012,
            2016
            ],
            numPodiosConseguidos: 1
            }},
            { data: {
            ID: 1001,
            nombre: "Paula",
            apellidos: "Aguirre Rodriguez",
            altura: 178,
            nacimiento: {
            dia: 19,
            mes: 11,
            año: 1978,
            lugar: "Colombia"
            },
            participacionesJJOO: [
            1996,
            2000,
            2004
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
            ID: 1002,
            nombre: "Viktoriia",
            apellidos: "Uvarova ",
            altura: 182,
            nacimiento: {
            dia: 17,
            mes: 11,
            año: 1983,
            lugar: "Ucrania"
            },
            participacionesJJOO: [
            2004
            ],
            numPodiosConseguidos: 0
            }},
            { data:{
            ID: 1003,
            nombre: "Peter",
            apellidos: "Holoda ",
            altura: 196,
            nacimiento: {
            dia: 9,
            mes: 1,
            año: 1996,
            lugar: "Hungría"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
            ID: 1004,
            nombre: "Derin",
            apellidos: "Toparlak",
            altura: 193,
            nacimiento: {
            dia: 20,
            mes: 7,
            año: 1995,
            lugar: "Turquía"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 1
            }}];    
            const entrada = document.createElement("input");
            const boton = document.createElement("button");
    
            entrada.setAttribute("type", "text");
            entrada.setAttribute("value", undefined);
            entrada.setAttribute("id", "buscar");
            entrada.setAttribute("class", "prueba");
    
            document.body.appendChild(entrada)
            expect(natacion.busca(vector)).toEqual(natacion.mostrarPBuscada(undefined));
    });
});

describe("Plantilla.pantallaBuscarCampos", function () {
    it("Tendría que mostrar la pagina correctamente",function () {
        let mensaje = "";
        mensaje+='<input type="text" id="buscarID" placeholder="Introduce un ID"><button id="boton1" onclick="Plantilla.buscaDifParametros(vDatos,1)">Buscar</button>'  
    mensaje+='<input type="text" id="buscarApellidos" placeholder="Introduce unos apellidos"><button id="boton2" onclick="Plantilla.buscaDifParametros(vDatos,2)">Buscar</button>'
    mensaje+='<input type="number" id="buscarAltura" min = "0" placeholder="Altura maxima (cm)"><button id="boton3" onclick="Plantilla.buscaDifParametros(vDatos,3)">Buscar</button>'
    mensaje+='<input type="date" id="buscarFecha" placeholder="Introduce una fecha"><button id="boton4" onclick="Plantilla.buscaDifParametros(vDatos,4)">Buscar</button>'
    mensaje+='<input type="text" id="buscarLugar" placeholder="Introduce un lugar de nacimiento"><button id="boton5" onclick="Plantilla.buscaDifParametros(vDatos,5)">Buscar</button>'
    mensaje+='<input type="number" id="buscarAño" min = "0" placeholder="Año de participación"><button id="boton6" onclick="Plantilla.buscaDifParametros(vDatos,6)">Buscar</button>'
    mensaje+='<input type="number" id="buscarPodios" min = "0" placeholder="Introduce un numero de podios"><button id="boton7" onclick="Plantilla.buscaDifParametros(vDatos,7)">Buscar</button>'
        expect(natacion.pantalllaBuscarCampos()).toBe(mensaje);

    });
    it("Tendría que actualizar correctamente el titulo",function () {
        natacion.pantalllaBuscarCampos();
        const tituloEsperado = "Buscar persona por diferentes campos";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
    });
});

describe("Plantilla.imprimirPersonasBuscada", function () {
    it("Tendría que mostrar un mensaje de error para un vector vacio",function () {
        let mensaje = "";
        mensaje+='<input type="text" id="buscarID" placeholder="Introduce un ID"><button id="boton1" onclick="Plantilla.buscaDifParametros(vDatos,1)">Buscar</button>'  
        mensaje+='<input type="text" id="buscarApellidos" placeholder="Introduce unos apellidos"><button id="boton2" onclick="Plantilla.buscaDifParametros(vDatos,2)">Buscar</button>'
        mensaje+='<input type="number" id="buscarAltura" min = "0" placeholder="Altura maxima (cm)"><button id="boton3" onclick="Plantilla.buscaDifParametros(vDatos,3)">Buscar</button>'
        mensaje+='<input type="date" id="buscarFecha" placeholder="Introduce una fecha"><button id="boton4" onclick="Plantilla.buscaDifParametros(vDatos,4)">Buscar</button>'
        mensaje+='<input type="text" id="buscarLugar" placeholder="Introduce un lugar de nacimiento"><button id="boton5" onclick="Plantilla.buscaDifParametros(vDatos,5)">Buscar</button>'
        mensaje+='<input type="number" id="buscarAño" min = "0" placeholder="Año de participación"><button id="boton6" onclick="Plantilla.buscaDifParametros(vDatos,6)">Buscar</button>'
        mensaje+='<input type="number" id="buscarPodios" min = "0" placeholder="Introduce un numero de podios"><button id="boton7" onclick="Plantilla.buscaDifParametros(vDatos,7)">Buscar</button>'
        mensaje+='<div class="error"><p>¡Error! No se ha encontrado lo que buscabas.</p> </div>'
        let vector = []
        expect(natacion.imprimirPersonasBuscada(vector, 1)).toBe(mensaje);
    });
    it("Tendría que actualizar correctamente el titulo para los diferentes modos",function () {
        let vector = []
        natacion.imprimirPersonasBuscada(vector,1);
        let tituloEsperado = "ID buscada";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);

        natacion.imprimirPersonasBuscada(vector,2);
        tituloEsperado = "Apellidos buscados";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
        
        natacion.imprimirPersonasBuscada(vector,3);
        tituloEsperado = "Altura menores o iguales a la buscada";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
       
        natacion.imprimirPersonasBuscada(vector,4);
        tituloEsperado = "Personas con menos edad que la fecha introducida";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
        
        natacion.imprimirPersonasBuscada(vector,5);
        tituloEsperado = "Personas del lugar de nacimiento buscado";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
        
        natacion.imprimirPersonasBuscada(vector,6);
        tituloEsperado = "Personas que han participado en los JJOO en este año";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
       
        natacion.imprimirPersonasBuscada(vector,7);
        tituloEsperado = "Personas que han conseguido más podios de los buscados";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
    });
    it("Tendría que actualizar correctamente el titulo para modos incorrectos",function () {
        let vector = []
        natacion.imprimirPersonasBuscada(vector, undefined);
        let tituloEsperado = "Buscar persona por diferentes campos";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);

        natacion.imprimirPersonasBuscada(vector, 0);
        tituloEsperado = "Buscar persona por diferentes campos";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);

        natacion.imprimirPersonasBuscada(vector, null);
        tituloEsperado = "Buscar persona por diferentes campos";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);

        natacion.imprimirPersonasBuscada(vector, 8);
        tituloEsperado = "Buscar persona por diferentes campos";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
    });
    it("Tendría que mostrar correctamente a todas las personas del vector",function () {
        var vector = [
            { data: {
            ID: 1000,
            nombre: "Francisco",
            apellidos: "Salazar Segovia",
            altura: 190,
            nacimiento: {
            dia: 5,
            mes: 9,
            año: 1989,
            lugar: "España"
            },
            participacionesJJOO: [
            2012,
            2016
            ],
            numPodiosConseguidos: 1
            }},
            { data: {
            ID: 1001,
            nombre: "Paula",
            apellidos: "Aguirre Rodriguez",
            altura: 178,
            nacimiento: {
            dia: 19,
            mes: 11,
            año: 1978,
            lugar: "Colombia"
            },
            participacionesJJOO: [
            1996,
            2000,
            2004
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
            ID: 1002,
            nombre: "Viktoriia",
            apellidos: "Uvarova ",
            altura: 182,
            nacimiento: {
            dia: 17,
            mes: 11,
            año: 1983,
            lugar: "Ucrania"
            },
            participacionesJJOO: [
            2004
            ],
            numPodiosConseguidos: 0
            }},
            { data:{
            ID: 1003,
            nombre: "Peter",
            apellidos: "Holoda ",
            altura: 196,
            nacimiento: {
            dia: 9,
            mes: 1,
            año: 1996,
            lugar: "Hungría"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 2
            }},
            { data:{
            ID: 1004,
            nombre: "Derin",
            apellidos: "Toparlak",
            altura: 193,
            nacimiento: {
            dia: 20,
            mes: 7,
            año: 1995,
            lugar: "Turquía"
            },
            participacionesJJOO: [
            2016,
            2021
            ],
            numPodiosConseguidos: 1
            }}]; 
        let mensaje ="";
        mensaje+='<input type="text" id="buscarID" placeholder="Introduce un ID"><button id="boton1" onclick="Plantilla.buscaDifParametros(vDatos,1)">Buscar</button>'  
    mensaje+='<input type="text" id="buscarApellidos" placeholder="Introduce unos apellidos"><button id="boton2" onclick="Plantilla.buscaDifParametros(vDatos,2)">Buscar</button>'
    mensaje+='<input type="number" id="buscarAltura" min = "0" placeholder="Altura maxima (cm)"><button id="boton3" onclick="Plantilla.buscaDifParametros(vDatos,3)">Buscar</button>'
    mensaje+='<input type="date" id="buscarFecha" placeholder="Introduce una fecha"><button id="boton4" onclick="Plantilla.buscaDifParametros(vDatos,4)">Buscar</button>'
    mensaje+='<input type="text" id="buscarLugar" placeholder="Introduce un lugar de nacimiento"><button id="boton5" onclick="Plantilla.buscaDifParametros(vDatos,5)">Buscar</button>'
    mensaje+='<input type="number" id="buscarAño" min = "0" placeholder="Año de participación"><button id="boton6" onclick="Plantilla.buscaDifParametros(vDatos,6)">Buscar</button>'
    mensaje+='<input type="number" id="buscarPodios" min = "0" placeholder="Introduce un numero de podios"><button id="boton7" onclick="Plantilla.buscaDifParametros(vDatos,7)">Buscar</button>'
        mensaje += natacion.cabeceraTablaConTodo();
        vector.forEach(e => mensaje+= natacion.cuerpoListarConTodo(e));
        mensaje += natacion.pieTabla();
        expect(natacion.imprimirPersonasBuscada(vector, 0)).toEqual(mensaje);
    });
});

describe("Plantilla.buscaDifParametros", function () {
    var vector = [
        { data: {
        ID: 1000,
        nombre: "Francisco",
        apellidos: "Salazar Segovia",
        altura: 190,
        nacimiento: {
        dia: 5,
        mes: 9,
        año: 1989,
        lugar: "España"
        },
        participacionesJJOO: [
        2012,
        2016
        ],
        numPodiosConseguidos: 1
        }},
        { data: {
        ID: 1001,
        nombre: "Paula",
        apellidos: "Aguirre Rodriguez",
        altura: 178,
        nacimiento: {
        dia: 19,
        mes: 11,
        año: 1978,
        lugar: "Colombia"
        },
        participacionesJJOO: [
        1996,
        2000,
        2004
        ],
        numPodiosConseguidos: 2
        }},
        { data:{
        ID: 1002,
        nombre: "Viktoriia",
        apellidos: "Uvarova ",
        altura: 182,
        nacimiento: {
        dia: 17,
        mes: 11,
        año: 1983,
        lugar: "Ucrania"
        },
        participacionesJJOO: [
        2004
        ],
        numPodiosConseguidos: 0
        }},
        { data:{
        ID: 1003,
        nombre: "Peter",
        apellidos: "Holoda ",
        altura: 196,
        nacimiento: {
        dia: 9,
        mes: 1,
        año: 1996,
        lugar: "Hungría"
        },
        participacionesJJOO: [
        2016,
        2021
        ],
        numPodiosConseguidos: 2
        }},
        { data:{
        ID: 1004,
        nombre: "Derin",
        apellidos: "Toparlak",
        altura: 193,
        nacimiento: {
        dia: 20,
        mes: 7,
        año: 1995,
        lugar: "Turquía"
        },
        participacionesJJOO: [
        2016,
        2021
        ],
        numPodiosConseguidos: 1
        }}]; 


    it("Tendría que buscar correctamente el ID",function () {
        const entrada = document.createElement("input");
        const boton = document.createElement("button");

        entrada.setAttribute("type", "text");
        entrada.setAttribute("value", "1000");
        entrada.setAttribute("id", "buscarID");
        entrada.setAttribute("class", "prueba");

        boton.setAttribute("id","boton1");
        document.body.appendChild(entrada)

        var vectorSalida1 = [
            { data: {
            ID: 1000,
            nombre: "Francisco",
            apellidos: "Salazar Segovia",
            altura: 190,
            nacimiento: {
            dia: 5,
            mes: 9,
            año: 1989,
            lugar: "España"
            },
            participacionesJJOO: [
            2012,
            2016
            ],
            numPodiosConseguidos: 1
            }}]

        expect(natacion.buscaDifParametros(vector,1)).toContain(natacion.imprimirPersonasBuscada(vectorSalida1, 1));
    });

    // specs comentados porque si estan todos juntos dan error

     /* it("Tendría que buscar correctamente las alturas menores o iguales",function () {
        const entrada = document.createElement("input");
            const boton = document.createElement("button");
    
            entrada.setAttribute("type", "number");
            entrada.setAttribute("value", 185);
            entrada.setAttribute("id", "buscarAltura");
            entrada.setAttribute("class", "prueba");
    
            boton.setAttribute("id","boton2");
            document.body.appendChild(entrada)
    
            var vectorSalida2 = [
                { data: {
                    ID: 1001,
                    nombre: "Paula",
                    apellidos: "Aguirre Rodriguez",
                    altura: 178,
                    nacimiento: {
                    dia: 19,
                    mes: 11,
                    año: 1978,
                    lugar: "Colombia"
                    },
                    participacionesJJOO: [
                    1996,
                    2000,
                    2004
                    ],
                    numPodiosConseguidos: 2
                    }},
                    { data:{
                    ID: 1002,
                    nombre: "Viktoriia",
                    apellidos: "Uvarova ",
                    altura: 182,
                    nacimiento: {
                    dia: 17,
                    mes: 11,
                    año: 1983,
                    lugar: "Ucrania"
                    },
                    participacionesJJOO: [
                    2004
                    ],
                    numPodiosConseguidos: 0
                    }}
            ]
        expect(Plantilla.buscaDifParametros(vector,3)).toContain(Plantilla.imprimirPersonasBuscada(vectorSalida2, 3));
    });
    it("Tendría que buscar correctamente los apellidos",function () {
        const entrada = document.createElement("input");
        const boton = document.createElement("button");
        entrada.setAttribute("type", "text");
        entrada.setAttribute("value", "Toparlak");
        entrada.setAttribute("id", "buscarApellidos");
        entrada.setAttribute("class", "prueba");
        boton.setAttribute("id","boton3");
        document.body.appendChild(entrada)
        var vectorSalida3 = [
            { data:{
                ID: 1004,
                nombre: "Derin",
                apellidos: "Toparlak",
                altura: 193,
                nacimiento: {
                dia: 20,
                mes: 7,
                año: 1995,
                lugar: "Turquía"
                },
                participacionesJJOO: [
                2016,
                2021
                ],
                numPodiosConseguidos: 1
                }}
        ]
        expect(Plantilla.buscaDifParametros(vector, 2)).toContain(Plantilla.imprimirPersonasBuscada(vectorSalida3, 2));
    }); 
    it("Tendría que buscar correctamente las fechas menores que la introducida",function () {
        const entrada = document.createElement("input");
        const boton = document.createElement("button");
        
        entrada.setAttribute("type", "date");
        entrada.setAttribute("value", undefined);
        entrada.setAttribute("id", "buscarFecha");
        entrada.setAttribute("class", "prueba");
        boton.setAttribute("id","boton4");
        document.body.appendChild(entrada)
        var vectorSalida4 = [
            
        ]
        expect(Plantilla.buscaDifParametros(vector, 4)).toContain(Plantilla.imprimirPersonasBuscada(vectorSalida4, 4));
    }); 
    it("Tendría que buscar correctamente el lugar de nacimiento",function () {
        const entrada = document.createElement("input");
        const boton = document.createElement("button");
        entrada.setAttribute("type", "text");
        entrada.setAttribute("value", "Turquía");
        entrada.setAttribute("id", "buscarLugar");
        entrada.setAttribute("class", "prueba");
        boton.setAttribute("id","boton5");
        document.body.appendChild(entrada)
        var vectorSalida5 = [
            { data:{
                ID: 1004,
                nombre: "Derin",
                apellidos: "Toparlak",
                altura: 193,
                nacimiento: {
                dia: 20,
                mes: 7,
                año: 1995,
                lugar: "Turquía"
                },
                participacionesJJOO: [
                2016,
                2021
                ],
                numPodiosConseguidos: 1
                }}
        ]
        expect(Plantilla.buscaDifParametros(vector, 5)).toContain(Plantilla.imprimirPersonasBuscada(vectorSalida5, 5));
    }); 
    it("Tendría que buscar correctamente el año de participacion en los JJOO",function () {
        const entrada = document.createElement("input");
        const boton = document.createElement("button");
        entrada.setAttribute("type", "number");
        entrada.setAttribute("value", 1996);
        entrada.setAttribute("id", "buscarAño");
        entrada.setAttribute("class", "prueba");
        boton.setAttribute("id","boton6");
        document.body.appendChild(entrada)
        var vectorSalida6 = [
            { data: {
                ID: 1001,
                nombre: "Paula",
                apellidos: "Aguirre Rodriguez",
                altura: 178,
                nacimiento: {
                dia: 19,
                mes: 11,
                año: 1978,
                lugar: "Colombia"
                },
                participacionesJJOO: [
                1996,
                2000,
                2004
                ],
                numPodiosConseguidos: 2
                }}
        ]
        expect(Plantilla.buscaDifParametros(vector, 6)).toContain(Plantilla.imprimirPersonasBuscada(vectorSalida6, 6));
    }); 
    it("Tendría que buscar correctamente el numero de podios conseguidos",function () {
        const entrada = document.createElement("input");
        const boton = document.createElement("button");
        entrada.setAttribute("type", "number");
        entrada.setAttribute("value", 0);
        entrada.setAttribute("id", "buscarPodios");
        entrada.setAttribute("class", "prueba");
        boton.setAttribute("id","boton7");
        document.body.appendChild(entrada)
        var vectorSalida7 = [
            { data:{
                ID: 1002,
                nombre: "Viktoriia",
                apellidos: "Uvarova ",
                altura: 182,
                nacimiento: {
                dia: 17,
                mes: 11,
                año: 1983,
                lugar: "Ucrania"
                },
                participacionesJJOO: [
                2004
                ],
                numPodiosConseguidos: 0
                }}
        ]
        expect(Plantilla.buscaDifParametros(vector, 7)).toContain(Plantilla.imprimirPersonasBuscada(vectorSalida7, 7));
    });  */
});




/*
IMPORTANTE
==========
Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome
 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.
 */