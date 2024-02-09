function deletaObj(){
    const caixa = obtemCaixaXmlsObjeto();
    const id = obtemIdNoStorage() - 1;
    caixa.splice(id, 1);

    localStorage.removeItem('objetoXML');
    localStorage.removeItem('definicoesPag');
    localStorage.removeItem('mensagemTISS');
    campoNomeDoArquivo.value = '';
    
    adicionaCaixaXmlsAoStorage(caixa);
    
    abreLoading();

    if(caixa.length > 0){
        mostraXmlsNaCaixa();
        abreCaixaXmls();
    }else{
        fechaCaixaXML();
        abreInput();
    }

    fechaLoading();
}