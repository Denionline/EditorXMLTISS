// Adiciona Objeto ao Storage
function adicionaAoStorage(objetoXML){
    localStorage.setItem('objetoXML', JSON.stringify(objetoXML));
}
// Obtem Objeto do Storage
function obtemObjeto(){
    return JSON.parse(localStorage.getItem('objetoXML'));
}

// Adiciona caixaXmls ao Storage
function adicionaCaixaXmlsAoStorage(objetoXML){
    localStorage.setItem('caixaXmls', JSON.stringify(objetoXML));
}
// Obtem caixaXmls do Storage
function obtemCaixaXmlsObjeto(){
    return JSON.parse(localStorage.getItem('caixaXmls'));
}

// Adiciona links do XML no Storage
function adicionaMensagemTISSstorage(node){
    localStorage.setItem('mensagemTISS', JSON.stringify(node));
}
// Obtem links do XML no Storage
function obtemMensagemTISSstorage(){
    return JSON.parse(localStorage.getItem('mensagemTISS'));
}

// Adiciona configurações desejadas na página
function adicionaDefinicoesDaPagNoStorage(definicoes){
    localStorage.setItem('definicoesPag', JSON.stringify(definicoes));
}
// Obtem configurações desejadas da página
function obtemDefinicoesDaPagNoStorage(){
    return JSON.parse(localStorage.getItem('definicoesPag'));
}

// Adiciona nome do arquivo no local
function adicionaNomeDoArquivoNoStorage(nome){
    localStorage.setItem('nomeDoArquivo', JSON.stringify(nome));
}
// Obtem nome do arquivo do local
function obtemNomeDoArquivoNoStorage(){
    return JSON.parse(localStorage.getItem('nomeDoArquivo'));
}

// Adiciona id no local
function adicionaIdNoStorage(id){
    localStorage.setItem('id', JSON.stringify(id));
}
// Obtem id do local
function obtemIdNoStorage(){
    return JSON.parse(localStorage.getItem('id'));
}