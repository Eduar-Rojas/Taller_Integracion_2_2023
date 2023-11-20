const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Asegúrate de ajustar la ruta según tu estructura de archivos

// Ruta para obtener datos de construcción de sushi
router.get('/SushiBuild', async (req, res) => {
  try {
    const query = `SELECT * FROM "Build_Ingredientes"`;
    const ingredientes = await db.any(query);

    res.status(200).json(ingredientes);
  } catch (error) {
    console.error('Error al obtener datos de construcción de sushi:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener datos de construcción de sushi' });
  }
});

module.exports = router;
