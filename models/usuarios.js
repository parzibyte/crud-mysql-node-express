const bcrypt = require("bcryptjs");
const conexion = require("../conexion")
module.exports = {
    insertar(correo, palabraSecreta) {
        return new Promise((resolve, reject) => {
            const rondasDeSal = 10;
            bcrypt.hash(palabraSecreta, rondasDeSal, (error, palabraSecretaHasheada) => {
                if (error) {
                    reject(error);
                }
                conexion.query(`insert into usuarios
            (correo, palabra_secreta)
            values
            (?, ?)`,
                    [correo, palabraSecretaHasheada], (err, resultados) => {
                        if (err) reject(err);
                        else resolve(resultados.insertId);
                    });
            });
        });
    },
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, correo, palabra_secreta FROM usuarios`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },
    obtenerUnoPorCorreo(correo) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, correo, palabra_secreta FROM usuarios WHERE correo = ?`,
                [correo],
                (err, resultados) => {
                    if (err) reject(err);
                    if (resultados.length > 0) {
                        resolve(resultados[0]);
                    } else {
                        resolve(null);
                    }
                });
        });
    },
    eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from usuarios
            where id = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
}