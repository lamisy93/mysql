var mysql = require('mysql');

var connection = mysql.createConnection({

  host: 'localhost',
  user: 'root',
  password: '',
  database: 'intro_sql'

});

connection.connect();

const end = () => {
    connection.end();
}

const test = () => {
    const sql = 'SELECT 1 + 1 AS solution';
    connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
};

const createUser = (clbk, data) => {
    const q = "INSERT INTO user (name, lastname, email) VALUES (?, ?, ?)";
    const payload = [data.name, data.lastname, data.email];

    connection.query(q, payload, (err, res, cols) => {
        if (err) return clbk(err, null);
        else
        return clbk(null, res);
    })
};

const deleteUser = function() {
    const q = "DELETE FROM user WHERE id IN (?)";
    // const payload = [data.id];
    connection.query(q, [ids], (err, res, cols) => {
        if (err) return clbk(res, null);
        else
        return clbk(null, res);
    })

};

const getUser = (id, clbk) => {

    var sql;

    if (id && !isNaN(id)) {
      sql = "SELECT * FROM user WHERE id = ?"; // ? pour escape = echapper des données : securisé les données de l'utilisateurs
    } else {
      sql = "SELECT * FROM user";
   }
    console.log(sql);

    connection.query(sql, [id], (error, results, fields) => {
        if (error) throw error;
        clbk(results);

    });

};

const editUser = (clbk, user) => {


};

module.exports = {
    test: test,
    getUser: getUser,
    createUser,
    deleteUser,
    end, // shortcut es6 => si la clé === valeur (ex end: end)
    userToDelete, 
    editUser,
};