/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */


// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

describe("Plantilla.cabeceraTable():", function () 
{
    it("debería devolver las etiquetas HTML para la cabecera de la tabla",
        function () 
        {
            expect(Plantilla.cabeceraTable()).toBe(`<table class="listado-nombres"><thead><th>Nombre</th><th>Apellidos</th></thead><tbody>`);
        })
})

describe("Plantilla.cuerpoTr():", function () 
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
                        nombre: "Luis",
                        apellidos: "Martinez"
                    }
                },
                {
                    ref: {
                        "@ref": {
                            id: "Id de Ana"
                        }
                    },
                    data: {
                        nombre: "Ana",
                        apellidos: "Rafael"
                    }
                }
            ]
            for (let i = 0; i < vector.data.length; ++i) 
            {
                let msj = Plantilla.cuerpoTr(vector.data[i])
                let persona = vector.data[i]
                expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
                expect(msj.includes(persona.data.nombre)).toBeTrue();
            }
        })
})

describe("Plantilla.pieTable():", function () 
{
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () 
        {
            expect(Plantilla.pieTable()).toBe("</tbody></table>");
        })
})


describe('Plantilla.imprimeDeportistas', () => {
    it('muestra correctamente los nombres de los deportistas', () => {
      // Preparamos los datos de prueba
      const datos = {
        data: [
          {
            ref: {
              '@ref': {
                id: 'Id de Luis'
              }
            },
            data: {
              nombre: 'Luis'
            }
          },
          {
            ref: {
              '@ref': {
                id: 'Id de Ana'
              }
            },
            data: {
              nombre: 'Ana'
            }
          }
        ]
      };
  
      // Simulamos el objeto elementoContenido
      const elementoContenido = document.createElement('div');
  
      // Llamamos a la función Plantilla.imprimeDeportistas
      Plantilla.imprimeDeportistas(datos, elementoContenido);
  
      // Comprobamos que los nombres se hayan mostrado correctamente en los elementos td
      expect(elementoContenido.getElementsByTagName('td')[0].innerText.search('Luis') >= 0).toBe(true);
      expect(elementoContenido.getElementsByTagName('td')[0].innerText.includes('Luis')).toBe(true);
      expect(elementoContenido.getElementsByTagName('td')[1].innerText.search('Ana') >= 0).toBe(true);
      expect(elementoContenido.getElementsByTagName('td')[1].innerText.includes('Ana')).toBe(true);
    });
  });

  describe('Plantilla.listar', () => {
    it('descarga todas las rutas correctamente', () => {
      // Simulamos la función Plantilla.descargarRuta2
      Plantilla.descargarRuta2 = jest.fn((ruta, indice) => Promise.resolve({ datos: [], posicion: indice }));
  
      // Llamamos a la función Plantilla.listar
      return Plantilla.listar().then(() => {
        // Verificamos que Plantilla.descargarRuta2 se haya llamado correctamente para cada ruta
        expect(Plantilla.descargarRuta2).toHaveBeenNthCalledWith(1, '/halterofilia/getTodas', 0);
        expect(Plantilla.descargarRuta2).toHaveBeenNthCalledWith(2, '/surferos/getTodas', 1);
        expect(Plantilla.descargarRuta2).toHaveBeenNthCalledWith(3, '/voleyPlaya/listarnPersonas', 2);
        expect(Plantilla.descargarRuta2).toHaveBeenNthCalledWith(4, '/natacion/listarnPersonas', 3);
        expect(Plantilla.descargarRuta2).toHaveBeenNthCalledWith(5, '/volley/getTodos', 4);
      });
    });
  });

  describe('Plantilla.mostrarHistorial', function() {
    it('Historial nunca tendrá un tamaño superior a 10', () => {
      const boton = document.getElementById('b-volley-home');
      for (let i = 0; i < 15; ++i){
        boton.click();
      }
      expect((Plantilla.getHistorial().length) <= 10).toBe(true);
    })
    it('La opción que se acaba de pulsar aparecerá en la tabla', () => {
      const boton = document.getElementById('b-volley-home');
      boton.click();
      var accion = 'Volley.procesarHome'

      Plantilla.mostrarHistorial(Plantilla.getHistorial());

      expect(elementoContenido.innerHTML.search(accion) >= 0).toBeTrue();
    })
/*
    it('Si la página se recarga, el historial estará vacío', () => {
      location.reload();
      done();
      expect(Plantilla.getHistorial().length).toEqual(0);
    })
    */
  })

  describe("Plantilla.listarPersonas():", function () 
{
    it("debería devolver una fila de tabla con los nombres ordenados de los deportistas",
        function () 
        {
          it("debería devolver una fila de tabla HTML con los datos de la persona proporcionada",
          function(){
              const personaPrueba = {nombre: 'Juan', apellidos: 'Pérez'};
              const fila = natacion.cuerpoListarPersonas({ data: personaPrueba });
              expect(fila).toBe('<tr><td>Juan</td><td>Pérez</td></tr>');
          });
          it("debería manejar correctamente los valores nulos",function () {
            const personaPrueba = { nombre: null, apellidos: 'González' };
            const fila = natacion.cuerpoListarPersonas({ data: personaPrueba });
            expect(fila).toBe('<tr><td></td><td>González</td></tr>');
          });
          it("debería manejar correctamente los valores nulos",function () {
            const personaPrueba = { nombre: undefined, apellidos: 'González' };
            const fila = natacion.cuerpoListarPersonas({ data: personaPrueba });
            expect(fila).toBe('<tr><td></td><td>González</td></tr>');
          });
        })
})

