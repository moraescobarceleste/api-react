const express = require('express');
const db = require('./db').promise();

function crud(tabla, id, campos) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const [rows] = await db.query(`SELECT * FROM ${tabla}`);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Error al consultar ${tabla}` });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const valores = campos.map(c => req.body[c]);
      const [result] = await db.query(
        `INSERT INTO ${tabla} (${campos.join(', ')}) VALUES (${campos.map(() => '?').join(', ')})`,
        valores
      );
      res.status(201).json({ [id]: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Error al crear en ${tabla}` });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const valores = campos.map(c => req.body[c]);
      await db.query(
        `UPDATE ${tabla} SET ${campos.map(c => `${c} = ?`).join(', ')} WHERE ${id} = ?`,
        [...valores, req.params.id]
      );
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Error al actualizar ${tabla}` });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await db.query(`DELETE FROM ${tabla} WHERE ${id} = ?`, [req.params.id]);
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(409).json({ error: 'No se pudo eliminar (¿tiene registros asociados?)' });
    }
  });

  return router;
}

module.exports = {
  clientes: crud('clientes', 'id_cliente', ['nomCliente', 'contacto', 'departamento', 'ciudad']),
  productos: crud('productos', 'id_producto', ['nomProducto', 'cantidad', 'precio']),
  ventas: crud('ventas', 'id_venta', ['id_cliente', 'fecha_venta', 'total', 'estado']),
};