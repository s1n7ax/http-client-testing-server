var express = require('express');
var path = require('path');
var router = express.Router();
var Users = require('../database/users');

router.get('/', function(req, res, next) {
  res.render('index', { title: "Krypton Demo REST API"})
});

router.get('/users', (req, res, next) => {
    res.send(Users._list);
});

router.post('/user', (req, res, next) => {
    try{
        let nUser = new Users(req.body.id, 
            req.body.name, 
            req.body.age, 
            req.body.email);

        nUser.save();

        res.send("user added")
    }catch(err) {
        console.error(err)
        res.status(400).send(err.message);
    }
});

router.delete('/user', (req, res, next) => {
    try{
        let user = new Users(Number(req.query.id));
        user.delete();

        res.send("user deleted");
    }catch(err) {
        console.error(err)
        res.status(400).send(err.message);
    }
});


router.put('/user', (req, res, next) => {
    try {
        let nUser = new Users(req.body.id, 
            req.body.name, 
            req.body.age, 
            req.body.email);

        nUser.update();

        res.send("user updated");
    }catch(err) {
        console.error(err)
        res.status(400).send(err.message);
    }
});

router.get('/download_excel', (req, res, next) => {
    let filePath = path.join(__dirname, "../", "files/sample excel.xlsx");
    res.download(filePath);
});

router.get('/download_text', (req, res, next) => {
    let filePath = path.join(__dirname, "../", "files/sample text.txt");
    res.download(filePath);
})


module.exports = router;
