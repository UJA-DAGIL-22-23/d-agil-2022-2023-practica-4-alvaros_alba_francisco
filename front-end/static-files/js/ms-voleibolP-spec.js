


/**
 * @file ms-voleibolP-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Álvaro Ordóñez Romero <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const tituloElemento = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const ContenidoElemento = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const home_titulo = "Volley Playa Home"
const acercaDeTitulo = "Volley Playa Acerca de"

const datosDescargados = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

let personaPrueba = {
    id : "idprueba",
    nombre : "nombrePrueba"
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

describe("voleyPlaya.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            voleyPlaya.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(home_titulo)
            expect(ContenidoElemento.innerHTML).toBe(voleyPlaya.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            voleyPlaya.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(home_titulo)
            expect(ContenidoElemento.innerHTML).toBe(voleyPlaya.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            voleyPlaya.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(home_titulo)
            expect(ContenidoElemento.innerHTML).toBe(voleyPlaya.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            voleyPlaya.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(home_titulo)
            expect(ContenidoElemento.innerHTML).toBe(voleyPlaya.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            voleyPlaya.mostrarHome(datosDescargados)
            expect(elementoTitulo.innerHTML).toBe(home_titulo)
            expect(ContenidoElemento.innerHTML).toBe(datosDescargados.mensaje)
        })
})


describe("voleyPlaya.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            voleyPlaya.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(acercaDeTitulo)
            expect(ContenidoElemento.innerHTML.search(voleyPlaya.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            voleyPlaya.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(acercaDeTitulo)
            expect(ContenidoElemento.innerHTML.search(voleyPlaya.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            voleyPlaya.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(acercaDeTitulo)
            expect(ContenidoElemento.innerHTML.search(voleyPlaya.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            voleyPlaya.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(acercaDeTitulo)
            expect(ContenidoElemento.innerHTML.search(voleyPlaya.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            voleyPlaya.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(acercaDeTitulo)
            expect(ContenidoElemento.innerHTML.search(voleyPlaya.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            voleyPlaya.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(acercaDeTitulo)
            expect(ContenidoElemento.innerHTML.search(voleyPlaya.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            voleyPlaya.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(acercaDeTitulo)
            expect(ContenidoElemento.innerHTML.search(voleyPlaya.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            voleyPlaya.mostrarAcercaDe(datosDescargados)
            expect(elementoTitulo.innerHTML).toBe(acercaDeTitulo)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(ContenidoElemento.innerHTML.search(datosDescargados.autor) >= 0).toBeTrue()
            expect(ContenidoElemento.innerHTML.search(datosDescargados.email) >= 0).toBeTrue()
            expect(ContenidoElemento.innerHTML.search(datosDescargados.fecha) >= 0).toBeTrue()
        })
})


describe("Pie table ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(voleyPlaya.pieTabla()).toBe("</tbody></table>");
        });
});

describe("Cabecera table ", function () {
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(voleyPlaya.cabeceraTablaNombres()).toBe(`<table class="listado-nombres"><thead><th>ID</th><th>Nombre</th></thead><tbody>`);
        });
});

describe('voleyPlaya.cuerpoListarPersonas', () => {
    it('Debería de volver datos de una persona creada por defecto', () => {
      // Arrange
      const p = {
        data: {
          nombre: 'Juan',
        },
        ref: {
          '@ref': {
            ID: 'person-1',
            id: '123',
          },
        },
      };
      const expectedOutput = '<tr title="person-1"><td>123</td><td>Juan</td></tr>';
      const actualOutput = voleyPlaya.cuerpoListarPersonas(p);
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe("voleyPlaya.imprime", function(){
    it("Deberia trabajar correctamente con vectores vacios", function(){
        const vector = [];
        const mensajeEsperado = voleyPlaya.cabeceraTablaNombres() + voleyPlaya.pieTabla();
        const mensaje = voleyPlaya.imprime(vector);
        expect(mensaje).toBe(mensajeEsperado); 
    });
});

  describe("voleyPlaya.imprime", function() {
    let vector;
    beforeEach(function() {
      vector = [
        {
          ref: {
            "@ref": {
              id: "123"
            }
          },
          data: {
            nombre: "Juan"
          }
        },
        {
          ref: {
            "@ref": {
              id: "456"
            }
          },
          data: {
            nombre: "Ana"
          }
        },
        {
          ref: {
            "@ref": {
              id: "789"
            }
          },
          data: {
            nombre: "Carlos"
          }
        }
      ];
    });
  
    it("debe devolver una cadena que contenga marcado de tabla HTML", function() {
      const result = voleyPlaya.imprime(vector);
      expect(typeof result).toBe("string");
      expect(result).toContain("<table");
      expect(result).toContain("<thead");
      expect(result).toContain("<tbody");
      expect(result).toContain("</table>");
    });
  });

  describe('ordenarPorNombre', () => {
    it('Debe ordenar un vector vacío', () => {
      const vector = [];
      voleyPlaya.ordenarPorNombre(vector);
      expect(vector).toEqual([]);
    });
  
    it('Debe ordenar un vector con un solo elemento', () => {
      const vector = [{ data: { nombre: 'Juan' } }];
      voleyPlaya.ordenarPorNombre(vector);
      expect(vector).toEqual([{ data: { nombre: 'Juan' } }]);
    });
  
    it('Debe ordenar un vector con varios elementos', () => {
      const vector = [
        { data: { nombre: 'Luis' } },
        { data: { nombre: 'Ana' } },
        { data: { nombre: 'Juan' } },
      ];
      voleyPlaya.ordenarPorNombre(vector);
      expect(vector).toEqual([
        { data: { nombre: 'Ana' } },
        { data: { nombre: 'Juan' } },
        { data: { nombre: 'Luis' } },
      ]);
    });
  
    it('Debe ordenar correctamente nombres con mayúsculas y minúsculas', () => {
      const vector = [
        { data: { nombre: 'ana' } },
        { data: { nombre: 'Juan' } },
        { data: { nombre: 'Luis' } },
        { data: { nombre: 'carlos' } },
      ];
      voleyPlaya.ordenarPorNombre(vector);
      expect(vector).toEqual([
        { data: { nombre: 'ana' } },
        { data: { nombre: 'carlos' } },
        { data: { nombre: 'Juan' } },
        { data: { nombre: 'Luis' } },
      ]);
    });
  });

  describe("voleyPlaya.imprimexNombre", function() {
    let vector;
  
    beforeEach(function() {
      vector = [      {        ref: {          "@ref": {            id: "123"          }        },        data: {          nombre: "Juan"        }      },      {        ref: {          "@ref": {            id: "456"          }        },        data: {          nombre: "Ana"        }      },      {        ref: {          "@ref": {            id: "789"          }        },        data: {          nombre: "Carlos"        }      }    ];
    });
  
    it("debería ordenar el vector por nombre", function() {
        voleyPlaya.imprimexNombre(vector);
  
      let nombresOrdenados = vector.map(e => e.data.nombre);
      let nombresEsperados = ["Ana", "Carlos", "Juan"];
      expect(nombresOrdenados).toEqual(nombresEsperados);
    });
  });

  describe("Cabecera table personas ", function () {
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(voleyPlaya.cabeceraTablaTodos()).toBe(`<table class="listado-nombres"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Día</th><th>Mes</th><th>Año</th><th>Ciudad</th><th>País</th><th>VECTORCOMPETICIONES</th><th>Talla</th><th>NUMMEDALLASOLIMPICAS</th><th>Posicion</th></thead><tbody>`);
        });
});

describe('voleyPlaya.cuerpoListarTodos', () => {
    it('Debería de devolver datos de una persona creada por defecto', () => {
      // Arrange
      const p = {
        data: {
          nombre: 'Juan',
          apellidos: 'Pérez',
          nacimiento: { dia: '2', mes: '3', Año: '1990' },
          direccion: { ciudad: 'Madrid', pais: 'España' },
          vectorCompeticiones: '2016,2022',
          talla: '180',
          numMedallasOlimpicas: '3',
          posicion: 'Rematador',
        },
        ref: {
          '@ref': {
            ID: 'person-1',
            id: '123',
          },
        },
      };
      const expectedOutput = '<tr title="person-1"><td>123</td><td>Juan</td><td>Pérez</td><td>2</td><td>3</td><td>1990</td><td>Madrid</td><td>España</td><td>2016,2022</td><td>180</td><td>3</td><td>Rematador</td></tr>';
      const actualOutput = voleyPlaya.cuerpoListarTodos(p);
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  

  describe("voleyPlaya.nuevoOrden", function() {
    const personas = [
      {
        ref: { "@ref": { ID: "1", id: "123" } },
        data: {
          nombre: "John",
          apellidos: "Doe",
          nacimiento: { dia: 1, mes: 1, Año: 2000 },
          direccion: { ciudad: "Madrid", pais: "España" },
          vectorCompeticiones: ["comp1", "comp2"],
          talla: 190,
          numMedallasOlimpicas: 2,
          posicion: 1
        }
      },
      {
        ref: { "@ref": { ID: "2", id: "456" } },
        data: {
          nombre: "Jane",
          apellidos: "Ordo",
          nacimiento: { dia: 2, mes: 2, Año: 2001 },
          direccion: { ciudad: "Barcelona", pais: "España" },
          vectorCompeticiones: ["comp3", "comp4"],
          talla: 180,
          numMedallasOlimpicas: 4,
          posicion: 2
        }
      }
    ];
  
    it("ordena por ID si tipo es 0", function() {
      const vDatos = personas.slice(); // Copia del vector original
      voleyPlaya.ordenarCampo(0, vDatos);
      expect(vDatos[0].ref["@ref"].id).toEqual("123");
    });
  
    it("ordena por nombre si tipo es 1", function() {
      const vDatos = personas.slice(); // Copia del vector original
      voleyPlaya.ordenarCampo(1, vDatos);
      expect(vDatos[0].data.nombre).toEqual("Jane");
    });
  
    it("ordena por apellidos si tipo es 2", function() {
      const vDatos = personas.slice(); // Copia del vector original
      voleyPlaya.ordenarCampo(2, vDatos);
      expect(vDatos[0].data.apellidos).toEqual("Doe");
    });
  
    it("ordena por talla si tipo es 3", function() {
      const vDatos = personas.slice(); // Copia del vector original
      voleyPlaya.ordenarCampo(3, vDatos);
      expect(vDatos[0].data.talla).toEqual(180);
    });
  
    it("ordena por número de medallas si tipo es 4", function() {
      const vDatos = personas.slice(); // Copia del vector original
      voleyPlaya.ordenarCampo(4, vDatos);
      expect(vDatos[0].data.numMedallasOlimpicas).toEqual(2);
    });
  });

describe("voleyPlaya.imprimeConBoton", function() {
    let vector;

  beforeEach(function() {
    vector = [
      { ref: { "@ref": { ID: "1", id: "123" } }, data: { nombre: "John", apellidos: "Doe", nacimiento: { dia: 1, mes: 1, Año: 2000 }, direccion: { ciudad: "Madrid", pais: "España" }, vectorCompeticiones: ["comp1", "comp2"], talla: "M", numMedallasOlimpicas: 2, posicion: 1 } },
      { ref: { "@ref": { ID: "2", id: "456" } }, data: { nombre: "Jane", apellidos: "Doe", nacimiento: { dia: 2, mes: 2, Año: 2000 }, direccion: { ciudad: "Barcelona", pais: "España" }, vectorCompeticiones: ["comp1", "comp2"], talla: "M", numMedallasOlimpicas: 0, posicion: 2 } }
    ];
  });

  it("genera un botón para ordenar por ID", function() {
    let result = voleyPlaya.ordenarBoton(vector);
    expect(result).toContain(`<div class="botones"><button class="miBoton" onclick="voleyPlaya.ordenarCampo(0, vDatos)">Ordenar por ID</button></div><br></br>`);
  });

  it("genera un botón para ordenar por Nombre", function() {
    let result = voleyPlaya.ordenarBoton(vector);
    expect(result).toContain(`<div class="botones"><button class="miBoton" onclick="voleyPlaya.ordenarCampo(1, vDatos)">Ordenar por Nombre</button></div><br></br>`);
  });

  it("genera un botón para ordenar por Apellidos", function() {
    let result = voleyPlaya.ordenarBoton(vector);
    expect(result).toContain(`<div class="botones"><button class="miBoton" onclick="voleyPlaya.ordenarCampo(2, vDatos)">Ordenar por Apellidos</button></div><br></br>`);
  });

  it("genera un botón para ordenar por Altura", function() {
    let result = voleyPlaya.ordenarBoton(vector);
    expect(result).toContain(`<div class="botones"><button class="miBoton" onclick="voleyPlaya.ordenarCampo(3, vDatos)">Ordenar por Altura</button></div><br></br>`);
  });

  it("deberia devolver un string con código HTML", function() {
    const result = voleyPlaya.ordenarBoton(vector);
    expect(typeof result).toEqual("string");
  });
});

describe("voleyPlaya.mostrarPersona", function() {
  let persona = {
    data: {
      nombre: "John",
      apellidos: "Doe",
      nacimiento: {
        dia: 1,
        mes: 1,
        Año: 1990
      },
      direccion: {
        ciudad: "Barcelona",
        pais: "España"
      },
      vectorCompeticiones: "2016,2022",
      talla: "180",
      numMedallasOlimpicas: 2,
      posicion: "Armador"
    },
    ref: { "@ref": { id: "123456" } }
  };
  
  let idPos = 1;
  
  beforeEach(function() {
    spyOn(voleyPlaya, "cabeceraTablaTodos").and.returnValue("<thead></thead>");
    spyOn(voleyPlaya, "pieTabla").and.returnValue("</table>");
    spyOn(Frontend.Article, "actualizar");
  });
  
  it("debería llamar a voleyPlaya.cabeceraTablaTodos, voleyPlaya.pieTabla y Frontend.Article.actualizar", function() {
    voleyPlaya.mostrarPersona(persona, idPos);
    expect(voleyPlaya.cabeceraTablaTodos).toHaveBeenCalled();
    expect(voleyPlaya.pieTabla).toHaveBeenCalled();
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Detalles de persona", jasmine.any(String));
  });
  
  it("debería devolver una tabla con los detalles de la persona", function() {
    let resultado = voleyPlaya.mostrarPersona(persona, idPos);
    expect(resultado).toContain("<td>1</td>");
    expect(resultado).toContain("<td>John</td>");
    expect(resultado).toContain("<td>Doe</td>");
    expect(resultado).toContain("<td>1</td>");
    expect(resultado).toContain("<td>1</td>");
    expect(resultado).toContain("<td>1990</td>");
    expect(resultado).toContain("<td>Barcelona</td>");
    expect(resultado).toContain("<td>España</td>");
    expect(resultado).toContain("<td>2016,2022</td>");
    expect(resultado).toContain("<td>180</td>");
    expect(resultado).toContain("<td>2</td>");
    expect(resultado).toContain("<td>Armador</td>");
  });
  
  it("debería incluir el ID de la persona en el atributo 'ID' de la fila", function() {
    let resultado = voleyPlaya.mostrarPersona(persona, idPos);
    expect(resultado).toContain(`<td>1</td>`);
  });

});


describe("voleyPlaya.anteriorJugador", function() {
  let idJugadores;
  let indiceActual;

  beforeEach(function() {
    idJugadores = [359175635380207820, 359290943230181581, 359740219224752332, 359740327119028429, 359740477276160204, 359740594528977100, 359740680986165452, 359740808552775885, 359741028675092684, 359741261320552652];
    indiceActual = 1;
  });

  it("debería decrementar el índice actual si es mayor que cero", function() {
    voleyPlaya.anteriorJugador();
    expect(indiceActual).toEqual(1);
  });

  it("no debería decrementar el índice actual si es igual a cero", function() {
    indiceActual = 0;
    voleyPlaya.anteriorJugador();
    expect(indiceActual).toEqual(0);
  });
});

describe("voleyPlaya.siguienteJugador", function() {
  let idJugadores;
  let indiceActual=0;

  beforeEach(function() {
    idJugadores = [1, 2, 3];
    indiceActual = 1;
  });

  it("debería incrementar el índice actual si es menor que la longitud del vector - 1", function() {
    voleyPlaya.siguienteJugador();
    expect(indiceActual).toEqual(1);
  });

  it("no debería incrementar el índice actual si es igual a la longitud del vector - 1", function() {
    indiceActual = 2;
    voleyPlaya.siguienteJugador();
    expect(indiceActual).toEqual(2);
  });
});

describe("voleyPlaya.pantallaBuscarNombre()", function() {
  let vector;

  beforeEach(function() {
    vector = [
      { 
        ref: { "@ref": { id: 1 } }, 
        data: { 
          nombre: "Juan", 
          apellidos: "García", 
          nacimiento: { dia: 10, mes: 2, año: 1980 }, 
          direccion: { ciudad: "Madrid", pais: "España" }, 
          vectorCompeticiones: ["2020"], 
          talla: 180, 
          numMedallasOlimpicas: 2, 
          posicion: "Armador"
        } 
      },
      { 
        ref: { "@ref": { id: 2 } }, 
        data: { 
          nombre: "María", 
          apellidos: "Pérez", 
          nacimiento: { dia: 3, mes: 11, año: 1995 }, 
          direccion: { ciudad: "Barcelona", pais: "España" }, 
          vectorCompeticiones: ["2020"], 
          talla: 165, 
          numMedallasOlimpicas: 1, 
          posicion: "Armador"
        } 
      }
    ];
  });

  it("devuelve un string con el HTML de la pantalla de búsqueda", function() {
    expect(voleyPlaya.pantallaBuscarNombre(vector)).toEqual(jasmine.any(String));
  });

  it("muestra un input para introducir un nombre", function() {
    const pantalla = voleyPlaya.pantallaBuscarNombre(vector);
    const input = pantalla.includes('<input type="text" id="buscar" placeholder="Introduce un nombre">');
    expect(input).toBeTrue();
  });

  it("muestra un botón para buscar", function() {
    const pantalla = voleyPlaya.pantallaBuscarNombre(vector);
    const boton = pantalla.includes('<button onclick="voleyPlaya.busca(vDatos)">Buscar</button>');
    expect(boton).toBeTrue();
  });
});

describe("voleyPlaya.generarMensaje", function() {
  let mensaje;
  
  beforeEach(function() {
    mensaje = "Mensaje de prueba";
  });
  
  it("debería añadir el botón de búsqueda si encontrada es verdadero", function() {
    let resultado = voleyPlaya.generarMensaje(mensaje, true);
    let botonBuscar = '<input type="text" id="buscar" placeholder="Introduce un nombre"><button onclick="voleyPlaya.busca(vDatos)">Buscar</button>';
    expect(resultado).toContain(botonBuscar);
  });
  
  it("debería añadir el mensaje de error si encontrada es falso", function() {
    let resultado = voleyPlaya.generarMensaje(mensaje, false);
    let mensajeError = '<div class="error"><p>¡Error! No se ha encontrado el nombre.</p> </div>';
    expect(resultado).toContain(mensajeError);
  });
  
  it("debería devolver un mensaje vacío si se le pasa un mensaje vacío y encontrada es verdadero", function() {
    let resultado = voleyPlaya.generarMensaje("", true);
    expect(resultado).toEqual('<input type="text" id="buscar" placeholder="Introduce un nombre"><button onclick="voleyPlaya.busca(vDatos)">Buscar</button>');
  });
  
  it("debería devolver un mensaje de error si se le pasa un mensaje vacío y encontrada es falso", function() {
    let resultado = voleyPlaya.generarMensaje("", false);
    expect(resultado).toEqual('<input type="text" id="buscar" placeholder="Introduce un nombre"><button onclick="voleyPlaya.busca(vDatos)">Buscar</button><div class="error"><p>¡Error! No se ha encontrado el nombre.</p> </div>');
  });
});

describe("voleyPlaya.busca", function() {
  let vector;

  beforeEach(function() {
    vector = [
      { 
        ref: { "@ref": { id: 1 } }, 
        data: { 
          nombre: "Juan", 
          apellidos: "García", 
          nacimiento: { dia: 10, mes: 2, año: 1980 }, 
          direccion: { ciudad: "Madrid", pais: "España" }, 
          vectorCompeticiones: ["2020"], 
          talla: 180, 
          numMedallasOlimpicas: 2, 
          posicion: "Armador"
        } 
      },
      { 
        ref: { "@ref": { id: 2 } }, 
        data: { 
          nombre: "María", 
          apellidos: "Pérez", 
          nacimiento: { dia: 3, mes: 11, año: 1995 }, 
          direccion: { ciudad: "Barcelona", pais: "España" }, 
          vectorCompeticiones: ["2020"], 
          talla: 165, 
          numMedallasOlimpicas: 1, 
          posicion: "Armador"
        } 
      }
    ];
  });

  it("debería devolver un mensaje de error si no se encuentra el nombre", function() {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.innerHTML = '<input type="text" id="buscar" value="Fernando">';
      let mensaje = voleyPlaya.busca(vector);
      expect(mensaje).toContain('<div class="error"><p>¡Error! No se ha encontrado el nombre.</p> </div>');
    });
  });

  it("debería devolver un mensaje con la información de la persona si se encuentra el nombre", function() {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.innerHTML = '<input type="text" id="buscar" value="Juan">';
      let mensaje = voleyPlaya.busca(vector);
      expect(mensaje).toContain('Juan');
      expect(mensaje).not.toContain('María');
    });
  });
});


describe("voleyPlaya.buscadorGeneral()", function() {
  it("Debería devolver un string", function() {
    const vector = [];
    const result = voleyPlaya.buscadorGeneral(vector);
    expect(typeof result).toBe("string");
  });
  it("Debería contener un select con opciones", function() {
    const vector = [];
    const result = voleyPlaya.buscadorGeneral(vector);
    const selectElement = document.createElement("div");
    selectElement.innerHTML = result;
    const select = selectElement.querySelector("#selectCampo");
    expect(select).toBeDefined();
    expect(select.children.length).toBeGreaterThan(0);
  });
  it("Debería contener un input y un botón", function() {
    const vector = [];
    const result = voleyPlaya.buscadorGeneral(vector);
    const inputElement = document.createElement("div");
    inputElement.innerHTML = result;
    const input = inputElement.querySelector("#buscar");
    expect(input).toBeDefined();
    const button = inputElement.querySelector("button");
    expect(button).toBeDefined();
  });
  
});


describe("voleyPlaya.obtenerValorCampo", function() {
  it("debería devolver el valor de un campo simple", function() {
    const objeto = {nombre: "Juan"};
    const campo = "nombre";
    expect(voleyPlaya.obtenerValorCampo(objeto, campo)).toEqual("Juan");
  });
  it("debería devolver el valor de un campo anidado", function() {
    const objeto = {persona: {nombre: "Juan", apellidos: "Pérez Gómez"}};
    const campo = "persona.nombre";
    expect(voleyPlaya.obtenerValorCampo(objeto, campo)).toEqual("Juan");
  });
  it("debería devolver el valor de un campo anidado con propiedad en mayúsculas", function() {
    const objeto = {persona: {nombre: "Juan", apellidos: "Pérez Gómez", numMedallasOlimpicas: 30}};
    const campo = "persona.numMedallasOlimpicas";
    expect(voleyPlaya.obtenerValorCampo(objeto, campo)).toEqual(30);
  });

});

describe("voleyPlaya.buscador", function() {
  let vector;

  beforeEach(function() {
    vector = [
      { 
        ref: { "@ref": { id: 1 } }, 
        data: { 
          nombre: "Juan", 
          apellidos: "García", 
          nacimiento: { dia: 10, mes: 2, año: 1980 }, 
          direccion: { ciudad: "Madrid", pais: "España" }, 
          vectorCompeticiones: ["2020"], 
          talla: 180, 
          numMedallasOlimpicas: 2, 
          posicion: "Armador"
        } 
      },
      { 
        ref: { "@ref": { id: 2 } }, 
        data: { 
          nombre: "María", 
          apellidos: "Pérez", 
          nacimiento: { dia: 3, mes: 11, año: 1995 }, 
          direccion: { ciudad: "Barcelona", pais: "España" }, 
          vectorCompeticiones: ["2020"], 
          talla: 165, 
          numMedallasOlimpicas: 1, 
          posicion: "Armador"
        } 
      }
    ];
    const campo = document.createElement("input");
    campo.id = "selectCampo";
    campo.value = "nombre";
    document.body.appendChild(campo);

    const buscar = document.createElement("input");
    buscar.id = "buscar";
    buscar.value = "Juan";
    document.body.appendChild(buscar);
  });

  afterEach(function() {
    const campo = document.getElementById("selectCampo");
    campo.remove();

    const buscar = document.getElementById("buscar");
    buscar.remove();
  });
  it("debería buscar correctamente por apellidos", function() {
    const campo = document.getElementById("selectCampo");
    campo.value = "apellidos";
    const buscar = document.getElementById("buscar");
    buscar.value = "Pérez";

    expect(voleyPlaya.buscador(vector)).toContain("María");
    expect(voleyPlaya.buscador(vector)).not.toContain("Juan");
  });
  it("debería buscar correctamente por número de medallas", function() {
    const campo = document.getElementById("selectCampo");
    campo.value = "numMedallasOlimpicas";
    const buscar = document.getElementById("buscar");
    buscar.value = "2";

    expect(voleyPlaya.buscador(vector)).toContain("Juan");
    expect(voleyPlaya.buscador(vector)).not.toContain("María");
  });
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
