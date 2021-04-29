const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const usuariosModel = require("../models/usuarios");

router.get('/', function (req, res, next) {
    usuariosModel
        .obtener()
        .then(usuarios => {
            res.render("usuarios/ver", {
                usuarios,
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo usuarios: ");
        });

});

router.get('/agregar', function (req, res, next) {
    res.render("usuarios/agregar", {});
});
router.post('/insertar', function (req, res, next) {
    const { correo, palabraSecreta } = req.body;
    if (!correo || !palabraSecreta) {
        return res.status(500).send("No hay correo o palabraSecreta");
    }
    // Si todo va bien, seguimos
    usuariosModel.insertar(correo, palabraSecreta)
        .then(() => {
            res.redirect("/usuarios");
        })
        .catch(err => {
            return res.status(500).send("Error insertando usuario: " + err);
        });
});
router.get('/eliminar/:id', function (req, res, next) {
    usuariosModel
        .eliminar(req.params.id)
        .then(() => {
            res.redirect("/usuarios");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando: " + err);
        });
});
router.get('/login', function (req, res, next) {
    res.render("usuarios/login", {});
});
router.get('/logout', function (req, res, next) {
    req.session.destroy(() => {
        res.redirect("/usuarios/login");
    });
});
router.post('/login', function (req, res, next) {
    const { correo, palabraSecreta } = req.body;
    if (!correo || !palabraSecreta) {
        return res.status(500).send("No hay correo o palabraSecreta");
    }
    usuariosModel.obtenerUnoPorCorreo(correo)
        .then(usuario => {
            if (!usuario) {
                return res.status(500).send("Usuario no existe");
            }
            const palabraSecretaHasheada = usuario.palabra_secreta;
            bcrypt.compare(palabraSecreta, palabraSecretaHasheada, (error, coinciden) => {
                if (error) {
                    return res.json("La contraseña o el correo no coinciden:" + error);
                }
                if (!coinciden) {
                    return res.json("La contraseña o el correo no coinciden");
                } else {
                    req.session.correo = usuario.correo;
                    return res.redirect("/productos");
                }
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo usuario: " + err);
        });
});
module.exports = router;
