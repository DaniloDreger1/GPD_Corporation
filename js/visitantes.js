// Função para redirecionar o usuário para a página de login
function sair() {
  window.location.href = 'login.html'
}

/**
 * Função para salvar os dados do visitante utilizando o LocalStorage
 */
function salvarVisitante() {
  //obtendo os dados do formulário
  let nome = document.getElementById('nome').value
  let cpf = document.getElementById('cpf').value
  let idade = document.getElementById('idade').value
  let birth = document.getElementById('birth').value
  let termo = document.getElementById('termo').checked
  let sexo = document.querySelector('input[name="sexo"]:checked').value
  let observacao = document.getElementById('observacao').value

  // Verifique se todos os campos obrigatórios estão preenchidos
  if (!nome || !cpf || !idade || !birth || !termo || !sexo) {
    alert('Por favor, preencha todos os campos obrigatórios.')
    return
  }

  //criando um objeto com os dados do visitante
  let visitante = {
    id: Date.now(),
    nome: nome,
    cpf: cpf,
    idade: idade,
    birth: birth,
    termo: termo,
    sexo: sexo,
    observacao: observacao
  }
  // Obter os visitantes armazenados no LocalStorage ou um array vazio se não houver visitantes
  let visitantes = JSON.parse(localStorage.getItem('visitantes')) || []
  // Adicionando o visitante ao array de visitantes
  visitantes.push(visitante)
  //salva a lista atualizada no localstorage
  localStorage.setItem('visitantes', JSON.stringify(visitantes))
  // Atualizando a tabela de visitantes na página
  alert('Visitante cadastrado com sucesso!')
  listarVisitantes()
}
// Função para listar os visitantes na tabela
function listarVisitantes() {
  //obtendo os dados
  let visitantes = JSON.parse(localStorage.getItem('visitantes')) || []
  // Obtendo a tabela onde os visitantes serão exibidos
  let tabela = document.getElementById('listagem')
  tabela.innerHTML = '' // Limpando a tabela
  // Criando uma tabela HTML
  let table = document.createElement('table')
  table.className = 'table table-striped table-hover'
  table.innerHTML = `<thead>
                       <tr class='table-secondary'>
                         <th>Nome</th>
                         <th>CPF</th>
                         <th>Idade</th>
                         <th>Data de Nascimento</th>
                         <th>Termo de Uso</th>
                         <th>Sexo</th>
                         <th>Observações</th>
                         <th>Opções</th>
                       </tr>
                    </thead>
                    <tbody>
                    </tbody>   
                    `
  // Preenchendo a tabela com os dados dos visitantes
  let tbody = table.querySelector('tbody')
  for (let i = 0; i < visitantes.length; i++) {
    let visitante = visitantes[i]
    let dataObj = new Date(visitante.birth)
    let dia = dataObj.getDate()
    let mes = dataObj.getMonth() + 1 // Os meses são indexados a partir de 0, então adicionamos 1 para obter o mês correto.
    let ano = dataObj.getFullYear()
    let dataFormatada = `${dia}/${mes}/${ano}`
    let row = tbody.insertRow(i)
    row.innerHTML = `
                  <td class='text-white'>${visitante.nome}</td>
                  <td class='text-white'>${visitante.cpf}</td>
                  <td class='text-white'>${visitante.idade}</td>
                  <td class='text-white'>${dataFormatada}</td>
                  <td class='text-white'>${
                    visitante.termo ? 'Aceito' : 'Recusado'
                  }</td>
                  <td class='text-white'>${visitante.sexo}</td>
                  <td class='text-white'>${visitante.observacao}</td>
                  <td class='text-white'><button class='btn btn-clean btn-sm' 
                  onclick="apagarCliente('${
                    visitante.id
                  }')">Apagar</button></td>
                  `
  }

  tabela.appendChild(table)
}

// Chama a função para listar os visitantes assim que a página é carregada
listarVisitantes()

// Função para apagar um visitante pelo ID
function apagarCliente(id) {
  //obtendo os dados
  let visitantes = JSON.parse(localStorage.getItem('visitantes')) || []

  // Filtrando a lista de visitantes para remover o visitante com o ID correspondente
  visitantes = visitantes.filter(function (visitante) {
    return Number(visitante.id) !== Number(id)
  })
  // Atualizando o LocalStorage com a nova lista de visitantes
  localStorage.setItem('visitantes', JSON.stringify(visitantes))
  //atualizamos a UI
  listarVisitantes()
}

// Função para formatar o CPF inserido pelo usuário (adiciona pontos e traços)
function formatarCPF(cpf) {
  //Remove todos os caracteres não numericos
  cpf = cpf.replace(/\D/g, '') //Substitui dígito por nada

  // Limita o CPF a 11 caracteres
  cpf = cpf.slice(0, 11)

  //adiciona pontos e traços no formato do CPF
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

  return cpf
}

// Exemplo de uso
const cpf = document.getElementById('cpf')
cpf.addEventListener('input', function () {
  this.value = formatarCPF(this.value)
})
