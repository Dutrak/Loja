let gtabtn = document.getElementById("btn-gta");
let fifabtn = document.getElementById("btn-fifa");
let stardewbtn = document.getElementById("btn-stardew");
let gtainfo = document.querySelector("#GTA");
let fifainfo = document.querySelector("#FIFA");
let stardewinfo = document.querySelector("#STARDEW");

let carrinhoTable = ler("carrinho") || [];
let estoqueTable = ler("estoque") || [];

let estoque = [
  {
    nomeestoque: "gta",
    estoque: estoqueTable.find((produto) => produto.nomeestoque == "gta") ? estoqueTable.find((produto) => produto.nomeestoque == "gta").estoque : 10
  },
  {
    nomeestoque: "fifa",
    estoque: estoqueTable.find((produto) => produto.nomeestoque == "fifa") ? estoqueTable.find((produto) => produto.nomeestoque == "fifa").estoque : 10
  },
  {
    nomeestoque: "stardew",
    estoque: estoqueTable.find((produto) => produto.nomeestoque == "stardew") ? estoqueTable.find((produto) => produto.nomeestoque == "stardew").estoque : 10
  }
]


let gta = {
  nome: gtainfo.querySelector("h3").textContent,
  nomeestoque: "gta",
  preco: gtainfo
    .querySelector("#preco")
    .textContent.replace("R$", "")
    .replace(",", "."),
  img: gtainfo.querySelector("img").src,
  descricao: gtainfo.querySelector(".description").textContent,
};
gta.qtd_carrinho = carrinhoTable.find((produto) => produto.nome == gta.nome) ? carrinhoTable.find((produto) => produto.nome == gta.nome).qtd_carrinho : 0

let fifa = {
  nome: fifainfo.querySelector("h3").textContent,
  nomeestoque: "fifa",
  preco: fifainfo
    .querySelector("#preco")
    .textContent.replace("R$", "")
    .replace(",", "."),
  img: fifainfo.querySelector("img").src,
  descricao: fifainfo.querySelector(".description").textContent,
};
fifa.qtd_carrinho = carrinhoTable.find((produto) => produto.nome == fifa.nome) ? carrinhoTable.find((produto) => produto.nome == fifa.nome).qtd_carrinho : 0

let stardew = {
  nome: stardewinfo.querySelector("h3").textContent,
  nomeestoque: "stardew",
  preco: stardewinfo
    .querySelector("#preco")
    .textContent.replace("R$", "")
    .replace(",", "."),
  img: stardewinfo.querySelector("img").src,
  descricao: stardewinfo.querySelector(".description").textContent,
};

stardew.qtd_carrinho = carrinhoTable.find((produto) => produto.nome == stardew.nome) ? carrinhoTable.find((produto) => produto.nome == stardew.nome).qtd_carrinho : 0

// Eventos de clique para adicionar ao carrinho
gtabtn.addEventListener("click", () => {
  setLocalStorage(gta, estoque[0]);
});

fifabtn.addEventListener("click", () => {
  setLocalStorage(fifa, estoque[1]);
});

stardewbtn.addEventListener("click", () => {
  setLocalStorage(stardew, estoque[2]);
});

function setLocalStorage(item, estoque) {

  if (estoque.estoque >= 1) {
    estoque.estoque = (estoque.estoque || 0) - 1;
    item.qtd_carrinho = (item.qtd_carrinho || 0) + 1;

    if (!carrinhoTable.find((produto) => produto.nome == item.nome)) {
      carrinhoTable.push(item);
    } else {
      carrinhoTable.find((produto) => produto.nome == item.nome).qtd_carrinho = item.qtd_carrinho;
    }


    if (!estoqueTable.find((produto) => produto.nomeestoque == item.nomeestoque)) {
      estoqueTable.push(estoque);
    } else {
      estoqueTable.find((produto) => produto.nomeestoque == item.nomeestoque).estoque = estoque.estoque;
    }

    //window.location.reload();
    gravar("estoque", estoqueTable);
    gravar("carrinho", carrinhoTable);
  } else {
    alert("Produto esgotado");
  }
}
