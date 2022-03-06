const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;
app.get('/',function (req,res){
    res.sendFile("/home/nathan/AtividadeNeo4J/AtividadeREDIS/html/cadastro.html")
})
app.get('/cadastro',function (req,res){
    res.sendFile("/home/nathan/AtividadeNeo4J/AtividadeREDIS/html/cadastro.html")
})
app.get('/login',function (req,res){
    res.sendFile('/home/nathan/AtividadeNeo4J/AtividadeREDIS/html/login.html')
})
app.get('/timeline', function(req,res){
    res.sendFile("/home/nathan/AtividadeNeo4J/AtividadeREDIS/html/timeline.html")
})
app.get('/posts', function(req,res){
    res.sendFile("/home/nathan/AtividadeNeo4J/AtividadeREDIS/html/posts.html")
})
app.get('/pessoas', function(req,res){
    res.sendFile("/home/nathan/AtividadeNeo4J/AtividadeREDIS/html/pessoas.html")
})
const db = require('./database/database');
const mg = require('.//mongo/mongo')
const neo= require('./neo4j/neo4j')

app.post('/salvarMg', mg.setMongo)
app.post('/entrar',db.login);
app.post('/salvar', db.addPessoaBanco);
app.post('/getPg', db.login);
app.post('/getMongo', mg.getMongo);
app.post('/delet', mg.rmMongo)
app.post('/adNeo', neo.setNodoNeo4J)
app.post('/getPessoas', db.getPessoasBanco)
app.post('/setAmizade', neo.setAmizade)
app.post('/getAmizade', neo.getAmizade)
app.get('/main', function (req,res) {
    res.sendFile("/home/nathan/AtividadeNeo4J/AtividadeREDIS/assets/js/main.js")
})
// app.get('/rascunho', rd.getRedis);
app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});