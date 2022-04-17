const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'ilzyz0heng1bygi8.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    user: 'k3wsw3p3d3qavj6z',
    password: 'qkrojyqljzk8ol6a',
    database: 'iqjgtn4kitfvvybl',
    multipleStatements: true
});

connection.connect(function(error){
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected!');
    }
})

module.exports = connection;