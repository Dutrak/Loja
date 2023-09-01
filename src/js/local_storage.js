
// Função para ler do localStorage
function ler(chave) {
    let retorno = null;
    if (window.localStorage) {
        retorno = JSON.parse(window.localStorage.getItem(chave));
    }
    else {
        alert("LocalStorage não é suportado");
    }
    return retorno;
}

// Função para gravar no localStorage
function gravar(chave, conteudo) {
    if (window.localStorage) {
        let v = JSON.stringify(conteudo);
        window.localStorage.setItem(chave, v);
    }
    else {
        alert("LocalStorage não é suportado");
    }
    return;
}
