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
            expect(Halterofilia.cabeceraTableNombre()).toBe(`<table class="listado-nombres"><thead><th>Deporte</th><th>Nombre</th><th>Apellidos</th></thead><tbody>`);
        })
})

