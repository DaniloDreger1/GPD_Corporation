// Seleciona o elemento de entrada de email e seu rótulo associado
let email = document.querySelector('#email')
let labelEmail = document.querySelector('label[for="email"]')
let validEmail = false

// Seleciona o elemento de entrada de senha e seu rótulo associado
let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('label[for="senha"]')
let validSenha = false

// Adiciona um evento para a entrada de email que é ativado quando o usuário digita
email.addEventListener('keyup', () => {
  // Verifica se o valor do email contém '@' e '.'
  if (!email.value.includes('@') || !email.value.includes('.')) {
    // Se não, exibe uma mensagem de erro e altera a cor do rótulo para vermelho
    labelEmail.style.color = 'red'
    labelEmail.innerHTML = 'Insira um e-mail válido'
    validEmail = false
  } else {
    // Se sim, remove a mensagem de erro e mantém a cor do rótulo preta
    labelEmail.style.color = 'black'
    labelEmail.innerHTML = 'E-mail'
    validEmail = true
  }
})

// Adiciona um evento para a entrada de senha que é ativado quando o usuário digita
senha.addEventListener('keyup', () => {
  // Verifica se a senha tem pelo menos 6 caracteres
  if (senha.value.length <= 5) {
    // Se não, exibe uma mensagem de erro e altera a cor do rótulo para vermelho
    labelSenha.style.color = 'red'
    labelSenha.innerHTML = 'Insira no mínimo 6 caracteres'
    validSenha = false
  } else {
    // Se sim, remove a mensagem de erro e mantém a cor do rótulo preta
    labelSenha.style.color = 'black'
    labelSenha.innerHTML = 'Senha'
    validSenha = true
  }
})

// Função chamada quando o usuário tenta se cadastrar
function cadastrar() {
  // Verifica se o email e a senha são válidos
  if (validEmail && validSenha) {
    // Obtém a lista de usuários do armazenamento local ou cria uma nova lista vazia
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

    // Adiciona o novo usuário à lista
    listaUser.push({
      emailCad: email.value,
      senhaCad: senha.value
    })

    // Salva a lista de usuários de volta no armazenamento local
    localStorage.setItem('listaUser', JSON.stringify(listaUser))

    // Exibe uma mensagem de boas-vindas e redireciona para a página de login após 0.5 segundos
    alert('Usuário cadastrado\nSeja Bem-vindo(a)')

    setTimeout(() => {
      window.location.href = 'login.html'
    }, 500)
  } else {
    // Se o email ou a senha não forem válidos, exibe uma mensagem de erro
    alert('Preencha todos os campos corretamente')
  }
}
