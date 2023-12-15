const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const currentDirectory = __dirname;

// Configuração do banco de dados
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'livrodereceitas'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas CRUD
app.get('/receitas', (req, res) => {
    db.query('SELECT * FROM receitas', (err, result) => {
        if (err) {
            console.log("naoconectapqporra"); 
            throw err;
        }
        res.json(result);
        
    });
});

app.post('/receitas', (req, res) => {
    const {nomereceita, ingredientes, preparo, rendimento, tempo } = req.body;
    db.query('INSERT INTO receitas (nomereceita, ingredientes, preparo, rendimento, tempo) VALUES (?, ?, ?, ?, ?);', [nomereceita, ingredientes, preparo, rendimento, tempo], (err, result) => {
        if (err) throw err;
        res.send('Receita criada com sucesso!');
    });
});

app.put('/receitas/:idreceita', (req, res) => {
    const {nomereceita, ingredientes, preparo, rendimento, tempo } = req.body;
    const idreceita = req.params.idreceita;
    db.query('UPDATE receitas SET nomereceita = ?, ingredientes = ?, preparo = ?, rendimento = ?, tempo = ? WHERE idreceita = ?;', [nomereceita, ingredientes, preparo, rendimento, tempo, idreceita], (err, result) => {
        if (err) throw err;
        res.send('Receita atualizada com sucesso!');
    });
});

app.delete('/receitas/:idreceita', (req, res) => {
    const idreceita = req.params.idreceita;
    console.log(idreceita, "app.js")
    db.query('DELETE FROM receitas WHERE idreceita = ?;', [idreceita], (err, result) => {
        if (err) throw err;
        res.send('Receita excluída com sucesso!');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

  
  app.use(express.static(path.join(__dirname, 'public')));

  // Rota para a página inicial
  app.get('/', (req, res) => {
    res.sendFile(path.join('/public', 'index.html'));
  });
  
  // Rota para servir o JSON
  app.get('/json', (req, res) => {
    res.json(jsonData);
  });