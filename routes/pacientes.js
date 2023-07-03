var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')

/* Seleccionar pacienites*/
router.get('/', function (req, res) {
  connection.query('SELECT * FROM pacientes', function (error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.render('pacientes', {pacientes: results, opcion: 'disabled', estado: true});
    }
  });
});


// Agregar pacientes

router.get('/agregar-persona', (req, res) => {
  res.sendFile('registro-pacientes.html', { root: 'public' });
})

router.post('/agregar', (req, res) => {
  const cedula = req.body.cedula;
  const nombre = req.body.persona;
  const apllido = req.body.apllido;
  const edad = req.body.edad;
  const telefono = req.body.telefono;
  connection.query(`INSERT INTO pacientes (nombre, apllido, cedula, edad, telefono) VALUES ('${nombre}','${apllido}', ${cedula}, ${edad}, '${telefono}')`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/pacientes');
    }
  });
})


// Actualizar pacientes

router.get('/activar', function (req, res) {
  connection.query('SELECT * FROM pacientes', function (error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.render('pacientes', { pacientes: results, opcion: ''});
    }
  });
});

router.post('/actualizar/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  const nombre = req.body.nombre;
  const apllido = req.body.apllido;
  const edad = req.body.edad;
  const telefono = req.body.telefono;
  connection.query(`UPDATE pacientes SET nombre='${nombre}', apllido='${apllido}', edad=${edad}, telefono=${telefono} WHERE cedula=${cedula}`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/pacientes');
    }
  });
})

// Eliminar pacientes

router.get('/eliminar/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  connection.query(`DELETE FROM pacientes WHERE cedula=${cedula}`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/pacientes');
    }
  });
})


module.exports = router;
