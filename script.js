const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors')
var app = express();

//Configuring express server
app.use(bodyparser.json());
app.use(cors());
var db = require('./db');


       //Establish the server connection
        //PORT ENVIRONMENT VARIABLE
        const port = process.env.PORT || 8080;
        app.listen(port, () => console.log(`Listening on port ${port}..`));


        //Creating GET Router to fetch all the learner details from the MySQL Database
        app.get('/resources' , (req, res) => {
        db.query('SELECT r.id, concat(r.fname," ",r.lname) as name,p.practiceName,ro.role, r.dateOfJoin FROM resource r JOIN practice p ON p.id = r.practiceId JOIN role ro ON ro.id = r.roleID WHERE r.isDeleted = 0 ORDER BY name', (err, rows, fields) => {
            if (!err)
            res.send(rows);
            else
            console.log(err);
            })
        });

        app.delete('/resource/delete/:id', function(req, res){
            console.log('going to delete', req.params.id);
            db.query(`UPDATE resource SET isDeleted = 1 WHERE id = ${req.params.id}`, (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log(err);
                })
        })

        //Creating GET Router to fetch all the learner details from the MySQL Database
        app.get('/clients' , (req, res) => {
            db.query(`SELECT id, name, IF(status = 1 ,"Active","Inactive") as status, clientSince FROM client WHERE isDeleted = 0 ORDER BY name`, (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log(err);
                })
        })

        app.delete('/client/delete/:id', function(req, res){
            console.log('going to delete', req.params.id);
            db.query(`UPDATE client SET isDeleted = 1 WHERE id = ${req.params.id}`, (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log(err);
                })
        })

        //Creating GET Router to fetch all the learner details from the MySQL Database
        app.get('/projects' , (req, res) => {
            db.query(`select p.id, p.projName,p.status,c.name AS client,pr.practiceName as practice from project p JOIN client c ON c.id = p.clientId JOIN practice pr ON pr.id = p.practiceId WHERE p.isDeleted = 0`, (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log(err);
            })
        })

        app.delete('/project/delete/:id', function(req, res){
            console.log('going to delete', req.params.id);
            db.query(`UPDATE project SET isDeleted = 1 WHERE id = ${req.params.id}`, (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log(err);
                })
        })

        //Creating GET Router to fetch all the learner details from the MySQL Database
        app.get('/category' , (req, res) => {
            db.query(`SELECT * FROM category`, (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log(err);
            })
        })

         //Creating GET Router to fetch all the learner details from the MySQL Database
         app.get('/category/:id' , (req, res) => {
            let query;
            if(req.params.id == 'all' ){
             query = `SELECT * FROM subCategory`

            } else {
                query = `SELECT * FROM subCategory WHERE category_id =${req.params.id}`
            }

            db.query( query, (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log(err);
            })
        })

        app.get('/users' , (req, res) => {
            db.query(`SELECT u.email, u.firstName, u.lastName, ui.mobile, ui.village FROM users u JOIN userInfo ui ON u.id = ui.user_id`, (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log(err);
            })
        })

        //Creating GET Router to fetch all the learner details from the MySQL Database
        app.get('/post/:id' , (req, res) => {
            console.log(req.params)
            // db.query(`select p.id, p.projName,p.status,c.name AS client,pr.practiceName as practice from project p JOIN client c ON c.id = p.clientId JOIN practice pr ON pr.id = p.practiceId WHERE p.isDeleted = 0`, (err, rows, fields) => {
            //     if (!err)
            //     res.send(rows);
            //     else
            //     console.log(err);
            // })
        })
