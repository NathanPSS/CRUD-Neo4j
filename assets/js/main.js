








function nomeTimeline(){

let nomeP =JSON.parse(localStorage.getItem('login'))
let nomeH='Seja Bem Vindo ' + nomeP.nome
document.getElementById('nomeTitulo').innerHTML = nomeH
}
function getTimeline(){
  fetch("http://localhost:3001/timeline",
  {
    method: 'GET'
  },
  )
}




function addPessoaPg(obj){
    fetch("http://localhost:3001/salvar",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response =>{alert('Cadastrado')})
    .catch(error => alert('Falha ao salvar!'));    

}



 function setMongo(){
  const pessoa = JSON.parse(localStorage.getItem('login'))
  const obj = {
      titulo: document.getElementById('titulo').value,
      texto: document.getElementById('texto').value,
     dadosPessoa: pessoa,
  };
  fetch("http://localhost:3001/salvarMg",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(response =>limpa())
    
  .catch(error => alert('Falha ao salvar!'));    

}






function login(){

  const obj = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      
  };
  fetch("http://localhost:3001/getPg",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(response => response.json())
    .then(response => (response))
    .then(response => (
      setLocalStorageLogin(JSON.stringify(response[0]))))
    .catch(err => console.log(err))
  
}






function getMongo(){
  const pessoa = JSON.parse(localStorage.getItem('login'))
  const obj = {
      pessoa: pessoa  
  };

  fetch("http://localhost:3001/getMongo",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(response => response.json())
  .then(response => (response))
  .then(response => (
    setLocalStoragePosts(JSON.stringify(response))))
  .catch(err => console.log(err))
  }





function setLocalStorageLogin(response) {
    localStorage.setItem('login',response)
    if(localStorage.getItem('login') === 'undefined'){
      window.alert('Error')
    }
   else{
    window.location.href = 'http://localhost:3001/timeline'
   }
}


function setLocalStoragePosts(response) {
  localStorage.setItem('posts',response)
  window.location.href = 'http://localhost:3001/posts'
}



function limpa(){
  document.getElementById('titulo').value = ''
  document.getElementById('texto').value = ''
}




function setPosts(){
  let array = JSON.parse(localStorage.getItem('posts'))
    array.forEach(element => {
    criaPosts(element)
    })
}



function criaPosts(element){
  
  let divNova= document.createElement("div")
  let divNovaTitulo = document.createElement("div");
  let divNovaParagrafo = document.createElement("div")

  let h2NovoTexto = document.createTextNode(element.titulo)
  let pNovoTexto = document.createTextNode(element.texto)

  let Titulo = document.createElement("h2")
  let Paragrafo = document.createElement("p")
 
  Paragrafo.appendChild(pNovoTexto)
  divNovaParagrafo.appendChild(Paragrafo)
  Titulo.appendChild(h2NovoTexto)
  divNovaTitulo.appendChild(Titulo)
 divNova.appendChild(divNovaTitulo)
 divNova.appendChild(divNovaParagrafo)

  let divAtual = document.getElementById("posts");
  divAtual.parentNode.insertBefore(divNova, divAtual);
}


if (window.location == 'http://localhost:3001/timeline'){
  nomeTimeline()
}


if (window.location == 'http://localhost:3001/posts'){
setPosts()
}

if (window.location == 'http://localhost:3001/pessoas'){
  getPessoas()
}

function sair(){
  window.location.href = 'http://localhost:3001/login'
}


function deletaPosts(){
  const pessoa = JSON.parse(localStorage.getItem('login'))
  const obj = {
    pessoa: pessoa
  }
  fetch('http://localhost:3001/delet',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  
}



  function addPessoaNeo(obj){
    fetch("http://localhost:3001/adNeo",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })   

}



 function criaPessoas(element){
  
  let divNova= document.createElement("div")
  let divNovaBotao = document.createElement("div");

  let botao= document.createElement("button")
  botao.classList.add('btn-primary')
  botao.id= 'botao'
  let butaoNome= document.createTextNode(element.nome)
  let quebra = document.createElement("br")
  
  botao.value= element.id
  
  document.addEventListener("click",x)
  botao.appendChild(butaoNome)
  divNovaBotao.appendChild(botao)
  divNova.appendChild(divNovaBotao)
  divNova.appendChild(quebra)

  let divAtual = document.getElementById("pessoas");
  divAtual.parentNode.insertBefore(divNova, divAtual);
  
}



function addPessoa(){
  const obj = {
    id: Math.floor(Math.random() * 65536),
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
}
 addPessoaNeo(obj)
 addPessoaPg(obj)
}



function getPessoas(){
  let id = JSON.parse(localStorage.getItem('login'))
  const obj = {
    id: id.id
  }
  fetch("http://localhost:3001/getPessoas",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(response => response.json())
  .then(response => setPessoas(response))
}



function setPessoas(response){
  let array = response
 array.forEach(element =>{
   criaPessoas(element)
 })
}


function setAmizade(evt) {
  let id= JSON.parse(localStorage.getItem('login'))
  const obj = {
    id1:  id.id,
    id2:  evt.target.value
  }
  fetch("http://localhost:3001/setAmizade",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  evt.target.remove()
}


function getAmizade(id2) {
  let id= JSON.parse(localStorage.getItem('login'))
  const obj = {
    id1:  id.id,
    id2:  id2
  }
  fetch("http://localhost:3001/getAmizade",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
}
function pessoas() {
  window.location.href = 'http://localhost:3001/pessoas'
}

let x = function (evt){
  setAmizade(evt)
}

