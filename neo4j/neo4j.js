require("dotenv").config();
const { request,response } = require("express");
const neo4j = require("neo4j-driver")

const url = `neo4j://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}`;
const driver= neo4j.driver(url,neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD));


const setNodoNeo4J = async (request,response) =>{
    try{
    const session = driver.session()
    const {id,nome,email} = request.body
    const query = `CREATE (p:Pessoa{id:${id},nome:'${nome}',email:'${email}'}) RETURN p`
   await session.run(query).then(result => response.send(result.records[0].length>0)).then(() =>{session.close()})
    }finally{
    
    }
}
const setAmizade = async (request,response) =>{
    try{
    const session = driver.session()
    const {id1,id2} = request.body
    
    monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
    now = new Date
    let minuto 
    if (now.getMinutes() < 10){
       minuto = "0" + now.getMinutes()
    } else{
        minuto = now.getMinutes()
    }
    
    let data = +now.getHours()+":"+minuto+" "+ now.getDate() +' de '+ monName [now.getMonth()] + " " + now.getFullYear()
    const query = `MATCH (p1:Pessoa) , (p2:Pessoa) WHERE p1.id=${id1} AND p2.id=${id2} CREATE (p1)-[:AMIGO{data:'${data}'}]->(p2)`
    await session.run(query).then(() =>{session.close()})
    }finally{

    }
}


const getAmizade = async (request,response) =>{
    try{
    const session = driver.session()
    const {id1,id2} = request.body
    const query = `MATCH (p1:Pessoa{id:${id1}})-[d:AMIGO]->(p2:Pessoa{id:${id2}}) RETURN d`
    await session.run(query).then(result => response.send(result.records[0].length>0)).then(() =>{session.close()})
    }finally{

    }
}

module.exports ={
    setNodoNeo4J,
    setAmizade,
    getAmizade
}