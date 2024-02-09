function adicionaEscutadorLixeira() {
    const botoesDeletar = document.querySelectorAll('.icon-lixeira');
    botoesDeletar.forEach(botaoDelete => {
        botaoDelete.addEventListener('click', botao => {
            let objetoDoXML = obtemObjeto();
            let itemSelecionado = botao.target.parentElement.classList[0];

            if (itemSelecionado == 'box_body_guia_detalhes_procs_proc') {
                // Verifica procedimentos                
                botao.target.src = 'imgs/load.png';
                botao.target.classList.add('icon-load');
                let idGuia = parseInt(botao.target.parentElement.parentElement.parentElement.parentElement.parentElement.id) - 1;
                let idItem = parseInt(botao.target.parentElement.id) - 1;
                setTimeout(() => {
                    deletaProcedimento(objetoDoXML, idGuia, idItem);
                    botao.target.classList.remove('icon-load');
                    atualizaDados();
                }, 1000)
            } else if (itemSelecionado == 'box_body_guia') {
                // Verifica guias
                botao.target.src = 'imgs/load.png';
                botao.target.classList.add('icon-load');
                let idGuia = parseInt(botao.target.parentElement.id) - 1;
                setTimeout(() => {
                    deletaGuia(objetoDoXML, idGuia);
                    botao.target.classList.remove('icon-load');
                    atualizaDados();
                }, 1000)
            } else if (itemSelecionado == 'box_body_guia_detalhes_outras_despesa') {
                // Verifica Despesas
                botao.target.src = 'imgs/load.png';
                botao.target.classList.add('icon-load');
                let idGuia = parseInt(botao.target.parentElement.parentElement.parentElement.parentElement.parentElement.id) - 1;
                let idItem = parseInt(botao.target.parentElement.id) - 1;
                setTimeout(() => {
                    deletaDespesa(objetoDoXML, idGuia, idItem);
                    botao.target.classList.remove('icon-load');
                    atualizaDados();
                }, 1000)
            }else if(itemSelecionado == 'caixaXmls_xml'){
                deletaXmlDaCaixa(botao);
            }
        })
    })
}

function deletaGuia(objetoDoXML, idGuia) {
    let guias = objetoDoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'];
    guias.splice(idGuia, 1);

    let abas = obtemDefinicoesDaPagNoStorage();
    abas['abaOpenOrClosed'].splice(idGuia, 1);

    adicionaDefinicoesDaPagNoStorage(abas);
    adicionaAoStorage(objetoDoXML);
    let caixa = obtemCaixaXmlsObjeto();
    caixa[obtemIdNoStorage()-1]['objetoXML'] = objetoDoXML;
    adicionaCaixaXmlsAoStorage(caixa);
}

function deletaProcedimento(objetoDoXML, idGuia, idItem) {
    let procedimentos = objetoDoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'][idGuia]['ans:procedimentosExecutados'];
    procedimentos.splice(idItem, 1);
    adicionaAoStorage(objetoDoXML);
    let caixa = obtemCaixaXmlsObjeto();
    caixa[obtemIdNoStorage()-1]['objetoXML'] = objetoDoXML;
    adicionaCaixaXmlsAoStorage(caixa);
}

function deletaDespesa(objetoDoXML, idGuia, idItem) {
    let despesas = objetoDoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'][idGuia]['ans:outrasDespesas'];
    despesas.splice(idItem, 1);
    adicionaAoStorage(objetoDoXML);
    let caixa = obtemCaixaXmlsObjeto();
    caixa[obtemIdNoStorage()-1]['objetoXML'] = objetoDoXML;
    adicionaCaixaXmlsAoStorage(caixa);
}