const mysql = require('mysql');

class Database{
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'lifttogether',
            password: 'Lifttogether1',
            database: 'lifttogether'
        });

        this.connection.connect((err) => {
            if(err) {
                console.error('Error conectando a la base de datos.', err);
            } else {
                console.log('Conexión exitosa a la base de datos.');
            }
        });
    }

    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, results) => {
                if(err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    close() {
        this.connection.end((err) => {
            if(err) {
                console.error('Error cerrando la conexión.');
            } else {
                console.log('Conexión cerrada.');
            }
        });
    }
}

module.exports = new Database();