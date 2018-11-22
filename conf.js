const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  '127.0.0.1', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  '', // le mot de passe
database :  'overwatch', // le nom de la base de données
});
module.exports = connection;