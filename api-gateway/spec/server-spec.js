/**
 * @file server-spec.js 
 * @description Fichero con la especificación de pruebas para la aplicación API-gateway
 * Este fichero DEBE llamarse server-spec.js
 * Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Alvaros Alba y Francisco
 * @date 03-feb-2023
 */

const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * @description Rutas de ms-halterofilia
 */
describe('API Gateway: rutas estáticas', () => {
  describe('Rutas estáticas de MS Halterofilia', () => {
    it('Devuelve MS halterofilia Home Page', (done) => {
      supertest(app)
        .get('/halterofilia/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Halterofilia: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Halterofilia Acerca De', (done) => {
      supertest(app)
        .get('/halterofilia/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Datos de la autora");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });

    it('Devuelve F al consultar mediante test_db', (done) => {
        supertest(app)
          .get('/halterofilia/test_db')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            assert(res.body.data[0].data.hasOwnProperty('sexo'));
            assert(res.body.data[0].data.sexo === "F");
  
          })
          .end((error) => { error ? done.fail(error) : done(); }
          );
    });

    it('Obtiene todos los deportistas: debe tener un campo data que es distinto de 0', (done) => {
      supertest(app)
        .get('/halterofilia/getTodas')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert(res.body.hasOwnProperty('data'));
          assert(res.body.data.length !== 0);

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve Heavyweight al recuperar los datos de la Persona con id 358470619171389645 mediante getPorId', (done) => {
      supertest(app)
        .get('/halterofilia/getPorId/358470619171389645')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert(res.body.data.hasOwnProperty('sexo'));
          assert(res.body.data.sexo === "F");
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });
    it('Devuelve Alba al recuperar los datos de la Persona con id 358470619171389645 mediante setCampos', (done) => {
      const NOMBRE_TEST= 'Alba'
    const APELLIDOS_TEST= 'Gómez Liébana'
    const PAIS_TEST= 'Españita'
    const CATEGORIA_TEST='Lightweight'
    const deportista = 
    {
        id_deportista: '358470619171389645',
        nombre_deportista: NOMBRE_TEST,
        apellidos_deportista:APELLIDOS_TEST,
        fechaNacimiento_deportista: 
        {
            dia: 13,
            mes: 5,
            anio: 1985
        },
        aniosParticipacionOlimpiadas_deportista: [2008, 2012, 2016, 2020],
        numMedallasGanadas_deportista: 3,
        logros_deportista: [
          "Plata en Beijing 2008",
          "Oro en Londres 2012",
          "Bronce en Río 2016"
        ],
        pais_deportista: PAIS_TEST,
        categoria_deportista: CATEGORIA_TEST,
        sexo_deportista: "F"
    };
      supertest(app)
        .post('/halterofilia/setCampos')
        .send(deportista)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) 
        {
          assert(res.body.data.hasOwnProperty('nombre'));
          assert(res.body.data.nombre === NOMBRE_TEST);
  
          assert(res.body.data.hasOwnProperty('apellidos'));
          assert(res.body.data.apellidos === APELLIDOS_TEST);
  
          assert(res.body.data.hasOwnProperty('pais'));
          assert(res.body.data.pais === PAIS_TEST);
  
          assert(res.body.data.hasOwnProperty('categoria'));
          assert(res.body.data.categoria === CATEGORIA_TEST);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });
    it('Agrega un nuevo deportista a la base de datos', (done) => 
    {
      const NOMBRE_TEST = 'Manuel Jesús';
      const APELLIDOS_TEST = 'Carpio López';
      const PAIS_TEST = 'España';
      const CATEGORIA_TEST = 'Heavyweight';
      const SEXO_TEST = 'M';
      const FNACIMIENTO_TEST = {
        dia: 26,
        mes: 6,
        anio: 2001
      };
      const ANIOS_PARTICIPACION_TEST = [2020];
      const NUMMEDALLAS_TEST = 0;
      const LOGROS_TEST = [];
  
      const deportista = 
      {
        nombre_deportista: NOMBRE_TEST,
        apellidos_deportista: APELLIDOS_TEST,
        pais_deportista: PAIS_TEST,
        categoria_deportista: CATEGORIA_TEST,
        sexo_deportista: SEXO_TEST,
        fechaNacimiento_deportista: FNACIMIENTO_TEST,
        aniosParticipacionOlimpiadas_deportista: ANIOS_PARTICIPACION_TEST,
        numMedallasGanadas_deportista: NUMMEDALLAS_TEST,
        logros_deportista: LOGROS_TEST
      };
    
      supertest(app)
        .post('/halterofilia/setNuevoDeportista')
        .send(deportista)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
  
          assert(res.body.data.hasOwnProperty('nombre'));
          assert(res.body.data.nombre === NOMBRE_TEST);
  
          assert(res.body.data.hasOwnProperty('apellidos'));
          assert(res.body.data.apellidos === APELLIDOS_TEST);
  
          assert(res.body.data.hasOwnProperty('pais'));
          assert(res.body.data.pais === PAIS_TEST);
  
          assert(res.body.data.hasOwnProperty('categoria'));
          assert(res.body.data.categoria === CATEGORIA_TEST);
  
          assert(res.body.data.hasOwnProperty('sexo'));
          assert(res.body.data.sexo === SEXO_TEST);
  
          assert(res.body.data.hasOwnProperty('fechaNacimiento'));
          assert(res.body.data.fechaNacimiento.dia === FNACIMIENTO_TEST.dia);
          assert(res.body.data.fechaNacimiento.mes === FNACIMIENTO_TEST.mes);
          assert(res.body.data.fechaNacimiento.anio === FNACIMIENTO_TEST.anio);
  
          assert(res.body.data.hasOwnProperty('aniosParticipacionOlimpiadas'));
          assert(Array.isArray(res.body.data.aniosParticipacionOlimpiadas));
          assert(res.body.data.aniosParticipacionOlimpiadas.length === ANIOS_PARTICIPACION_TEST.length);
          assert(res.body.data.aniosParticipacionOlimpiadas[0] === ANIOS_PARTICIPACION_TEST[0]);
  
          assert(res.body.data.hasOwnProperty('numMedallasGanadas'));
          assert(res.body.data.numMedallasGanadas === NUMMEDALLAS_TEST);
  
          assert(res.body.data.hasOwnProperty('logros'));
          assert(Array.isArray(res.body.data.logros));
          assert(res.body.data.logros.length === LOGROS_TEST.length);
        })
        .end((error) => {
          error ? done.fail(error) : done();
        });
    });
  })
}); //FIN RUTAS HALTEROFILIA


/**
 * @describe Rutas ms-volley
 */
describe('API Gateway: rutas estáticas', () => {
  describe('Rutas estáticas de MS Volley', () => {
    it('Devuelve MS Volley Home Page', (done) => {
      supertest(app)
        .get('/volley/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Volley: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Volley Acerca De', (done) => {
      supertest(app)
        .get('/volley/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Volley: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })
});

/**
 * @describe Rutas ms-volleyPlaya
 */

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
  })
});

/**
 * @describe Rutas ms-natacionAletas
 */

describe('API Gateway: rutas estáticas', () => {
  describe('Rutas estáticas de MS natacion', () => {
    it('Devuelve MS natacion Home Page', (done) => {
      supertest(app)
        .get('/natacion/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Natacion: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS natacion Acerca De', (done) => {
      supertest(app)
        .get('/natacion/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Natacion: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve id correcto al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/natacion/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert(res.body.data[0].data.hasOwnProperty('ID'));
          assert(res.body.data[0].data.sexo === "1000");

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


  })
});