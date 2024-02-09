function atualizaValores() {
    const objetoXML = obtemObjeto();
    const guias = objetoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'];
    let valorTotalDoXML = 0;

    for (guia = 0; guia < guias.length; guia++) {
        let guiaAtual = objetoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'][guia];
        let procedimentos = guiaAtual['ans:procedimentosExecutados'];
        let despesas = guiaAtual['ans:outrasDespesas'];

        let numeroGuiaOperadora = guiaAtual['ans:dadosAutorizacao']['ans:numeroGuiaOperadora'];

        let campoTotaisDaGuia = document.querySelector(`.box_body_guia_totais-${numeroGuiaOperadora}`);

        
        let campoTotalProcedimentos = campoTotaisDaGuia.children[0].children[1]
        let campoTotalMateriais = campoTotaisDaGuia.children[1].children[1]
        let campoTotalMedicamentos = campoTotaisDaGuia.children[2].children[1]
        let campoTotalGeral = campoTotaisDaGuia.children[3].children[1]

        let valorTotalProcedimentos = 0;
        let valorTotalMateriais = 0;
        let valorTotalMedicamentos = 0;
        let valorTotalGeral = 0;

        if (procedimentos) {
            for (procedimento = 0; procedimento < procedimentos.length; procedimento++) {
                let procedimentoAtual = guiaAtual['ans:procedimentosExecutados'][procedimento];
                valorTotalProcedimentos = valorTotalProcedimentos + parseFloat(procedimentoAtual['ans:valorTotal']);
            }
            guiaAtual['ans:valorTotal']['ans:valorProcedimentos'] = valorTotalProcedimentos.toFixed(4);
            campoTotalProcedimentos.innerText = formatValue(valorTotalProcedimentos);
        }
        
        if (despesas) {
            for (despesa = 0; despesa < despesas.length; despesa++) {
                let despesaAtual = guiaAtual['ans:outrasDespesas'][despesa];
                let valorTotalDoUnitarioXqtde = parseFloat(despesaAtual['ans:servicosExecutados']['ans:valorUnitario']) * parseInt(despesaAtual['ans:servicosExecutados']['ans:quantidadeExecutada']);
                let campoDespesa = document.querySelector(`.box_body_guia_detalhes_outras_despesa-${numeroGuiaOperadora}`);

                despesaAtual['ans:servicosExecutados']['ans:valorTotal'] = valorTotalDoUnitarioXqtde;

                campoDespesa.parentElement.children[despesa+1].children[7].children[0].value = formatValue(valorTotalDoUnitarioXqtde)

                if (despesaAtual['ans:codigoDespesa'] == 3) {// Se for Material
                    valorTotalMateriais = valorTotalMateriais + parseFloat(despesaAtual['ans:servicosExecutados']['ans:valorTotal']);
                } else {// Se for Medicamento
                    valorTotalMedicamentos = valorTotalMedicamentos + parseFloat(despesaAtual['ans:servicosExecutados']['ans:valorTotal']);
                }
            }

            guiaAtual['ans:valorTotal']['ans:valorMateriais'] = valorTotalMateriais.toFixed(4);
            campoTotalMateriais.innerText = formatValue(valorTotalMateriais);
            guiaAtual['ans:valorTotal']['ans:valorMedicamentos'] = valorTotalMedicamentos.toFixed(4);
            campoTotalMedicamentos.innerText = formatValue(valorTotalMedicamentos);
        }else{
            campoTotaisDaGuia.children[1].style.display = 'none'
            campoTotaisDaGuia.children[2].style.display = 'none'
        }
        
        valorTotalGeral = valorTotalProcedimentos + valorTotalMateriais + valorTotalMedicamentos;

        valorTotalDoXML = valorTotalDoXML + valorTotalGeral;

        guiaAtual['ans:valorTotal']['ans:valorTotalGeral'] = valorTotalGeral.toFixed(4);
        campoTotalGeral.innerText = formatValue(valorTotalGeral);
    }

    cabecalhoDoXML.campoValorXML.innerText = formatValue(valorTotalDoXML)
    adicionaAoStorage(objetoXML);

    let caixa = obtemCaixaXmlsObjeto();
    let id = obtemIdNoStorage() - 1;
    caixa[id]['ValorTotalXML'] = formatValue(valorTotalDoXML);
    adicionaCaixaXmlsAoStorage(caixa)
}
