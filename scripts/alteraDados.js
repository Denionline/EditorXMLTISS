function adicionaEscutadorPencil() {
    const botoesAlterar = document.querySelectorAll('.icon-pencil');

    botoesAlterar.forEach(botaoAlterar => {
        botaoAlterar.addEventListener('click', botao => {
            let itemSelecionado = botao.target.previousElementSibling.localName == 'label' ? botao.target.previousElementSibling.children[0] : botao.target.previousElementSibling;
            modificaInput(itemSelecionado, botao);
        })
    })
}

function adicionaEscutadorInput() {
    const caixasInput = document.querySelectorAll('input');

    caixasInput.forEach(caixaInput => {
        caixaInput.addEventListener('keypress', input => {
            if (input.key == 'Enter') {
                modificaInput(input.target, input.target.nextElementSibling);
            }
        })
    })

}

function modificaInput(itemSelecionado, botao) {
    let icon = botao.type == 'click' ? botao.target : botao;
    if (itemSelecionado.disabled) {
        itemSelecionado.removeAttribute('disabled');
        itemSelecionado.select();
        itemSelecionado.style.cursor = 'text';
        icon.src = 'imgs/valid.png';// Altera o ícone para valid.png.
        icon.classList.add('icon-valid');
        icon.title = 'Salvar';
    } else {
        alteraDados(itemSelecionado.dataset.campo, itemSelecionado.value, icon);
        itemSelecionado.setAttribute('disabled', 'true');
        itemSelecionado.style.cursor = 'pointer';
        icon.src = 'imgs/pencil.png';// Altera o ícone para pencil.png.
        icon.classList.remove('icon-valid');
        icon.title = 'Editar';
    }
}

function alteraDados(nomeID, valor, icon) {
    let caixa = obtemCaixaXmlsObjeto();
    let objetoDoXML = obtemObjeto();


    let localSelecionado = icon.parentElement.parentElement.classList[0];
    if (localSelecionado == 'caixaXmls') {
        alteraXmlNaCaixaXmls(botao);
    } else {
        if (nomeID == 'codigoDoPrestador') {
            objetoDoXML['ans:mensagemTISS']['ans:cabecalho']['ans:origem']['ans:identificacaoPrestador']['ans:codigoPrestadorNaOperadora'] = valor;
        } else if (nomeID == 'numeroDoProtocolo') {
            objetoDoXML[`ans:mensagemTISS`]['ans:prestadorParaOperadora']['ans:loteGuias']['ans:numeroLote'] = valor;
        } else if (nomeID == 'registroANS') {
            objetoDoXML['ans:mensagemTISS']['ans:cabecalho']['ans:destino']['ans:registroANS'] = valor;
        } else if (nomeID == 'nomeDoArquivo') {
            let id = obtemIdNoStorage() - 1;
            caixa[id]['nomeDoArquivo'] = valor;
            adicionaNomeDoArquivoNoStorage(valor);
        } else {
            if (localSelecionado == 'box_body_guia_resumo') {
                alteraDadosResumo(nomeID, valor, icon, objetoDoXML);
            } else if (localSelecionado == 'box_body_guia_detalhes_procs_proc') {
                alteraDadosProcedimentos(nomeID, valor, icon, objetoDoXML);
            } else if (localSelecionado == 'box_body_guia_detalhes_outras_despesa') {
                alteraDadosDespesas(nomeID, valor, icon, objetoDoXML);
            }
        }

        adicionaAoStorage(objetoDoXML);
        caixa[obtemIdNoStorage() - 1]['objetoXML'] = objetoDoXML;
        adicionaCaixaXmlsAoStorage(caixa);
        atualizaValores();
        atualizaSequencial();
    }
}

