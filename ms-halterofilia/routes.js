/**
 * @file routes.js
 * @description Define las rutas ante las que va a responder al MS Halterofilia
 * @author Alba Gómez Liébana <agl00108@red.ujaen.es>
 * @date 03-feb-2023
 */

const express = require("express");
const router = express.Router();
const { callbacks } = require("./callbacks");

/**
 * Ruta raíz: /
 */
router.get("/", async (req, res) => {
    try {
        await callbacks.home(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Ruta Acerca De (es decir, About...)
 */
router.get("/acercade", async (req, res) => 
{
    try {
        await callbacks.acercaDe(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Test de conexión a la BBDD
 */
router.get("/test_db", async (req, res) => 
{
    try {
        await callbacks.test_db(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Devuelve todas las personas que hay en la BBDD
 */
router.get("/getTodas", async (req, res) => 
{
    try {
        await callbacks.getTodas(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Devuelve una persona que hay en la BBDD
 */
router.get("/getPorId/:idDeportista", async (req, res) => 
{
    try {
        await callbacks.getPorId(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Modifica el nombre de la persona con el id pasado
 */
router.post("/setCampos", async (req, res) => 
{
    try {
        await callbacks.setCampos(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Añade un nuevo jugador a la base de datos
 */
router.post('/setNuevoDeportista', async (req, res) => 
{
    try {
      await callbacks.setNuevoDeportista(req, res);
    } catch (error) {
      console.log(error);
    }
  });
  

// Exporto el módulo para poder usarlo en server
module.exports = router;