describe('Plantilla.imprimeDeportistas2', () => {
  it('muestra correctamente los nombres de los deportistas ordenados', () => {
    // Preparamos los datos de prueba
    const datos = [
      {
        nombre: "Juan",
        apellidos: "García Pérez",
      },
      {
        nombre: "María",
        apellidos: "Sánchez Gómez",
      },
      {
        nombre: "Pedro",
        apellidos: "López Hernández",
      },
    ];

    const salidaEsperada = Plantilla.cabeceraTable();
    for(let i = 0;i<datos.length;i++){
      salidaEsperada+=Plantilla.listarPersonas(datos[i]);
    }
    salidaEsperada+=Plantilla.pieTable();
    expect(Plantilla.imprimeDeportistas2(datos)).toBe(salidaEsperada);
    
  });
});
  

describe('Plantilla.listarOrdenado', () => {
  it('descarga todas las rutas correctamente', () => {
    // Simulamos la función Plantilla.descargarRuta2
    Plantilla.descargarRuta2 = jest.fn((ruta, indice) => Promise.resolve({ datos: [], posicion: indice }));

    // Llamamos a la función Plantilla.listar
    return Plantilla.listarOrdenado().then(() => {
      // Verificamos que Plantilla.descargarRuta2 se haya llamado correctamente para cada ruta
      expect(Plantilla.descargarRuta2).toHaveBeenNthCalledWith(1, '/halterofilia/getTodas', 0);
      expect(Plantilla.descargarRuta2).toHaveBeenNthCalledWith(2, '/surferos/getTodas', 1);
      expect(Plantilla.descargarRuta2).toHaveBeenNthCalledWith(3, '/voleyPlaya/listarnPersonas', 2);
      expect(Plantilla.descargarRuta2).toHaveBeenNthCalledWith(4, '/natacion/listarnPersonas', 3);
      expect(Plantilla.descargarRuta2).toHaveBeenNthCalledWith(5, '/volley/getTodos', 4);
    });
  });
});

describe('Plantilla', function() {
  describe('mostrarOpcionesVolleyPlaya', function() {
    beforeEach(function() {
      // Crea elementos de prueba y añade al DOM
      const opcionesHalterofilia = document.createElement('div');
      opcionesHalterofilia.id = 'opciones-halterofilia';
      opcionesHalterofilia.style.display = 'block';
      document.body.appendChild(opcionesHalterofilia);

      const opcionesVolleyPlaya = document.createElement('div');
      opcionesVolleyPlaya.id = 'opciones-volley-playa';
      opcionesVolleyPlaya.style.display = 'none';
      document.body.appendChild(opcionesVolleyPlaya);

      const opcionesNatacion = document.createElement('div');
      opcionesNatacion.id = 'opciones-natacion';
      opcionesNatacion.style.display = 'block';
      document.body.appendChild(opcionesNatacion);

      const opcionesVolley = document.createElement('div');
      opcionesVolley.id = 'opciones-volley';
      opcionesVolley.style.display = 'block';
      document.body.appendChild(opcionesVolley);

      const opcionesSurferos = document.createElement('div');
      opcionesSurferos.id = 'opciones-surferos';
      opcionesSurferos.style.display = 'block';
      document.body.appendChild(opcionesSurferos);

      const opcionesComun = document.createElement('div');
      opcionesComun.id = 'opciones-comun';
      opcionesComun.style.display = 'block';
      document.body.appendChild(opcionesComun);

      // Ejecuta la función a probar
      Plantilla.mostrarOpcionesVolleyPlaya();
    });

    afterEach(function() {
      // Remueve los elementos de prueba del DOM
      document.body.removeChild(document.getElementById('opciones-halterofilia'));
      document.body.removeChild(document.getElementById('opciones-volley-playa'));
      document.body.removeChild(document.getElementById('opciones-natacion'));
      document.body.removeChild(document.getElementById('opciones-volley'));
      document.body.removeChild(document.getElementById('opciones-surferos'));
      document.body.removeChild(document.getElementById('opciones-comun'));
    });

    it('debería ocultar opciones-halterofilia', function() {
      expect(document.getElementById('opciones-halterofilia').style.display).toBe('none');
    });

    it('debería mostrar opciones-volley-playa', function() {
      expect(document.getElementById('opciones-volley-playa').style.display).toBe('block');
    });

    it('debería ocultar opciones-natacion', function() {
      expect(document.getElementById('opciones-natacion').style.display).toBe('none');
    });

    it('debería ocultar opciones-volley', function() {
      expect(document.getElementById('opciones-volley').style.display).toBe('none');
    });

    it('debería ocultar opciones-surferos', function() {
      expect(document.getElementById('opciones-surferos').style.display).toBe('none');
    });

    it('debería ocultar opciones-comun', function() {
      expect(document.getElementById('opciones-comun').style.display).toBe('none');
    });
  });
});



