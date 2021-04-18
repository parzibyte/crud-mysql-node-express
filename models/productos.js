const conexion = require("../conexion")
module.exports = {
    insertar(nombre, precio, fecuc) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into productos
            (nombre, precio, fecuc)
            values
            (?, ?, ?)`,
                [nombre, precio, fecuc], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, precio, date_format(fecuc, "%d-%m-%Y") as fecuc from productos`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, precio, fecuc from productos where id = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },
    actualizar(id, nombre, precio, fecuc) {
        return new Promise((resolve, reject) => {
            conexion.query(`update productos
            set nombre = ?,
            precio = ?,
            fecuc = ?
            where id = ?`,
                [nombre, precio, fecuc, id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
    eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from productos
            where id = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
}