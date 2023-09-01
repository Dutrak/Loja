//Leitura do localStorage
let carrinhototal = ler("carrinho");
let estoque = ler("estoque");

if (carrinhototal == null || carrinhototal == undefined || carrinhototal.length == 0) {
  document.querySelector(".container").innerHTML = ""
  localStorage.removeItem("carrinho");
}

// Função para ler do localStorage e Adicionar ao HTML
let exibir = carrinhototal.map(function (produto, indice) {
  return ` <tr>
                    <td class="prod">
                    ${produto.nome}
                    <img src="${produto.img}">
                    </td>
                    <td class="descricao">${produto.descricao}</td>
                    <td>R$ ${produto.preco.replace(".", ",")}</td>
                    <td style="user-select: none"> <button id="btntirar${indice + 1
    }" class="btntirar">-</button> ${produto.qtd_carrinho} <button id="btnadd${indice + 1}" class="btnadd">+</button> </td>
            </tr>`;
});

document.querySelector(".carrinho tbody").innerHTML = exibir.join("");

let btnadd1 = document.querySelector("#btnadd1");
let btnadd2 = document.querySelector("#btnadd2");
let btnadd3 = document.querySelector("#btnadd3");
let btntirar1 = document.querySelector("#btntirar1");
let btntirar2 = document.querySelector("#btntirar2");
let btntirar3 = document.querySelector("#btntirar3");

if (btnadd1 && btntirar1) {
  btnadd1.addEventListener("click", () => {
    adicionar(0);
  });

  btntirar1.addEventListener("click", () => {
    tirar(0);
  });
}

if (btnadd2 && btntirar2) {
  btnadd2.addEventListener("click", () => {
    adicionar(1);
  });

  btntirar2.addEventListener("click", () => {
    tirar(1);
  });
}

if (btnadd3 && btntirar3) {
  btnadd3.addEventListener("click", () => {
    adicionar(2);
  });

  btntirar3.addEventListener("click", () => {
    tirar(2);
  });
}

function adicionar(i) {
  if (estoque.find((produto) => produto.nomeestoque == carrinhototal[i].nomeestoque).estoque > 0) {
    carrinhototal[i].qtd_carrinho++;
    estoque.find((produto) => produto.nomeestoque == carrinhototal[i].nomeestoque).estoque--;
    gravar("estoque", estoque)
    gravar("carrinho", carrinhototal);
    window.location.reload();
  } else {
    alert("Produto esgotado");
  }
}

function tirar(i) {
  if (carrinhototal[i].qtd_carrinho >= 1) {
    carrinhototal[i].qtd_carrinho--;
    estoque.find((produto) => produto.nomeestoque == carrinhototal[i].nomeestoque).estoque++;
    gravar("estoque", estoque)
    gravar("carrinho", carrinhototal);
    if (carrinhototal[i].qtd_carrinho == 0){
      apagar(i)
    } else{
      window.location.reload();
    }
  } 
}

function apagar(i) {
  carrinhototal.splice(i, 1);
  gravar("carrinho", carrinhototal);
  window.location.reload();
}

let produtos = carrinhototal.map((produto, indice) => {
  return `
      <p id="prod${indice}">
        - ${produto.nome} : ${produto.qtd_carrinho
    } x R$ ${produto.preco.replace(".", ",")} = R$ <span>${(
      parseFloat(produto.preco) * parseInt(produto.qtd_carrinho)
    )
      .toFixed(2)
      .replace(".", ",")}</span>
      </p>
    `;
});

let total = carrinhototal.reduce((total, produto) => {
  return total + parseFloat(produto.preco) * parseInt(produto.qtd_carrinho);
}, 0);


document.querySelector("#produtos").innerHTML = produtos.join("");
document.querySelector("#subtotal").innerHTML = "R$ " + total.toFixed(2);

document.querySelector("#produtosform").innerHTML = produtos.join("");
document.querySelector("#subtotalform").innerHTML = "R$ " + total.toFixed(2);
