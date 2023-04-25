/**
 * @file ms-halterofilia-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Halterofilia en el front-end
 * @author Alba G. Liébana <agl00108@red.ujaen.es>
 * @date 22-abril-2023
 */

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Halterofilia Home"
const TITULO_ACERCA_DE = "Halterofilia Acerca de"

const datosDescargadosPrueba = 
{
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

describe("Halterofilia.mostrarHome: ", function () 
{

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Halterofilia.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Halterofilia.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Halterofilia.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Halterofilia.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Halterofilia.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Halterofilia.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Halterofilia.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Halterofilia.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Halterofilia.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Halterofilia.mostrarAcercaDe(): ", function () 
{
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Halterofilia.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Halterofilia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Halterofilia.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Halterofilia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () 
        {
            // Objeto vacío
            Halterofilia.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Halterofilia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Halterofilia.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Halterofilia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Halterofilia.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Halterofilia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Halterofilia.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Halterofilia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Halterofilia.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Halterofilia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Halterofilia.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("Halterofilia.cabeceraTableNombre():", function () 
{
    it("debería devolver las etiquetas HTML para la cabecera de la tabla",
        function () 
        {
            expect(Halterofilia.cabeceraTableNombre()).toBe(`<table class="listado-nombres"><thead><th>Nombre del deportista</th></thead><tbody><a href="javascript:Halterofilia.listarAlf()" class="opcion-principal mostrar"title="Listar todos los nombres de los deportistas en la base de datos en órden alfabético">Ordenar Alfabéticamente</a>`);
        })
})

describe("Halterofilia.cuerpoTrNombre():", function () 
{
    it("debería devolver una fila de tabla con los nombres de los deportistas",
        function () 
        {
            //Definimos las constantes que vamos a usar
            let vector = {}
            vector.data = [
                {
                    ref: {
                        "@ref": {
                            id: "Id de Luis"
                        }
                    },
                    data: {
                        nombre: "Luis"
                    }
                },
                {
                    ref: {
                        "@ref": {
                            id: "Id de Ana"
                        }
                    },
                    data: {
                        nombre: "Ana"
                    }
                }
            ]
            for (let i = 0; i < vector.data.length; ++i) 
            {
                let msj = Halterofilia.cuerpoTrNombre(vector.data[i])
                let persona = vector.data[i]
                expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
                expect(msj.includes(persona.data.nombre)).toBeTrue();
            }
        })
})

describe("Halterofilia.pieTableNombre():", function () 
{
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () 
        {
            expect(Halterofilia.pieTableNombre()).toBe("</tbody></table>");
        })
})

describe("Halterofilia.imprimeDeportistas(): ", function () 
    {
        it("Observa si los nombres se muestran",
        function () 
        {
            //Preparamos los datos que vamos a usar
            let vector = {}
            vector.data = [
                {
                    ref: {
                        "@ref": {
                            id: "Id de Luis"
                        }
                    },
                    data: {
                        nombre: "Luis"
                    }
                },
                {
                    ref: {
                        "@ref": {
                            id: "Id de Ana"
                        }
                    },
                    data: {
                        nombre: "Ana"
                    }
                }
            ]
            Halterofilia.imprimeDeportistas(vector)
            // Compruebo que en el primer TD De la tabla se ha escrito Luis de dos formas
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.search('Luis') >= 0).toBeTrue()
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('Luis')).toBeTrue()
            expect(elementoContenido.getElementsByTagName("td")[1].innerText.search('Ana') >= 0).toBeTrue()
            expect(elementoContenido.getElementsByTagName("td")[1].innerText.includes('Ana')).toBeTrue()
        })
    })

    describe("Halterofilia.imprimeDeportistasAlf(): ", function () 
    {
        it("Observa si los nombres se ordenan alfabéticamente",
        function () 
        { //Preparamos los datos que vamos a usar
            let vector = {}
            vector.data = [
                {
                    ref: {
                        "@ref": {
                            id: "Id de Luis"
                        }
                    },
                    data: {
                        nombre: "Luis"
                    }
                },
                {
                    ref: {
                        "@ref": {
                            id: "Id de Ana"
                        }
                    },
                    data: {
                        nombre: "Ana"
                    }
                }
            ]
            Halterofilia.imprimeDeportistasAlf(vector)
            // Compruebo que en el primer TD De la tabla se ha escrito Ana
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('Ana')).toBeTrue()
            expect(elementoContenido.getElementsByTagName("td")[1].innerText.includes('Luis')).toBeTrue()
        })
    })

    describe("Halterofilia.cabeceraTable():", function () 
    {
        it("debería devolver las etiquetas HTML para la cabecera de la tabla",
            function () {
                expect(Halterofilia.cabeceraTable()).toBe(`<table class="listado-deportistas"><thead><th>Nombre</th><th>Apellidos</th><th>País</th><th>Categoría</th><th>Sexo</th><th>Fecha nacimiento</th><th>Medallas ganadas</th><th>Años participación</th><th>Logros</th></thead><tbody>`);
            })
    })

    describe("Halterofilia.cuerpoTr():", function () 
    {  
        it("debería devolver una fila de tabla con los datos de los deportistas",
        function () 
        { //Primero preparamos los datos
            let vector = {}
            vector.data = [
                {
                    ref: {
                        "@ref": {
                            id: "ref persona 1"
                        }
                    },
                    data: {
                        nombre: "Lidia",
                        apellidos: "Valentin Perez",
                        fechaNacimiento: {
                            dia: 13,
                            mes: 5,
                            anio: 1985
                        },
                        aniosParticipacionOlimpiadas: [2008, 2012, 2016, 2020],
                        numMedallasGanadas: 3,
                        logros: [
                            "Plata en Beijing 2008",
                            "Oro en Londres 2012",
                            "Bronce en Río 2016"
                        ],
                        pais: "Spain",
                        categoria: "Heavyweight",
                        sexo: "F"
                    }
                },
                {
                    ref: {
                        "@ref": {
                            id: "ref persona 2"
                        }
                    },
                    data: {
                        nombre: "Shi",
                        apellidos: "Zhiyong",
                        fechaNacimiento: {
                            dia: 3,
                            mes: 4,
                            anio: 1993
                        },
                        aniosParticipacionOlimpiadas: [2016, 2020],
                        numMedallasGanadas: 2,
                        logros: ["Oro en Río 2016", "Oro en Tokio 2020"],
                        pais: "China",
                        categoria: "Lightweight",
                        sexo: "M"
                    }
                }
            ] //Vemos para cada persona si incluye los campos necesarios
            for (let i = 0; i < vector.data.length; ++i) 
            {
                let msj = Halterofilia.cuerpoTr(vector.data[i])
                let persona = vector.data[i]
                const fecha = new Date(persona.data.fechaNacimiento.anio, persona.data.fechaNacimiento.mes - 1, persona.data.fechaNacimiento.dia);
                const fechaFormateada = fecha.toLocaleDateString();
                expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
                expect(msj.includes(persona.data.nombre)).toBeTrue();
                expect(msj.includes(persona.data.apellidos)).toBeTrue();
                expect(msj.includes(fechaFormateada)).toBeTrue();
                expect(msj.includes(persona.data.aniosParticipacionOlimpiadas)).toBeTrue();
                expect(msj.includes(persona.data.numMedallasGanadas)).toBeTrue();
                expect(msj.includes(persona.data.logros)).toBeTrue();
                expect(msj.includes(persona.data.pais)).toBeTrue();
                expect(msj.includes(persona.data.categoria)).toBeTrue();
                expect(msj.includes(persona.data.sexo)).toBeTrue();
            }
        })
    })

    describe("Halterofilia.pieTable():", function () 
    {
        it("debería devolver las etiquetas HTML para el pie de tabla",
            function () {
                expect(Halterofilia.pieTable()).toBe("</tbody></table>");
            });
    });

    describe("Halterofilia.imprimeCompleto(): ", function () 
    {
        it("Observa si los datos se muestran",
        function () {
            //Primero preparamos unos datos de prueba
            let vector = {}
            vector.data = [
                {
                    ref: {
                        "@ref": {
                            id: "ref persona 1"
                        }
                    },
                    data: {
                        nombre: "Lidia",
                        apellidos: "Valentin Perez",
                        fechaNacimiento: {
                            dia: 13,
                            mes: 5,
                            anio: 1985
                        },
                        aniosParticipacionOlimpiadas: [2008, 2012, 2016, 2020],
                        numMedallasGanadas: 3,
                        logros: [
                            "Plata en Beijing 2008",
                            "Oro en Londres 2012",
                            "Bronce en Río 2016"
                        ],
                        pais: "Spain",
                        categoria: "Heavyweight",
                        sexo: "F"
                    }
                }
            ]   
            Halterofilia.imprimeCompleto(vector)
            // Compruebo que en el primer TD De la tabla se ha escrito bien a Lidia
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('Lidia')).toBeTrue()
        })
    })

    describe("Halterofilia.imprimeDeportista(): ", function () 
    {
        it("Observa si los datos se muestran correctamente",
        function () {
            //Primero preparamos unos datos estáticos
            let vector = {}
            vector.data = [
                {
                    ref: {
                        "@ref": {
                            id: "ref persona 1"
                        }
                    },
                    data: {
                        nombre: "Lidia",
                        apellidos: "Valentin Perez",
                        fechaNacimiento: {
                            dia: 13,
                            mes: 5,
                            anio: 1985
                        },
                        aniosParticipacionOlimpiadas: [2008, 2012, 2016, 2020],
                        numMedallasGanadas: 3,
                        logros: [
                            "Plata en Beijing 2008",
                            "Oro en Londres 2012",
                            "Bronce en Río 2016"
                        ],
                        pais: "Spain",
                        categoria: "Heavyweight",
                        sexo: "F"
                    }
                }
            ]   
            Halterofilia.imprimeDeportista(vector.data[0])
            // Compruebo que se ha escrito bien a Lidia
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('Lidia')).toBeTrue()
        })
    })

    describe("Halterofilia.imprimePorCampo(): ", function () 
    {
        it("Observa si los datos se ordenan en relación a distintos campos utilizados",
        function () {
            let vector = {}
            vector.data = [
                {
                    ref: {
                        "@ref": {
                            id: "ref persona 1"
                        }
                    },
                    data: {
                        nombre: "Lidia",
                        apellidos: "Valentin Perez",
                        fechaNacimiento: {
                            dia: 13,
                            mes: 5,
                            anio: 1985
                        },
                        aniosParticipacionOlimpiadas: [2008, 2012, 2016, 2020],
                        numMedallasGanadas: 3,
                        logros: [
                            "Plata en Beijing 2008",
                            "Oro en Londres 2012",
                            "Bronce en Río 2016"
                        ],
                        pais: "Spain",
                        categoria: "Heavyweight",
                        sexo: "F"
                    }
                },
                {
                    ref: {
                        "@ref": {
                            id: "ref persona 2"
                        }
                    },
                    data: {
                        nombre: "Shi",
                        apellidos: "Zhiyong",
                        fechaNacimiento: {
                            dia: 3,
                            mes: 4,
                            anio: 1993
                        },
                        aniosParticipacionOlimpiadas: [2016, 2020],
                        numMedallasGanadas: 2,
                        logros: ["Oro en Río 2016", "Oro en Tokio 2020"],
                        pais: "China",
                        categoria: "Lightweight",
                        sexo: "M"
                    }
                }
            ]   
            let campo1="nombre"
            Halterofilia.imprimePorCampo(campo1,vector)
            // Compruebo que en el primer TD De la tabla se ha escrito Lidia 
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('Lidia')).toBeTrue()
            let campo2="apellidos"
            Halterofilia.imprimePorCampo(campo2,vector)
            // Compruebo que en el primer TD De la tabla se ha escrito Lidia 
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('Lidia')).toBeTrue()
            let campo3="pais"
            Halterofilia.imprimePorCampo(campo3,vector)
            // Compruebo que en el primer TD De la tabla se ha escrito Shi 
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('Shi')).toBeTrue()
            let campo4="categoria"
            Halterofilia.imprimePorCampo(campo4,vector)
            // Compruebo que en el primer TD De la tabla se ha escrito Lidia 
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('Lidia')).toBeTrue()
            let campo5="sexo"
            Halterofilia.imprimePorCampo(campo5,vector)
            // Compruebo que en el primer TD De la tabla se ha escrito Lidia 
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('Lidia')).toBeTrue()
            let campo6="fechaNacimiento"
            Halterofilia.imprimePorCampo(campo6,vector)
            // Compruebo que en el primer TD De la tabla se ha escrito Lidia 
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('Lidia')).toBeTrue()
            let campo7="numMedallasGanadas"
            Halterofilia.imprimePorCampo(campo7,vector)
            // Compruebo que en el primer TD De la tabla se ha escrito Lidia 
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('Lidia')).toBeTrue()
            let campo8="aniosParticipacionOlimpiadas"
            Halterofilia.imprimePorCampo(campo8,vector)
            // Compruebo que en el primer TD De la tabla se ha escrito Lidia 
            expect(elementoContenido.getElementsByTagName("td")[0].innerText.includes('Lidia')).toBeTrue()
        })
    })

    describe("Halterofilia.modificarNombre():", () => {
        it("Muestra correctamente el formulario incluso si el objeto deportista tiene valores faltantes o nulos", () => {
        const deportista = {
            ref: { "@ref": { id: "123456789" } },
            data: {
                nombre: "Juan",
                apellidos: "Pérez González",
                pais: "",
                categoria: "Heavyweight",
                sexo: null,
                fechaNacimiento: {
                    dia: 1,
                    mes: 1,
                    anio: 1990,
                },
                aniosParticipacionOlimpiadas: [2016, 2020],
                numMedallasGanadas: 2,
                logros: ["Oro en Río 2016", "Oro en Tokio 2020"],
                }    
        };
        Halterofilia.modificarNombre(deportista);
        // Verificar que el formulario se muestra correctamente
        expect(document.getElementById("deportista-nombre").value).toBe("Juan");
        expect(document.getElementById("deportista-apellidos").value).toBe("Pérez González");
        expect(document.getElementById("deportista-pais").value).toBe("");
        expect(document.getElementById("deportista-categoria").value).toBe("Heavyweight");
        expect(document.getElementById("deportista-sexo").value).toBe('null');
        expect(document.getElementById("deportista-numMedallasGanadas").value).toBe("2");
        expect(document.getElementById("deportista-aniosParticipacionOlimpiadas").value).toBe("2016,2020");
        expect(document.getElementById("deportista-logros").value).toBe("Oro en Río 2016,Oro en Tokio 2020");        
        })
    })

    describe("Halterofilia.modificarCampos():", () => {
        it("Muestra correctamente el formulario incluso si el objeto deportista tiene valores faltantes o nulos", () => {
        const deportista = {
            ref: { "@ref": { id: "123456789" } },
            data: {
                nombre: "Juan",
                apellidos: "Pérez González",
                pais: "",
                categoria: "Heavyweight",
                sexo: null,
                fechaNacimiento: {
                    dia: 1,
                    mes: 1,
                    anio: 1990,
                },
                aniosParticipacionOlimpiadas: [2016, 2020],
                numMedallasGanadas: 2,
                logros: ["Oro en Río 2016", "Oro en Tokio 2020"],
                }    
        };
        Halterofilia.modificarCampos(deportista);
        // Verificar que el formulario se muestra correctamente
        expect(document.getElementById("deportista-nombre").value).toBe("Juan");
        expect(document.getElementById("deportista-apellidos").value).toBe("Pérez González");
        expect(document.getElementById("deportista-pais").value).toBe("");
        expect(document.getElementById("deportista-categoria").value).toBe("Heavyweight");
        expect(document.getElementById("deportista-sexo").value).toBe('null');
        expect(document.getElementById("deportista-numMedallasGanadas").value).toBe("2");
        expect(document.getElementById("deportista-aniosParticipacionOlimpiadas").value).toBe("2016,2020");
        expect(document.getElementById("deportista-logros").value).toBe("Oro en Río 2016,Oro en Tokio 2020");        
        })
    })

    describe("Halterofilia.mostrarDeportistasPorNombre(): ", function () 
    {
        it("Vemos si la búsqueda se realiza bien",
        function () {
            let vector = {}
            vector.data = [
                {
                    ref: {
                        "@ref": {
                            id: "ref persona 1"
                        }
                    },
                    data: {
                        nombre: "Lidia",
                        apellidos: "Valentin Perez",
                        fechaNacimiento: {
                            dia: 13,
                            mes: 5,
                            anio: 1985
                        },
                        aniosParticipacionOlimpiadas: [2008, 2012, 2016, 2020],
                        numMedallasGanadas: 3,
                        logros: [
                            "Plata en Beijing 2008",
                            "Oro en Londres 2012",
                            "Bronce en Río 2016"
                        ],
                        pais: "Spain",
                        categoria: "Heavyweight",
                        sexo: "F"
                    }
                },
                {
                    ref: {
                        "@ref": {
                            id: "ref persona 2"
                        }
                    },
                    data: {
                        nombre: "Shi",
                        apellidos: "Zhiyong",
                        fechaNacimiento: {
                            dia: 3,
                            mes: 4,
                            anio: 1993
                        },
                        aniosParticipacionOlimpiadas: [2016, 2020],
                        numMedallasGanadas: 2,
                        logros: ["Oro en Río 2016", "Oro en Tokio 2020"],
                        pais: "China",
                        categoria: "Lightweight",
                        sexo: "M"
                    }
                }
            ]   
            let busqueda='Busca a "Shi"';
            let msj = Halterofilia.mostrarDeportistasPorNombre(busqueda,vector);
            let persona = vector.data[1];
            const fecha = new Date(persona.data.fechaNacimiento.anio, persona.data.fechaNacimiento.mes - 1, persona.data.fechaNacimiento.dia);
            const fechaFormateada = fecha.toLocaleDateString();
            expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(persona.data.nombre)).toBeTrue();
            expect(msj.includes(persona.data.apellidos)).toBeTrue();
            expect(msj.includes(fechaFormateada)).toBeTrue();
            expect(msj.includes(persona.data.aniosParticipacionOlimpiadas)).toBeTrue();
            expect(msj.includes(persona.data.numMedallasGanadas)).toBeTrue();
            expect(msj.includes(persona.data.logros)).toBeTrue();
            expect(msj.includes(persona.data.pais)).toBeTrue();
            expect(msj.includes(persona.data.categoria)).toBeTrue();
            expect(msj.includes(persona.data.sexo)).toBeTrue();     
        })
    })

    describe("Halterofilia.nuevoDeportista():", () => 
    {
        it("Se muestra correctamente el formulario", () => 
        {
            Halterofilia.nuevoDeportista();
            expect(document.getElementById("deportista-nombre")).toBeTruthy();
            expect(document.getElementById("deportista-apellidos")).toBeTruthy();
            expect(document.getElementById("deportista-pais")).toBeTruthy();
            expect(document.getElementById("deportista-categoria")).toBeTruthy();
            expect(document.getElementById("deportista-sexo")).toBeTruthy();
            expect(document.getElementById("deportista-fechaNacimiento")).toBeTruthy();
            expect(document.getElementById("deportista-numMedallasGanadas")).toBeTruthy();
            expect(document.getElementById("deportista-aniosParticipacionOlimpiadas")).toBeTruthy();
            expect(document.getElementById("deportista-logros")).toBeTruthy();
          });
        
        
          it("Se puede completar correctamente el formulario", () => 
          {
            Halterofilia.nuevoDeportista();
            document.getElementById("deportista-nombre").value = "Juan";
            document.getElementById("deportista-apellidos").value = "Pérez González";
            document.getElementById("deportista-pais").value = "México";
            document.getElementById("deportista-categoria").value = "Heavyweight";
            document.getElementById("deportista-sexo").value = "M";
            document.getElementById("deportista-fechaNacimiento").value = "1990-01-01";
            document.getElementById("deportista-numMedallasGanadas").value = "2";
            document.getElementById("deportista-aniosParticipacionOlimpiadas").value = "2016,2020";
            document.getElementById("deportista-logros").value = "Oro en Río 2016, Oro en Tokio 2020";
            expect(document.getElementById("deportista-nombre").value).toBe("Juan");
            expect(document.getElementById("deportista-apellidos").value).toBe("Pérez González");
            expect(document.getElementById("deportista-pais").value).toBe("México");
            expect(document.getElementById("deportista-categoria").value).toBe("Heavyweight");
            expect(document.getElementById("deportista-sexo").value).toBe("M");
            expect(document.getElementById("deportista-fechaNacimiento").value).toBe("1990-01-01");
            expect(document.getElementById("deportista-numMedallasGanadas").value).toBe("2");
            expect(document.getElementById("deportista-aniosParticipacionOlimpiadas").value).toBe("2016,2020");
        })
      })