
// SPECS para Jasmine

describe("Pie table ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Surferos.plantillaTablaNombres.pie()).toBe("</tbody></table>");
        });
});

describe("Cabecera table ", function () {
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(Surferos.plantillaTablaNombres.cabecera()).toBe('<style>table, th, td {border: 1px solid black;}</style><table width="100%" class="listado-personas"><thead><th width="15%">Id</th><th width="10%">Nombre</th></thead><tbody>');
        });
});
/*
describe("imprimeMuchasPersona ", function () {

    // Preparo los datos
    let d = [
      {
        nombre: "Italo",
        apellidos: "Ferreira",
        lugarNacimiento: {
          ciudad: "Baia Formosa",
          pais: "Brasil"
        },
        numCampeonatosDisputados: {
          cantidad: 4,
          evento: "MEO Rip Curl Pro Portugal"
        },
        añosCompitiendo: [2013, 2014, 2015, 2016, 2017, 2019, 2020, 2022],
        puntuacion: 59300,
        numVictorias: 3
      },
      {
        nombre: "Italo",
        apellidos: "Ferreira",
        lugarNacimiento: {
          ciudad: "Baia Formosa",
          pais: "Brasil"
        },
        numCampeonatosDisputados: {
          cantidad: 4,
          evento: "MEO Rip Curl Pro Portugal"
        },
        añosCompitiendo: [2013, 2014, 2015, 2016, 2017, 2019, 2020, 2022],
        puntuacion: 59300,
        numVictorias: 3
      }
    ]
    

    let p = { data: d }

    // Realizo los expect
    it("debería devolver una tabla con los datos de un surfero",
        function () {
            let msj = Surferos.imprimeMuchasPersonas(p)
            expect (msj.innerHTML.includes (persona.data.nombre)).toBeTrue()
        });
        describe("Surferos.imprimeMuchasPersonasN", () => {
          beforeEach(() => {
            // Configuración previa a cada test
            spyOn(Frontend.Article, "actualizar")
          })
        
          it("Debería mostrar una tabla con una persona", () => {
            Surferos.imprimeMuchasPersonasN(p)
            expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de nombres", "<table><thead><tr><th>Nombre</th></tr></thead><tbody><tr 359438193264689357><td></td><td>Italo</td></tr></tbody></table>")
          })
        })
        
      
        it("actualizaTabla actualiza correctamente el cuerpo de la tabla",
        function (){
            // Define los datos de entrada y salida esperados
            const surfero = {
                nombre: "Italo"};
            const cuerpoEsperado = '<<tr 359438193264689357><td></td><td>Italo</td></tr>';
          
            // Llama a la función a probar
            const cuerpoActualizado = actualizaTabla(surfero);
          
            // Comprueba que el resultado de la función es el esperado
            expect(cuerpoActualizado).toBe(cuerpoEsperado);
          });
*/
        it("debería devolver un valor true demostrando que devuelve algo",
        function () {
            expect(Surferos.listar());
        });

        it("debería devolver un valor true demostrando que devuelve algo",
        function () {
            expect(Surferos.listarNombres());
        });


    /*    
        describe("Surferos", function () {
            describe("procesarListaNombres", function () {
              it("debería descargar la ruta /surferos/getTodas y llamar a la función imprimeMuchasPersonas", function () {
                spyOn(Surferos, "descargarRuta");
                spyOn(Surferos, "imprimeMuchasPersonas");
          
                Surferos.procesarListaNombres();
          
                expect(Surferos.descargarRuta).toHaveBeenCalledWith("/surferos/getTodas", Surferos.imprimeMuchasPersonas);
              });
            });
          });
*/
describe("Surferos", () => {
  describe("ordenarPorNombre", () => {
    it("debería ordenar el vector por nombre correctamente", () => {
      const vector = [        {           ref: { "@ref":{id: '1'} },          ts: 1678797062065000,          data: { nombre: "Juan" }        },        {           ref: { "@ref":{id: '2'} },          ts: 1678797062065000,          data: { nombre: "Pedro" }        },        {           ref: { "@ref":{id: '3'} },          ts: 1678797062065000,          data: { nombre: "Ana" }        },      ];
      const resultadoEsperado = [        {           ref: { "@ref":{id: '3'} },          ts: 1678797062065000,          data: { nombre: "Ana" }        },        {           ref: { "@ref":{id: '1'} },          ts: 1678797062065000,          data: { nombre: "Juan" }        },        {           ref: { "@ref":{id: '2'} },          ts: 1678797062065000,          data: { nombre: "Pedro" }        },      ];
      Surferos.ordenarPorNombre(vector);
      expect(vector).toEqual(resultadoEsperado);
    });
  });
});
/*
  describe("imprimexNombre", () => {
    it("debería generar el mensaje con los nombres ordenados correctamente", () => {
      const vector = [        {           ref: { "@ref":{id: '1'} },          ts: 1678797062065000,          data: { nombre: "Juan" }        },        {           ref: { "@ref":{id: '2'} },          ts: 1678797062065000,          data: { nombre: "Pedro" }        },        {           ref: { "@ref":{id: '3'} },          ts: 1678797062065000,          data: { nombre: "Ana" }        },      ];
      const resultadoEsperado =
        "<table><thead><tr><th>Nombre</th></tr></thead><tbody><tr><td>Ana</td></tr><tr><td>Juan</td></tr><tr><td>Pedro</td></tr></tbody><tfoot><tr><td>Total: 3</td></tr></tfoot></table>";
      const mensaje = Surferos.imprimexNombre(vector);
      expect(mensaje).toEqual(resultadoEsperado);
    });
  });



describe('Surferos.personaComoTabla', () => {
  it('devuelve una cadena con los datos de la persona actualizados en la plantilla', () => {
    // Arrange
    const surfero = {
      ref: {
        "@ref":{id: '359177288543109324'}
      },
      ts: 1678797062065000,
      data: {
        nombre: 'Gabriel',
        apellidos: 'Medina',
        lugarNacimiento: {
          ciudad: 'Sao Sebastiao',
          pais: 'Brazil'
        },
        numCampeonatosDisputados: {
          cantidad: 7,
          evento: 'Quiksilver Pro Gold Coast'
        },
        añosCompitiendo: [2008, 2009, 2010, 2011, 2013, 2014, 2015],
        puntuacion: 62800,
        numVictorias: 1
      }
    };
    
    const plantilla = {
      cabecera: '<table><thead><tr><th>Id</th><th>Nombre</th><th>Apellidos</th><th>Lugar nacimiento</th><th>Numero de campeonatos disputados</th><th>Años compitiendo</th><th>Puntuación máxima</th><th>Numero de victorias</th></tr></thead><tbody>',
      pie: '</tbody></table>',
      actualiza: (persona) => `<tr title="${persona.ref["@ref"].id}"><td>${persona.ref["@ref"].id}</td><td>${persona.data.nombre}</td><td>${persona.data.apellidos}</td><td>${persona.data.lugarNacimiento.ciudad}, ${persona.data.lugarNacimiento.pais}</td><td>${persona.data.numCampeonatosDisputados.cantidad}  (${persona.data.numCampeonatosDisputados.evento})</td><td>${persona.data.añosCompitiendo.join(",")}</td><td>${persona.data.puntuacion}</td><td>${persona.data.numVictorias}</td></tr>`
    };
    
    //Act
    const resultado = Surferos.personaComoTabla(surfero, plantilla);
    // Assert
    expect(resultado).toEqual('<style>table, th, td { border: 1px solid black; }</style><table width="100%" class="listado-personas"><thead><th width="15%">Id</th><th width="10%">Nombre</th><th width="10%">Apellidos</th><th width="15%">Lugar nacimiento</th><th width="15%">Numero de campeonatos disputados</th><th width="20%">Años compitiendo</th><th width="10%">Puntuación máxima</th><th width="10%">Numero de victorias</th></thead><tbody><tr title="359177288543109324"><td>359177288543109324</td><td>Gabriel</td><td>Medina</td><td>Sao Sebastiao, Brazil</td><td>7 (Quiksilver Pro Gold Coast)</td><td>2008, 2009, 2010, 2011, 2013, 2014, 2015</td><td>62800</td><td>1</td></tr></tbody></table>');
 })    
});

*/// Descripción de la prueba
describe('Surferos', () => {
  describe('#ordenarPorVictorias', () => {
    it('Debería ordenar correctamente un vector de surfistas por número de victorias', () => {
      // Datos de entrada
      const vector = [
        { data: { numVictorias: 3 } },
        { data: { numVictorias: 1 } },
        { data: { numVictorias: 5 } }
      ];

      // Llamada a la función que se está probando
      Surferos.ordenarPorVictorias(vector);

      // Resultado esperado
      const resultadoEsperado = [
        { data: { numVictorias: 1 } },
        { data: { numVictorias: 3 } },
        { data: { numVictorias: 5 } }
      ];

      // Comprueba si el vector ha sido ordenado correctamente
      for (let i = 0; i < vector.length; i++) {
        if (vector[i].data.numVictorias !== resultadoEsperado[i].data.numVictorias) {
          throw new Error(`El vector no está ordenado correctamente en la posición ${i}`);
        }
      }
    });
  });
});

