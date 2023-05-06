/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Alba Gómez Liébana <agl00108@red.ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('API Gateway: rutas estáticas', () => {
  describe('Rutas estáticas de MS Volley Playa', () => {
    it('Devuelve MS Volley Playa Home Page', (done) => {
      supertest(app)
        .get('/voleyPlaya/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Volley Playa: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/voleyPlaya/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Volley Playa: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve F al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/voleyPlaya/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert(res.body.data[0].data.hasOwnProperty('numMedallasOlimpicas'));
          assert(res.body.data[0].data.sexo === "1");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
      });
      it('Obtiene todos los nadadores: debe tener un campo data que es distinto de 0', (done) => {
        supertest(app)
          .get('/natacion/listarnPersonas')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            assert(res.body.hasOwnProperty('data'));
            assert(res.body.data.length !== 0);
    
          })
          .end((error) => { error ? done.fail(error) : done() })
      });
      //
  })
});

