function adicionaEscutadorSelecionaGuia() {
    const objetoDoXML = obtemObjeto();
    let guias = objetoDoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'];

    const caixasDeCheckbox = document.querySelectorAll('.box_body_guia_check-input');
    const campoQtdeGuias = document.querySelector('.box_info_qtdeDeGuias_valor');

    caixasDeCheckbox.forEach(caixaCheckBox => {
        caixaCheckBox.addEventListener('change', () => {
            quantidadeGuias(caixasDeCheckbox);
        })
    })

    campoQtdeGuias.innerText = parseInt(guias.length);
}

function acaoTodasAsGuias() {
    const caixasDeCheckbox = document.querySelectorAll('.box_body_guia_check-input');
    const btnAcaoGuias = document.querySelectorAll('.btnAcaoGuias');

    btnAcaoGuias.forEach(btnAcao => {
        btnAcao.addEventListener('click', () => {
            if (btnAcao.innerText == 'Marcar todas as guias') {
                caixasDeCheckbox.forEach(caixaCheckBox => {
                    if (!caixaCheckBox.checked) {
                        caixaCheckBox.checked = true;
                    }
                })
            } else if (btnAcao.innerText == 'Desmarcar todas as guias') {
                caixasDeCheckbox.forEach(caixaCheckBox => {
                    if (caixaCheckBox.checked) {
                        caixaCheckBox.checked = false;
                    }
                })
            } else if (btnAcao.innerText == 'Deletar guias marcadas') {
                popUpConfirmaDeletaGuiasSelecionadas();
            }
            quantidadeGuias(caixasDeCheckbox);
        })
    })
}

function quantidadeGuias() {
    let qtdeSelecionadas = 0;
    const caixasDeCheckbox = document.querySelectorAll('.box_body_guia_check-input');

    campoQtdeGuiasSelecionadas.innerText = parseInt(qtdeSelecionadas);

    caixasDeCheckbox.forEach(caixaCheckBox => {
        qtdeSelecionadas = parseInt(campoQtdeGuiasSelecionadas.innerText);

        if (caixaCheckBox.checked) {
            qtdeSelecionadas++
        } else {
            qtdeSelecionadas = qtdeSelecionadas <= 0 ? 0 : qtdeSelecionadas--;
        }

        campoQtdeGuiasSelecionadas.innerText = parseInt(qtdeSelecionadas)
    })
}

function deletaGuiasSelecionadas() {
    setTimeout(() => {
        const caixasDeCheckbox = document.querySelectorAll('.box_body_guia_check-input');
        let qtdeGuiasDeletadas = 0;

        caixasDeCheckbox.forEach(caixaCheckBox => {
            if (caixaCheckBox.checked) {
                let objetoDoXML = obtemObjeto();
                let idGuia = parseInt(caixaCheckBox.parentElement.parentElement.id) - 1 - qtdeGuiasDeletadas;
                deletaGuia(objetoDoXML, idGuia);
                qtdeGuiasDeletadas++
            }
        })

        if (qtdeGuiasDeletadas > 0) {
            atualizaDados();
        }
        fechaBloqueioTela();
    }, 1000);
}