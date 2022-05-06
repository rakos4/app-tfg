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





router.get('/login', async(req,res) => {
    const user = await User.find();
    console.log(user);
    res.send(user)
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

module.exports = router;