function alteraDadosResumo(nomeResumo, valor, icon, objetoDoXML) {
    let guias = objetoDoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'];
    let idGuiaSelecionado = parseInt(icon.parentElement.parentElement.parentElement.id) - 1;
    let resumoSelecionado = guias[idGuiaSelecionado];

    if (nomeResumo == 'numeroGuiaPrestador') {
        resumoSelecionado['ans:cabecalhoGuia']['ans:numeroGuiaPrestador'] = valor;
    } else if (nomeResumo == 'numeroGuiaOperadora') {
        resumoSelecionado['ans:dadosAutorizacao']['ans:numeroGuiaOperadora'] = valor;
    } else if (nomeResumo == 'numeroCarteirinha') {
        resumoSelecionado['ans:dadosBeneficiario']['ans:numeroCarteira'] = valor;
    } else if (nomeResumo == 'senha') {
        resumoSelecionado['ans:dadosAutorizacao']['ans:senha'] = valor;
    } else if (nomeResumo == 'dataDaGuia') {
        resumoSelecionado['ans:dadosAutorizacao']['ans:dataAutorizacao'] = formatDataParaXML(valor);
        resumoSelecionado['ans:dadosSolicitacao']['ans:dataSolicitacao'] = formatDataParaXML(valor);
    }else {
        resumoSelecionado['ans:dadosAutorizacao']['ans:dataValidadeSenha'] = formatDataParaXML(valor);
    }

}

    function alteraDadosProcedimentos(nomeProcedimento, valor, icon, objetoDoXML) {
        let idGuiaSelecionado = parseInt(icon.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id) - 1;
        let procedimentos = objetoDoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'][idGuiaSelecionado]['ans:procedimentosExecutados'];
        let idProcedimentoSelecionado = parseInt(icon.parentElement.parentElement.id) - 1;
        let procedimentoSelecionado = procedimentos[idProcedimentoSelecionado]

        if (nomeProcedimento == 'dataDoProcedimento') {
            procedimentoSelecionado['ans:dataExecucao'] = formatDataParaXML(valor);
        } else if (nomeProcedimento == 'codigoDoProcedimento') {
            procedimentoSelecionado['ans:procedimento']['ans:codigoProcedimento'] = valor;
        } else if (nomeProcedimento == 'codigoDaTabela') {
            procedimentoSelecionado['ans:procedimento']['ans:codigoTabela'] = valor;
        } else if (nomeProcedimento == 'descricaoProcedimento') {
            procedimentoSelecionado['ans:procedimento']['ans:descricaoProcedimento'] = valor;
        } else if (nomeProcedimento == 'reducaoDoProcedimento') {
            let porcentagem = parseInt(valor.replace('%', ''));
            console.log(porcentagem)
        } else {
            procedimentoSelecionado['ans:valorTotal'] = formatValueParaXML(valor);
            procedimentoSelecionado['ans:valorUnitario'] = formatValueParaXML(valor);
        }
    }

    function alteraDadosDespesas(nomeDespesa, valor, icon, objetoDoXML) {
        let idGuiaSelecionado = parseInt(icon.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id) - 1;
        let despesas = objetoDoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'][idGuiaSelecionado]['ans:outrasDespesas'];
        let idDespesaSelecionada = parseInt(icon.parentElement.parentElement.id) - 1;
        let despesaSelecionada = despesas[idDespesaSelecionada];

        if (nomeDespesa == 'tabelaDaDespesa') {
            despesaSelecionada['ans:servicosExecutados']['ans:codigoTabela'] = valor;
        } else if (nomeDespesa == 'descricaoDaDespesa') {
            despesaSelecionada['ans:servicosExecutados']['ans:descricaoProcedimento'] = valor;
        } else if (nomeDespesa == 'codigoDaDespesa') {
            despesaSelecionada['ans:servicosExecutados']['ans:codigoProcedimento'] = valor;
        } else if (nomeDespesa == 'dataDaDespesa') {
            despesaSelecionada['ans:servicosExecutados']['ans:dataExecucao'] = formatDataParaXML(valor);
        } else if (nomeDespesa == 'unidadeDaDespesa') {
            despesaSelecionada['ans:servicosExecutados']['ans:unidadeMedida'] = valor;
        } else if (nomeDespesa == 'qtdeDaDespesa') {
            despesaSelecionada['ans:servicosExecutados']['ans:quantidadeExecutada'] = formatDecimalQtde(valor);
        } else if (nomeDespesa == 'valorUnDaDespesa') {
            despesaSelecionada['ans:servicosExecutados']['ans:valorUnitario'] = formatValueParaXML(valor);
        } else {
            despesaSelecionada['ans:servicosExecutados']['ans:valorTotal'] = formatValueParaXML(valor);
        }
    }

    function alteraXmlNaCaixaXmls(icon) {
        let caixa = obtemCaixaXmlsObjeto();
        let nome = icon.previousElementSibling.children[0].value;
        let id = icon.parentElement.dataset.id;
        let novoNome = nome.replace('.xml', '');

        caixa[id - 1]['nomeDoArquivo'] = novoNome;
        adicionaCaixaXmlsAoStorage(caixa);
    }
