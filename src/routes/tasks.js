const express = require('express');
const router = express.Router();
const User = require('../models/User')
const mysql = require("mysql");
const database = require('../models/Database');
const fs = require('fs')


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

router.get('/getHosts',async (req,res) => {
    const rows = await database('SELECT * FROM hosts');
    for(host in rows){
        var ip = rows[host].ip
        fs.appendFile("hosts.txt", ip+"\n", err => {
            if (err) {
                console.error(err);
            }
        });
    }

    res.json({
        hosts:rows
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

router.delete('/deleteHost', async (req,res) => {
    console.log("Host a eliminar: "+req.body.ip)
    try{
        const rows = await database('DELETE FROM hosts where ip="'+req.body.ip+'"')
        res.json({
            status:true
        })
    }catch (e){
        console.log("Se ha producido un error: --> "+e);
        res.json({
            status:false
        })
    }
})

router.post('/installPackages',async(req,res)=>{
    console.log(req.body)
    var result = true;
    try{
        fs.unlinkSync("playbook.yml")
    }catch (e){
        result=false;
        console.log(e)
    }
    var packages = req.body
    fs.appendFile("playbook.yml", "---\n", err => console.log(err));
    fs.appendFile("playbook.yml", "hosts: all\n", err => console.log(err));
    fs.appendFile("playbook.yml", "tasks:\n", err => console.log(err));
    for(task in req.body){
        fs.appendFile("playbook.yml", "- name: Install package "+packages[task]+"\n", err => console.log(err));
        fs.appendFile("playbook.yml", "apt: name="+packages[task]+" state=present\n", err => console.log(err));
    }


    res.json({
        state:result
    })


})

module.exports = router;