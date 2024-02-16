function adicionaEscutadorAbas() {
    const abasItens = document.querySelectorAll('.box_body_guia_detalhes_itens');
    abasItens.forEach(abaItens => {
        abaItens.addEventListener('click', aba => {
            let nomeItem;
            let idGuia;
            let seta;
        
            if (aba.target.classList.contains('seta-aba')) {
                if (aba.target.classList.contains('seta-up')) {
                    abreAba(aba.target, aba.target.parentElement.parentElement.children[1])
                    seta = ('seta-down');
                } else {
                    fechaAba(aba.target, aba.target.parentElement.parentElement.children[1])
                    seta = ('seta-up');
                }
        
                nomeItem = aba.target.parentElement.parentElement.classList[0];
                idGuia = parseInt(aba.target.parentElement.parentElement.parentElement.parentElement.id) - 1;
        
                verificaAba(nomeItem, idGuia, seta);
            } else {        
                if (aba.target.children[0].classList.contains('seta-up')) {
                    abreAba(aba.target.children[0], aba.target.parentElement.children[1])
                    seta = ('seta-down');        
                } else {
                    fechaAba(aba.target.children[0], aba.target.parentElement.children[1])
                    seta = 'seta-up';
                }
        
                idGuia = parseInt(aba.target.parentElement.parentElement.parentElement.id) - 1;
                nomeItem = aba.target.parentElement.classList[0];
        
                verificaAba(nomeItem, idGuia, seta);
            }

        })
    })
    const abasSecundarias = document.querySelectorAll('.seta-aba');

    abasSecundarias.forEach(abaSecundaria => {
        abaSecundaria.addEventListener('click', aba => {
            if (aba.target.nextElementSibling) {
                let ProcedimentosChildrens = Array.from(aba.target.parentElement.children);

                ProcedimentosChildrens.forEach(Pchildren => {
                    if (Pchildren.classList.contains('box_body_guia_detalhes_procs_proc_AbaSecundaria')) {
                        if(Pchildren.classList.contains('abaOculta')){
                            abreAba(aba.target, Pchildren);
                        }else{
                            fechaAba(aba.target, Pchildren);
                        }
                    }
                })
            }
        })
    })

}

function abreAba(IconAba, ItemDaAba) {
    IconAba.classList.remove('seta-up');
    IconAba.classList.add('seta-down');
    ItemDaAba.classList.remove('abaOculta');
}
function fechaAba(IconAba, ItemDaAba) {
    IconAba.classList.remove('seta-down');
    IconAba.classList.add('seta-up');
    ItemDaAba.classList.add('abaOculta');
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