// Descripción de la prueba
describe('Surferos', () => {
  describe('#ordenarPorPuntuacion', () => {
    it('Debería ordenar correctamente un vector de surfistas por puntuación', () => {
      // Datos de entrada
      const vector = [
        { data: { puntuacion: 3 } },
        { data: { puntuacion: 1 } },
        { data: { puntuacion: 5 } }
      ];

      // Llamada a la función que se está probando
      Surferos.ordenarPorPuntuacion(vector);

      // Resultado esperado
      const resultadoEsperado = [
        { data: { puntuacion: 1 } },
        { data: { puntuacion: 3 } },
        { data: { puntuacion: 5 } }
      ];

      // Comprueba si el vector ha sido ordenado correctamente
      for (let i = 0; i < vector.length; i++) {
        if (vector[i].data.puntuacion !== resultadoEsperado[i].data.puntuacion) {
          throw new Error(`El vector no está ordenado correctamente en la posición ${i}`);
        }
      }
    });
  });
});

// Descripción de la prueba
describe('Surferos', () => {
  describe('#ordenarPorEvento', () => {
    it('Debería ordenar correctamente un vector de surfistas por evento', () => {
      // Datos de entrada
      const vector = [
        { data: { numCampeonatosDisputados: { evento: 'Evento C' } } },
        { data: { numCampeonatosDisputados: { evento: 'Evento A' } } },
        { data: { numCampeonatosDisputados: { evento: 'Evento B' } } }
      ];

      // Llamada a la función que se está probando
      Surferos.ordenarPorEvento(vector);

      // Resultado esperado
      const resultadoEsperado = [
        { data: { numCampeonatosDisputados: { evento: 'Evento A' } } },
        { data: { numCampeonatosDisputados: { evento: 'Evento B' } } },
        { data: { numCampeonatosDisputados: { evento: 'Evento C' } } }
      ];

      // Comprueba si el vector ha sido ordenado correctamente
      for (let i = 0; i < vector.length; i++) {
        if (vector[i].data.numCampeonatosDisputados.evento !== resultadoEsperado[i].data.numCampeonatosDisputados.evento) {
          throw new Error(`El vector no está ordenado correctamente en la posición ${i}`);
        }
      }
    });
  });
});
/*
// Definir las pruebas
describe('Surferos.cancelar', () => {
  it('debe imprimir una persona correctamente', () => {
    // Mock de los métodos y datos necesarios
    const personaMock = { nombre: 'Juan', edad: 25 };
    console.log = jest.fn();
    Surferos.imprimeUnaPersona = jest.fn();
    Surferos.recuperaDatosAlmacenados = jest.fn().mockReturnValue(personaMock);

    // Ejecutar la función a probar
    Surferos.cancelar();

    // Verificar si la función se llamó correctamente
    expect(console.log).toHaveBeenCalledWith(personaMock);
    expect(Surferos.imprimeUnaPersona).toHaveBeenCalled();
    expect(Surferos.recuperaDatosAlmacenados).toHaveBeenCalled();
  });

  it('debe deshabilitar campos editables correctamente', () => {
    // Mock de los métodos y datos necesarios
    const camposEditablesMock = document.querySelectorAll('.campo-editable');
    camposEditablesMock.forEach = jest.fn();
    Surferos.deshabilitarCamposEditables = jest.fn();

    // Ejecutar la función a probar
    Surferos.cancelar();

    // Verificar si la función se llamó correctamente
    expect(camposEditablesMock.forEach).toHaveBeenCalledWith(expect.any(Function));
    expect(Surferos.deshabilitarCamposEditables).toHaveBeenCalled();
  });

  it('debe ocultar opciones terciarias de editar correctamente', () => {
    // Mock de los métodos y datos necesarios
    const opcionesTerciariasMock = document.querySelectorAll('.opcion-terciaria-editar');
    opcionesTerciariasMock.forEach = jest.fn();
    Surferos.ocultarOcionesTerciariasEditar = jest.fn();

    // Ejecutar la función a probar
    Surferos.cancelar();

    // Verificar si la función se llamó correctamente
    expect(opcionesTerciariasMock.forEach).toHaveBeenCalledWith(expect.any(Function));
    expect(Surferos.ocultarOcionesTerciariasEditar).toHaveBeenCalled();
  });

  it('debe mostrar opciones secundarias correctamente', () => {
    // Mock de los métodos y datos necesarios
    const opcionesSecundariasMock = document.querySelectorAll('.opcion-secundaria');
    opcionesSecundariasMock.forEach = jest.fn();
    Surferos.mostrarOpcionesSecundarias = jest.fn();

    // Ejecutar la función a probar
    Surferos.cancelar();

    // Verificar si la función se llamó correctamente
    expect(opcionesSecundariasMock.forEach).toHaveBeenCalledWith(expect.any(Function));
    expect(Surferos.mostrarOpcionesSecundarias).toHaveBeenCalled();
  });
});


describe('Surferos', function() {
  beforeEach(function() {
      // Configurar el objeto Surferos para cada prueba
  });

  it('debería ocultar las opciones terciarias al llamar a ocultarOpcionesTerciariasEditar', function() {
      // Act
      Surferos.ocultarOpcionesTerciariasEditar();

      // Assert
      // Comprobar que la función opcionesMostrarOcultar es llamada con los argumentos correctos
      expect(Surferos.opcionesMostrarOcultar).toHaveBeenCalledWith('opcion-terciaria editar', false);
  });

  // Otras pruebas aquí

});
*/
/*
const myRequire = require('require');
const assert = myRequire('assert');


// Define las pruebas utilizando Mocha
describe('Surferos', function() {
  let plantilla;
  let surfero;

  beforeEach(function() {
    // Configurar los datos de prueba antes de cada prueba
    plantilla = `
      <tr>
        <td>{ID}</td>
        <td>{NOMBRE}</td>
        <td>{APELLIDOS}</td>
        <td>{CIUDAD}</td>
        <td>{PAIS}</td>
        <td>{NUM}</td>
        <td>{EVENTO}</td>
        <td>{AÑOS COMPITIENDO}</td>
        <td>{PUNTUACION}</td>
        <td>{NUM VICTORIAS}</td>
      </tr>
    `;
    surfero = {
      ref: { '@ref': { id: '12345' } },
      data: {
        nombre: 'Juan',
        apellidos: 'Pérez',
        lugarNacimiento: {
          ciudad: 'Barcelona',
          pais: 'España'
        },
        numCampeonatosDisputados: {
          cantidad: 5,
          evento: 'Mundial'
        },
        añosCompitiendo: 10,
        puntuacion: 8.5,
        numVictorias: 3
      }
    };
  });

  it('sustituyeTags reemplaza correctamente los tags en la plantilla con los datos del surfero', function() {
    const resultado = Surferos.sustituyeTags(plantilla, surfero);

    // Utiliza las aserciones incorporadas en el navegador, por ejemplo, assert.strictEqual() o assert.ok()
    // para realizar las pruebas
    assert.ok(resultado.includes('12345'));
    assert.ok(resultado.includes('Juan'));
    assert.ok(resultado.includes('Pérez'));
    assert.ok(resultado.includes('Barcelona'));
    assert.ok(resultado.includes('España'));
    assert.ok(resultado.includes('5'));
    assert.ok(resultado.includes('Mundial'));
    assert.ok(resultado.includes('10'));
    assert.ok(resultado.includes('8.5'));
    assert.ok(resultado.includes('3'));
  });

  // Agrega más pruebas aquí según sea necesario

});
*/