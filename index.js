const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});


app.get('/heroes', (req, res) => {
    connection.query('SELECT * FROM `ow_heroes`', (err, results) => {
      if (err) {
        res.status(500).send('Erreur ');
      } else {
        res.json(results);
      }
    });
  });
app.get('/heroes2', (req, res) => {
    connection.query('SELECT `Nom`, `Age` FROM `ow_heroes`', (err, results) => {
      if (err) {
        res.status(500).send('Erreur ');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/heroes3', (req, res) => {
    connection.query("SELECT `Nom` FROM `ow_heroes` WHERE `Nom` LIKE 'J%'", (err, results) => {
      if (err) {
        res.status(500).send('Erreur ');
      } else {
        res.json(results);
      }
    });
  });
  app.get('/heroes4', (req, res) => {
    connection.query("SELECT * FROM `ow_heroes` WHERE `Date de sortie` > '2017/01/01'", (err, results) => {
      if (err) {
        res.status(500).send('Erreur ');
      } else {
        res.json(results);
      }
    });
  });
  app.get('/heroes5', (req, res) => {
    connection.query("SELECT * FROM `ow_heroes` WHERE `Nom` LIKE '%a%'", (err, results) => {
      if (err) {
        res.status(500).send('Erreur ');
      } else {
        res.json(results);
      }
    });
  });
  app.get('/heroes6', (req, res) => {
    connection.query('SELECT * FROM `ow_heroes` ORDER BY `ow_heroes`.`Nom` ASC', (err, results) => {
      if (err) {
        res.status(500).send('Erreur ');
      } else {
        res.json(results);
      }
    });
  });
  app.post('/heroes7', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO ow_heroes SET ?', formData, (err, results) => {
      if (err) {
        res.status(500).send('Erreur ');
      } else {
        res.json(results);
      }
    });
  });
  app.put('/heroes8/:Nom', (req, res) => {
    const nomHero = req.params.Nom;
    const formData = req.body;
    connection.query('UPDATE ow_heroes SET ? WHERE Nom = ?', [formData, nomHero], err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur");
      } else {
        res.sendStatus(200);
      }
    });
  });
  
  app.put('/heroes9/:Nom', (req, res) => {
    const nom = req.params.Nom;
    connection.query('UPDATE `ow_heroes` SET `Bouclier`= !`Bouclier` WHERE Nom =?', [nom], err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur");
      } else {
        res.sendStatus(200);
      }
    });
  });
  
  
  app.delete('/heroes10/:Nom', (req, res) => {
    const nom = req.params.Nom;
    connection.query('DELETE FROM ow_heroes WHERE nom = ?', [nom], err => {
  
      if (err) {
        console.log(err);
        res.status(500).send("Erreur");
      } else {
        res.sendStatus(200);
      }
    });
  });
  
  app.delete('/heroes11/:Nom', (req, res) => {
    const bouclier = req.params.Bouclier;
    connection.query('DELETE FROM `ow_heroes` WHERE Bouclier > 0', [bouclier], err => {
  
      if (err) {
        console.log(err);
        res.status(500).send("Erreur");
      } else {
        res.sendStatus(200);
      }
    });
  });
  