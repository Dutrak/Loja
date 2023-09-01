// Mascara para o CPF
function maskcpf() {
  var cpf = document.getElementById("cpf");
  if (!cpf) return "";
  cpf.value = cpf.value.replace(/\D/g, "");
  cpf.value = cpf.value.replace(/(\d{3})(\d)/, "$1.$2");
  cpf.value = cpf.value.replace(/(\d{3})(\d)/, "$1.$2");
  cpf.value = cpf.value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf.value;
}

// Função para validar o CPF
function validacpf() {
  var cpf = document.getElementById("cpf").value;

  let soma1 = 0;
  let soma2 = 0;
  var corpo = cpf.replaceAll(".", "").replaceAll("-", "").substring(0, 9);

  isEqual = false;

  for (i = 0; i < corpo.length; i++) {
    if (corpo[0] != corpo[i]) {
      isEqual = true;
    } else {
      isEqual = false;
    }
  }

  if (isEqual == false) {
    document.getElementById("cpf").value = "";
    autocomplete()
    if (cpf.length != 0) {
      alert("CPF invalido");
    }
    return
  }

  cont = 10;
  for (let i = 0; i < corpo.length; i++) {
    soma1 += cont * corpo.substring(i, i + 1);
    cont--;
  }
  let d1;
  11 - (soma1 % 11) >= 10 ? (d1 = 0) : (d1 = 11 - (soma1 % 11));
  corpo = corpo + d1;


  cont = 11;
  for (let i = 0; i < corpo.length; i++) {
    soma2 += cont * corpo.substring(i, i + 1);
    cont--;
  }
  let d2;
  11 - (soma2 % 11) >= 10 ? (d2 = 0) : (d2 = 11 - (soma2 % 11));

  if (!(cpf.substring(12, 13) == d1 && cpf.substring(13, 14) == d2)) {
    document.getElementById("cpf").value = "";
    autocomplete()
    if (cpf.length != 0) {
      alert("CPF invalido");
    }
  }

  autocomplete()

}

// Macara para o telefone
function masktelefone() {
  var telefone = document.getElementById("telefone");
  if (!telefone) return "";
  telefone.value = telefone.value.replace(/\D/g, "");
  telefone.value = telefone.value.replace(/(\d{2})(\d)/, "($1) $2");
  telefone.value = telefone.value.replace(/(\d{5})(\d)/, "$1-$2");
  return telefone.value;
}
// Função para validar CEP
function maskcep() {
  var cep = document.getElementById("cep");
  if (!cep) return "";
  cep.value = cep.value.replace(/\D/g, "");
  cep.value = cep.value.replace(/(\d{5})(\d)/, "$1-$2");
  return cep.value;
}

// Função para buscar o CEP
function APIcep() {
  var cep = document.getElementById("cep");
  if (cep.value != "") {
    fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
      .then((response) => response.json())
      .then((data) => {
        cepdata(cep, data);
      });
  } else {
    document.getElementById("cep").value = "";
    document.getElementById("endereco").value = ""
    document.getElementById("bairro").value = ""
    document.getElementById("cidade").value = ""
    document.getElementById("UF").value = ""
    readonly();
  }
}

// Função para preencher os campos com o retorno da API
function cepdata(cep, data) {
  if (!("erro" in data)) {
    document.getElementById("endereco").value = data.logradouro;
    document.getElementById("bairro").value = data.bairro;
    document.getElementById("cidade").value = data.localidade;
    document.getElementById("UF").value = data.uf;
    readonly();
  } else {
    alert("CEP inválido.");
    document.getElementById("cep").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("UF").value = "";
  }
}

// função para readonly
function readonly() {
  if (document.getElementById("endereco").value != "") {
    document.getElementById("endereco").readOnly = true;
  } else {
    document.getElementById("endereco").readOnly = false;
  }
  if (document.getElementById("bairro").value != "") {
    document.getElementById("bairro").readOnly = true;
  } else {
    document.getElementById("bairro").readOnly = false;
  }
  if (document.getElementById("cidade").value != "") {
    document.getElementById("cidade").readOnly = true;
  } else {
    document.getElementById("cidade").readOnly = false;
  }
  if (document.getElementById("UF").value != "") {
    document.getElementById("UF").readOnly = true;
  } else {
    document.getElementById("UF").readOnly = false;
  }
}

// Impede o enter de enviar o formulário
document.addEventListener("keydown", function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});

// Função para auto completar os campos a partir do CPF
function autocomplete() {
  let cpf = document.getElementById("cpf").value;
  if (ler("perfil de: " + cpf)) {
    let profile = ler("perfil de: " + cpf)
    document.getElementById("nome").value = profile.nome;
    document.getElementById("email").value = profile.email;
    document.getElementById("telefone").value = profile.telefone;
    document.getElementById("cep").value = profile.cep;
    document.getElementById("endereco").value = profile.endereco;
    document.getElementById("numero").value = profile.numero;
    document.getElementById("bairro").value = profile.bairro;
    document.getElementById("cidade").value = profile.cidade;
    document.getElementById("UF").value = profile.UF;
  } else {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("UF").value = "";
  }
}

const timeElapsed = Date.now();

// Evento que chama a função para enviar o formulário
document.getElementById("formulario").addEventListener("submit", function () {

  const tempo = Date.now();
  const hoje = new Date(tempo).toLocaleDateString("pt-BR");

  // Puxa os dados de cadastro do Usuario do formulario
  let profile = {
    cpf: document.getElementById("cpf").value,
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    cep: document.getElementById("cep").value,
    endereco: document.getElementById("endereco").value,
    numero: document.getElementById("numero").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    UF: document.getElementById("UF").value,
  }

  // Cria um vetor com os dados da compra 
  let dataCompra = {
    cpf: profile.cpf,
    nome: profile.nome,
    produtos: carrinhototal.map((item) => {
      return {
        nome: item.nome,
        preco: item.preco,
        quantidade: item.qtd_carrinho,
      }
    }),
    data: hoje,
    total: (carrinhototal.reduce((total, item) => total + item.preco * item.qtd_carrinho, 0)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }

  // Grava o perfil cdo usuario, caso ele ja exista o perfil é regravado com novas informações no localStorage
  gravar("perfil de: " + profile.cpf, profile)

  // Grava os dados das compras em um vetor em uma chave separada no LocalStorage
  gravar("compra n° " + tempo, dataCompra)

  //Confirmação da compra e reload da Página
  localStorage.removeItem("carrinho")
  alert("Compra Realizada com Sucesso!!")
  URL.revokeObjectURL()
});
