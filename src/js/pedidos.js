keys = Object.keys(localStorage);

perfis = keys.filter(item => item.includes("perfil de: "));
pedidosgeral = keys.filter(item => item.includes("compra n° "));

let exibirPedidos = pedidosgeral.map(item => {
  let pedidoData = ler(item)
  let perfilData = ler("perfil de: " + pedidoData.cpf)
  let exibirProdutos = pedidoData.produtos.map(item => {
    return `
      <p>${item.nome}:  R$ ${item.preco.replace(".", ",")} x ${item.quantidade} = ${(item.quantidade * item.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>`
  })

  numeroCompra = item.split("compra n° ")[1]

  return `
<h2><strong>PEDIDO #${numeroCompra}</strong></h2>
<div class="pedidos">
  <table>
    <thead> 
      <tr>
        <th>Dados do Cliente</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td><br><br>Nome: ${perfilData.nome}</td>
        </tr>
        <tr>
            <td>CPF: ${perfilData.cpf}</td>
        </tr>
        <tr>
            <td>Telefone: ${perfilData.telefone}</td>
        </tr>
        <tr>
            <td>Email: ${perfilData.email}</td>
        </tr>
        <tr>  
            <td>CEP: ${perfilData.cep}</td>
        </tr>
        <tr>
            <td>Endereço: ${perfilData.endereco}</td>
        </tr>
        <tr>
            <td>Número: ${perfilData.numero}</td>
        </tr> 
        <tr>  
            <td>Bairro: ${perfilData.bairro}</td>
        </tr>
        <tr>
            <td>Cidade: ${perfilData.cidade}</td>
        </tr>
        <tr>
            <td>UF: ${perfilData.UF}</td>
        </tr>
    </tbody>
  </table>


  <table>
    <thead>
      <tr>
        <th>Dados do Pedido</th>
      </tr>
    </thead>
    <tbody>
        <tr>
          <td><br><br>
          Produtos Comprados: 
          <div class="produtos">
          ${exibirProdutos.join("")}
          </div>
          </td> 
        <tr>
          <td>Data da Compra: ${pedidoData.data}</td>
        </tr>
        <tr>
          <td id="subtotal">Total do Pedido: ${pedidoData.total}</td>
        </tr>
    </tbody>
  </table>
</div>  
`

})

document.querySelector(".container").innerHTML = exibirPedidos.join("")