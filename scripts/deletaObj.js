function deletaObj() {
    abreLoading();

    const caixa = obtemCaixaXmlsObjeto();
    const id = obtemIdNoStorage() - 1;
    caixa.splice(id, 1);

    localStorage.removeItem('objetoXML');
    localStorage.removeItem('definicoesPag');
    localStorage.removeItem('mensagemTISS');
    campoNomeDoArquivo.value = '';

    adicionaCaixaXmlsAoStorage(caixa);

    if (caixa.length > 0) {
        fechaCaixaXML();
        setTimeout(() => {
            mostraXmlsNaCaixa();
            abreCaixaXmls();
            fechaLoading();
        }, 1000)
    } else {
        fechaCaixaXML();
        abreInput();
    }

    fechaLoading();
}