var deixaLogar = new Boolean(false);
var validou = new Boolean(false);
let resposta;
var API_KEY = "k_ixjet3x4"; // API IMDB - 1000 acessos   k_wcarsm20
var API_URL = 'https://imdb-api.com/API/SearchTitle/' + API_KEY + '/';

function voltar() {
  window.history.back();
}

function erroValidacao() {
  if (validou == true) {
    document.querySelector("#erroValidacao").style.display = "none"; // some a mensagem de erro
    document.querySelector(".botaoEntrar").style.display = "none"; // some o botão de entrar
    document.querySelector(".botaoAssine").style.display = "none"; // some o botão de assine
    document.querySelector(".seta").style.display = "none"; // some a seta
    document.querySelector("#Pesquisa").style.display = "inline-block" // aparece a pesquisa
    voltar();
  }
  else {
    document.querySelector("#erroValidacao").style.display = "block";
  }
}

function pegarToken() {
  if (deixaLogar == true) {
    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: document.querySelector('.cemail').value,
        password: document.querySelector('.cpassword').value
      })
    }).then(res => {
      return res.json()
    })
      .then(data => {
        localStorage.setItem("token", data.token);
        if (localStorage.getItem("token") != "undefined") {
          validou = true;
        }
      })
      .catch(error => console.log('ERROR'))
  }
}

function erroEscrita() {
  if (document.querySelector(".cemail").value.length < 3 ||
    document.querySelector(".cpassword").value.length < 3) {
    document.querySelector("#erroEscrita").style.display = "block";
    deixaLogar = false;
  }
  else {
    document.querySelector("#erroEscrita").style.display = "none";
    deixaLogar = true;
  }
}

function validar() {
  erroEscrita();
  pegarToken();
  setTimeout(erroValidacao, 1200); // executar em 1200ms
}

function jaLogado() {
  if (localStorage.getItem("token") != null || localStorage.getItem("token") != undefined) {
    validou = true;
  }
  if (validou == true) {
    document.querySelector("#erroValidacao").style.display = "none"; // some a mensagem de erro
    document.querySelector(".botaoEntrar").style.display = "none"; // some o botão de entrar
    document.querySelector(".botaoAssine").style.display = "none"; // some o botão de assine
    document.querySelector(".seta").style.display = "none"; // some a seta
    document.querySelector("#Pesquisa").style.display = "inline-block" // aparece a pesquisa
  }
}

function deletarFilho() {
  var e = document.querySelector(".displayFilmes");
  var first = e.firstElementChild;
  while (first) {
      first.remove();
      first = e.firstElementChild;
  }
}

function pesquisar(){
  deletarFilho();
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(API_URL + document.querySelector("#textoPesquisa").value, requestOptions)
    .then(response => response.text())
    .then(result => {
      resposta = JSON.parse(result)
      for (var i = 0; i < resposta.results.length; i++) {
        var obj = resposta.results[i]
        var a1 = document.createElement('div')
        a1.className = "container"
        a1.innerHTML = '<div class="caixaFilme"><div class="Poster"><img class="Poster" src=' + obj.image + ' alt="Poster"></div><div id="Titulo"><span>' + obj.title + '</span></div><div id="Descricao"><span>' + obj.description + '</span></div></div>'
        document.querySelector(".displayFilmes").appendChild(a1)
      }
    })
    .catch(error => console.log('error', error));
}

document.querySelector("#botaoPesquisa").addEventListener('click', () =>{
  pesquisar();
})

document.querySelector(".Login").addEventListener('click', () => {
  validar();
})

document.querySelector(".fechar").addEventListener('click',() => {
  voltar();
})

document.querySelector(".botaoEntrar").addEventListener('click', () => {
  jaLogado();
})

document.querySelector("#textoPesquisa").addEventListener('keydown', (event) =>{
  if(event.keyCode == 13){
    pesquisar();
    }
} )
