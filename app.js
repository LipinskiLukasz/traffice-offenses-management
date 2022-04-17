const express = require("express");
const path = require("path");
const expressEjsLayout = require('express-ejs-layouts')
const i18n = require('i18n');

const app = express();

const port = process.env.PORT || '3000';

app.set("views", path.join(__dirname, "views"));

i18n.configure({
    locales: ['en', 'de', 'pl'],
    directory: __dirname + '/locales',
    // change to 'de' in below line for visiting site in German language 
    defaultLocale: 'en'
  });
  
app.use(i18n.init);

app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname+'/public')));

app.use('/', require('./routes/index'));

app.get("/login", (req, res) => {
    res.render('/views/layout');
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
