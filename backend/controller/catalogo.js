const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Ruta para obtener datos del catálogo
router.get('/catalogo', async (req, res) => {
  try {
    // Realiza la consulta a la base de datos (Revisa el método db)
    const sushi = await db.any(`SELECT * FROM "catalogo"`);
    res.json(sushi);
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos desde la base de datos' });
  }
});

module.exports = router;