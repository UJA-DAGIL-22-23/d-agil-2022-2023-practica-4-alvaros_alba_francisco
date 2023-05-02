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

describe("Plantilla.cabeceraTable():", function () 
{
    it("debería devolver las etiquetas HTML para la cabecera de la tabla",
        function () 
        {
            expect(Plantilla.cabeceraTable()).toBe(`<table class="listado-nombres"><thead><th>Deporte</th><th>Nombre</th><th>Apellidos</th></thead><tbody>`);
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


