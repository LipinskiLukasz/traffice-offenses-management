const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const connection = require('../db/connection');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('API Key');

router.get('/', (req, res) => {
    res.render('welcome');
})

//login handle
router.get('/login', (req, res) => {
    res.render('login');
})

// admin layout to add new offender
router.get('/admin', (req, res) => {
    res.render('admin');
})

//authenticate user
router.post('/authentication', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    connection.query('SELECT * FROM trafficlogin WHERE username = ? AND userpassword = ?', [username, password], function (err, rows, fields) {
        if (err) throw err
        // if user not found
        if (rows.length <= 0) {
            res.sendStatus(401)
        }
        else { // if user found
            res.json({ msg: 'success' });
        }
    })
})

// add new offender in the database and send email
router.post('/addOffender', function (req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const location = req.body.location;
    const offense = req.body.offense;
    connection.query('INSERT INTO traffic_offenses (offender_name, offender_email, offender_location, offender_offense) VALUES (?,?,?,?)', [name, email, location, offense], function (err, rows, fields) {
        if (err) throw err
        // send email
        const msg = {
            to: email,
            from: 'lipinski.lukasz@protonmail.com',
            subject: 'New Traffic Offense',
            text: 'New Traffic Offense recorded',
            html: `<p>Hi ${name},
                New Traffic Offense - ${offense} located on your name for location at ${location}.`,
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
                res.json({ msg: 'success' });
            })
            .catch((error) => {
                console.error(error)
                res.json({ msg: 'success but failed to send email' });
            })
    })
})

//logout placeholder
router.get('/logout', (req, res) => {
})

//initial database setup
router.get('/database-setup', (req, res) => {
    const queriesLogin = fetchQueriesFromString(fs.readFileSync(path.join(__dirname, '../db/sql/trafficlogin.sql')).toString());
    const queriesOffenses = fetchQueriesFromString(fs.readFileSync(path.join(__dirname, '../db/sql/traffic_offenses.sql')).toString());
    const queries = [...queriesLogin, ...queriesOffenses];
    connection.query(queries.join(';'), (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log('Initial DB Setup completed');
        res.sendStatus(200);
    })
})

function fetchQueriesFromString(queriesString) {
    const queries = queriesString
        .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines
        .replace(/\s+/g, ' ') // excess white space
        .split(";") // split into all statements
        .map(Function.prototype.call, String.prototype.trim)
        .filter(function (el) { return el.length != 0 }); // remove any empty ones
    return queries;
}

module.exports = router;
