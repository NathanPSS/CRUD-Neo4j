require('dotenv').config();

const { request,response } = require('express');
const {MongoClient} = require("mongodb")

const client = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {useUnifiedTopology: true});

const setMongo = async (request,response) => {
    try{
        const {dadosPessoa,titulo,texto} = request.body
        const pessoa= {
            pessoa: dadosPessoa,
            titulo: titulo,
            texto: texto
        }
        await client.connect()
        const pessoas = client.db(`${process.env.MONGO_DATABASE}`).collection('Pessoa')
        await pessoas.insertOne(pessoa).then(response.send('Inserido'))

    } finally{
        await client.close()
    }
}
const getMongo = async (request,response) =>{
    try{
        
        const filter = (request.body)
        await client.connect()
        const database = client.db(`${process.env.MONGO_DATABASE}`)
        const pessoas = database.collection('Pessoa')
        const result = await pessoas.find(filter).toArray()
       response.send(result)
    } finally{
        await client.close()
    }
}
const rmMongo = async (request,response) =>{
    try{
        const filter = (request.body)
        await client.connect()
        const database = client.db(`${process.env.MONGO_DATABASE}`)
        const pessoas = database.collection('Pessoa')
        await pessoas.deleteMany(filter)
        response.send('Postagens deletadas')
    }
    finally{
     await client.close()
    }
}
module.exports = {
    setMongo,
    getMongo,
    rmMongo
}