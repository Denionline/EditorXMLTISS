const campoPopUp = document.querySelector('.pop-up_confirmaDeletaGuiasSelecionadas');

function popUpConfirmaDeletaGuiasSelecionadas() {
    const campoPopUp_qtde = document.querySelector('.pop-up_confirmaDeletaGuiasSelecionadas_descricao-qtde');
    const qtde = parseInt(campoQtdeGuiasSelecionadas.innerText);

    if (qtde > 0) {
        abreBloqueioTela();
        campoPopUp.classList.add('pop-up_confirmaDeletaGuiasSelecionadas__aberto');
        if (qtde > 1) {
            campoPopUp_qtde.innerText = qtde + ' guias';
        }else{
            campoPopUp_qtde.innerText = qtde + ' guia';
        }
        opcoesPopUpDeleteGuias();
    }
}

function opcoesPopUpDeleteGuias() {
    const opcoesPopUpDeleteGuias = document.querySelector('.pop-up_confirmaDeletaGuiasSelecionadas_opcoes');

    opcoesPopUpDeleteGuias.addEventListener('click', opcao => {
        const opcaoSelecionada = opcao.target.dataset.opcao;

        if (opcaoSelecionada == 'sim') {
            deletaGuiasSelecionadas();
        }

        campoPopUp.classList.remove('pop-up_confirmaDeletaGuiasSelecionadas__aberto');
        fechaBloqueioTela();
    })
}