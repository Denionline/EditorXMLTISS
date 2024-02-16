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
            let idGuia = parseInt(item.target.parentElement.parentElement.parentElement.id - 1);

            if (nome == 'PROCEDIMENTOS') {
                insereItem(true, idGuia)
            } else {
                insereItem(false, idGuia)
            }
        })
    })
}

function insereItem(item, idGuia) {
    const objetoXML = obtemObjeto();
    const guia = objetoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'][idGuia];

    if (item && guia['ans:procedimentosExecutados'] == undefined) {
        guia['ans:procedimentosExecutados'] = [objetoProcedimento()];

    } else if (!item && guia['ans:outrasDespesas'] == undefined) {
        guia['ans:outrasDespesas'] = [objetoDespesa()];

    } else {

        if (item) {
            insereProcedimento(guia['ans:procedimentosExecutados']);
        } else {
            insereDespesa(guia['ans:outrasDespesas']);
        }

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

const objetoProcedimento = () => {
    return {
        'ans:dataExecucao': 0,
        'ans:equipeSadt': {
            'ans:CBOS': "225320",
            'ans:UF': "53",
            'ans:codProfissional': {
                'ans:cpfContratado': "08315512676"
            },
            'ans:conselho': "06",
            'ans:grauPart': "12",
            'ans:nomeProf': "Rafael Gustavo dos Santos Oliveira",
            'ans:numeroConselhoProfissional': "23744"
        },
        'ans:horaFinal': "00:00:00",
        'ans:horaInicial': "00:00:00",
        'ans:procedimento': {
            'ans:codigoProcedimento': "-",
            'ans:codigoTabela': "-",
            'ans:descricaoProcedimento': "-"
        },
        'ans:quantidadeExecutada': 1,
        'ans:reducaoAcrescimo': 1.00,
        'ans:sequencialItem': 1,
        'ans:valorTotal': 0.00,
        'ans:valorUnitario': 0.00,
        'ans:viaAcesso': 1
    }
}
const objetoDespesa = () => {
    return {
        'ans:codigoDespesa': "02",
        'ans:sequencialItem': 1,
        'ans:servicosExecutados': {
            'ans:codigoProcedimento': "-",
            'ans:codigoTabela': "-",
            'ans:dataExecucao': 0,
            'ans:descricaoProcedimento': "-",
            'ans:quantidadeExecutada': 0,
            'ans:reducaoAcrescimo': "1.00",
            'ans:unidadeMedida': '-',
            'ans:valorTotal': 0.00,
            'ans:valorUnitario': 0.00
        }
    }
}