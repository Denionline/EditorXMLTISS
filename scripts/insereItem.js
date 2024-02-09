
function adicionaEscutadorInsereItem() {
    const icons_insere = document.querySelectorAll('.icon-add-item');
    const itens_vazio = document.querySelectorAll('.box_body_guia_detalhes__vazio');

    icons_insere.forEach(icon_insere => {
        icon_insere.addEventListener('click', icon => {
            insereItem(icon.target.parentElement.parentElement.classList.contains("box_body_guia_detalhes_procedimentos"
            ), parseInt(icon.target.parentElement.parentElement.parentElement.parentElement.parentElement.id) - 1);
        })
    })
    itens_vazio.forEach(item_vazio => {
        item_vazio.addEventListener('click', item => {
            let nome = item.target.innerText;
            let idGuia = item.target.parentElement.parentElement.parentElement.id;

            if(nome == 'PROCEDIMENTOS'){
                insereItemVazio(true, idGuia)
            }else{
                insereItemVazio()
            }
        })
    })
}

function insereItem(item, idGuia) {
    const objetoXML = obtemObjeto();
    const guia = objetoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'][idGuia];

    if (item) {
        insereProcedimento(guia['ans:procedimentosExecutados']);
    } else {
        insereDespesa(guia['ans:outrasDespesas']);
    }

    adicionaAoStorage(objetoXML);
    atualizaDados();
}

function insereProcedimento(procedimentos) {
    const idNovoProcedimento = parseInt(procedimentos.length);
    const novoProcedimento = _.cloneDeep(procedimentos[0]);
    procedimentos.push(novoProcedimento);
    const proc = procedimentos[idNovoProcedimento];

    proc['ans:procedimento']['ans:codigoTabela'] = '-';
    proc['ans:procedimento']['ans:descricaoProcedimento'] = '-';
    proc['ans:procedimento']['ans:codigoProcedimento'] = '-';
    proc['ans:dataExecucao'] = 1;
    proc['ans:valorUnitario'] = 0.00;
    proc['ans:valorTotal'] = 0.00;
}

function insereDespesa(despesas) {
    const idNovoDespesas = parseInt(despesas.length);
    const novoDespesa = _.cloneDeep(despesas[0]);
    despesas.push(novoDespesa);
    const despesa = despesas[idNovoDespesas];

    despesa['ans:servicosExecutados']['ans:codigoTabela'] = '-';
    despesa['ans:servicosExecutados']['ans:descricaoProcedimento'] = '-';
    despesa['ans:servicosExecutados']['ans:codigoProcedimento'] = '-';
    despesa['ans:servicosExecutados']['ans:dataExecucao'] = 1;
    despesa['ans:servicosExecutados']['ans:unidadeMedida'] = '-';
    despesa['ans:servicosExecutados']['ans:quantidadeExecutada'] = 0;
    despesa['ans:servicosExecutados']['ans:valorUnitario'] = 0.00;
    despesa['ans:servicosExecutados']['ans:valorTotal'] = 0.00;
}


function insereItemVazio(item, idGuia){

}