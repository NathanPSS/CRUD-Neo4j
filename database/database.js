require('dotenv').config();

const e = require('express');
const { request } = require('express');
const {Client} = require('pg');
const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});



client.connect()
    .then(()=> console.log('Conectado!'))
    .catch(err => console.log(err.stack));

const addPessoaBanco = (request, response) =>{
    const {id,nome,email,password} = request.body;
    
    const query = `INSERT INTO pessoa (nome,email,senha,id) VALUES ('${nome}','${email}','${password}',${id})`;

    client.query(query,(error, results) => {
            if(error){
                response.status(400).send(error);
                console.log(error);
                return;
            }
            response.status(200).send('Cadastrado');
        });
};
const getPessoasBanco = (request,response) =>{
    const {id} = request.body
    const query = `SELECT * FROM pessoa WHERE NOT id=${id}`;
    client.query(query,(error, results) => {
        if(error){
            response.status(400).send(error);
            console.log(error);
            return;
        }
    return response.status(200).json(results.rows);
});
}
const login = (request, response) =>{
    const {email,password} = request.body;
    const query = `SELECT * FROM pessoa WHERE email='${email}' AND senha=${password}`;
    client.query(query,(error, results) => {
        if(error){
            response.status(400).send(error);
            console.log(error);
            return;
        }
    return response.status(200).json(results.rows);
});
}
module.exports = {
    addPessoaBanco,
    getPessoasBanco,
    login
};