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

