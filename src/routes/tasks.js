const express = require('express');
const router = express.Router();
const User = require('../models/User')
const mysql = require("mysql");
const database = require('../models/Database');


// MySQL

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'tfg',
    password : 'TrabajoTfg.1',
    database : 'tfg'
})

router.post('/login', async(req,res) =>{
    // creamos un usuario con los valores recibidos del formulario
    const formUser = new User(req.body.username,req.body.password,true);
    //obtenemos el usuario de la base de datos
    const rows = await database('SELECT * FROM users');
    var bdUser = new User(rows[0].username,rows[0].password,false);
    //comprobamos si son iguales
    var iguales = formUser.compareUser(bdUser);

    res.json({
        status:iguales
    })
})

router.post('/addHost', async(req,res) => {
    console.log(req.body)
    try {
        const rows = await database('INSERT INTO hosts (name,ip) VALUES("'+req.body.name+'","'+req.body.ip+'")');
        res.json({
            status:true
        })
    }catch (e) {
        console.log("Se ha producido un error: --> "+e);
        res.json({
            status:false
        })
    }


})

module.exports = router;