function adicionaEscutadorAbas() {
    const abasItens = document.querySelectorAll('.box_body_guia_detalhes_itens');
    abasItens.forEach(abaItens => {
        abaItens.addEventListener('click', aba => {
            let nomeItem;
            let idGuia;
            let seta;

            if (aba.target.classList[0] == 'seta-aba') {
                if (aba.target.classList.contains('seta-up')) {
                    aba.target.classList.remove('seta-up');
                    aba.target.classList.add('seta-down');
                    aba.target.parentElement.parentElement.children[1].classList.remove('abaOculta');
                    seta = ('seta-down');
                } else {
                    aba.target.classList.remove('seta-down');
                    aba.target.classList.add('seta-up');
                    aba.target.parentElement.parentElement.children[1].classList.add('abaOculta');
                    seta = ('seta-up');
                }

                nomeItem = aba.target.parentElement.parentElement.classList[0];
                idGuia = parseInt(aba.target.parentElement.parentElement.parentElement.parentElement.id) - 1;

                verificaAba(nomeItem, idGuia, seta);
            } else {
                if (aba.target.children[0].classList.contains('seta-up')) {

                    aba.target.children[0].classList.remove('seta-up');
                    aba.target.children[0].classList.add('seta-down');
                    aba.target.parentElement.children[1].classList.remove('abaOculta');
                    seta = ('seta-down');

                } else {

                    aba.target.children[0].classList.remove('seta-down');
                    aba.target.children[0].classList.add('seta-up');
                    aba.target.parentElement.children[1].classList.add('abaOculta');
                    seta = 'seta-up';

                }

                idGuia = parseInt(aba.target.parentElement.parentElement.parentElement.id) - 1;
                nomeItem = aba.target.parentElement.classList[0];

                verificaAba(nomeItem, idGuia, seta);
            }

        })
    })
}

function verificaAba(nomeItem, idGuia, seta) {
    const objetoDefinicoes = obtemDefinicoesDaPagNoStorage();

    if (obtemDefinicoesDaPagNoStorage()) {
        if (nomeItem == 'box_body_guia_detalhes_procs') {
            objetoDefinicoes['abaOpenOrClosed'][idGuia].abaP = seta;
        } else {
            objetoDefinicoes['abaOpenOrClosed'][idGuia].abaD = seta;
        }
    }


    adicionaDefinicoesDaPagNoStorage(objetoDefinicoes);
}