const express = require('express');
const router = express.Router();
const User = require('../models/User')
const database = require('../models/Database');
const {execSync} = require("child_process");
const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:'src/ansible',
    filename: function(req, file, callback){
        callback(null,file.originalname)
    }
})
const upload = multer({
    storage:storage

})

router.post('/login', async (req, res) => {

    // creamos un usuario con los valores recibidos del formulario
    const formUser = new User(req.body.username, req.body.password, true);
    //obtenemos el usuario de la base de datos
    const rows = await database('SELECT * FROM users');
    var bdUser = new User(rows[0].username, rows[0].password, false);
    //comprobamos si son iguales
    var iguales = formUser.compareUser(bdUser);

    res.json({
        status: iguales
    })
})

router.get('/getHosts', async (req, res) => {
    const rows = await database('SELECT * FROM hosts');
    try {
        fs.unlinkSync("src/ansible/hosts.txt")
    } catch (e) {
        console.log(e)
    }
    for (host in rows) {
        var ip = rows[host].ip
        fs.appendFile("src/ansible/hosts.txt", ip + "\n", err => {
            if (err) {
                console.error(err);
            }
        });
    }

    res.json({
        hosts: rows
    })
})

router.post('/addHost', async (req, res) => {
    console.log(req.body)
    try {
        await database('INSERT INTO hosts (name,ip) VALUES("' + req.body.name + '","' + req.body.ip + '")');
        res.json({
            status: true
        })
    } catch (e) {
        console.log("Se ha producido un error: --> " + e);
        res.json({
            status: false
        })
    }
})

router.delete('/deleteHost', async (req, res) => {
    console.log("Host a eliminar: " + req.body.ip)
    try {
        await database('DELETE FROM hosts where ip="' + req.body.ip + '"')
        res.json({
            status: true
        })
    } catch (e) {
        console.log("Se ha producido un error: --> " + e);
        res.json({
            status: false
        })
    }
})

//EXECUTIONS OF ANSIBLE
router.post('/installPackages', async (req, res) => {

    createPlaybook("Install", req.body)
    var result;
    try{
        var result1 = execSync('ansible-playbook -i src/ansible/hosts.txt -u root src/ansible/playbook.yml',{ encoding: 'utf-8' }).toString();
        result = result1.toString().split('\n')

    }catch (e){
        result=false
    }

    res.json({
        status:result
    })
});

router.post('/restartServices', async (req, res) => {

    createPlaybook(req.body.mode, req.body.packages)
    var result;
    try{
        var result1 = execSync('ansible-playbook -i src/ansible/hosts.txt -u root src/ansible/playbook.yml',{ encoding: 'utf-8' }).toString();
        result = result1.toString().split('\n')

    }catch (e){
        result=false
    }

    res.json({
        status:result
    })
});

router.post('/customAnsible',async(req,res) => {
    createPlaybook("custom",req.body.data)
    var result;
    try{
        var result1 = execSync('ansible-playbook -i src/ansible/hosts.txt -u root src/ansible/playbook.yml',{ encoding: 'utf-8' }).toString();
        result = result1.toString().split('\n')
    }catch (e){
        console.log(e)
        result=false
    }
    res.json({
        status:result
    })

})

router.post('/uploadFile',upload.single('file'),(req,res)=>{

    res.json({
        status:true
    })

})

function createPlaybook(mode, packages) {
    try {
        try {
            fs.unlinkSync("src/ansible/playbook.yml")
        } catch (e) {
            console.log("Error al eliminar el fichero")
        }
        if(mode !== "custom"){
            var service;
            var state;
            if(mode==="Install"){
                service = "    apt";
                state = "present";
            }else{
                service = "    service";
                state = mode
            }

            fs.appendFileSync("src/ansible/playbook.yml", "---\n", err => console.log(err));
            fs.appendFileSync("src/ansible/playbook.yml", "- hosts: all\n", err => console.log(err));
            fs.appendFileSync("src/ansible/playbook.yml", "  tasks:\n", err => console.log(err));

            for (task in packages) {
                fs.appendFileSync("src/ansible/playbook.yml", "  - name: " + mode + " package " + packages[task] + "\n", err => console.log(err));
                fs.appendFileSync("src/ansible/playbook.yml", service + ": name=" + packages[task] + " state=" + state + "\n", err => console.log(err));
            }
        }else{
            fs.appendFileSync("src/ansible/playbook.yml", packages, err => console.log(err));
        }

    } catch (e) {
        result = false;
        console.log(e)
    }


}



module.exports = router;