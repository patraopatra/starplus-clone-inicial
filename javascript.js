function voltar() {
  window.history.back();
}

function pegarToken() {
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
      console.log(data);
      localStorage.setItem("token", data.token);
    })
    .catch(error => console.log('ERROR'))
} 
