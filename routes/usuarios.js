const express = require('express');
const router = express.Router();

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
module.exports = router;
