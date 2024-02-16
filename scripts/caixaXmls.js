const campo_caixaXmls = document.querySelector('.caixaXmls');

function mostraXmlsNaCaixa() {
    fechaMenuSuperiorEsquerda();
    const caixaXmls = obtemCaixaXmlsObjeto();
    if (caixaXmls.length > 0) {
        campo_caixaXmls.innerHTML = '<div class="caixaXmls_inserir">+ Inserir um novo</div>';
        for (xml = 0; xml < caixaXmls.length; xml++) {
            let guias = caixaXmls[xml]['objetoXML']['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'];
            let nomeDoArquivo = caixaXmls[xml]['nomeDoArquivo'];
            let valorTotalXML = caixaXmls[xml]['ValorTotalXML'];
            let id = xml + 1;
            caixaXmls[xml]['ID'] = id;
            campo_caixaXmls.innerHTML +=`
                <div class="caixaXmls_xml" data-id="${id}">
                    <img src="imgs/open.png" alt="Ícone para alterar" class="icon-open" title="Abrir">
                    <label class="caixaXmls_xml_label" for="caixaXmls_input${id}">
                        <input type="text" id="caixaXmls_input${id}" class="caixaXmls_xml_descricao" value="${nomeDoArquivo}.xml" disabled>
                    </label>
                    <img src="imgs/pencil.png" alt="Ícone para alterar" class="icon-pencil" title="Editar">
                    <img src="imgs/download.png" alt="Ícone de download" class="icon-download" title="Baixar">
                    <img src="imgs/lixeira.png" alt="" class="icon-lixeira" title="Excluir">
                    <div class="caixaXmls_xml_info">
                    <!--
                        <div class="caixaXmls_xml_info_valorProcedimentos caixaXmls_xml_info_item">
                            <div class="caixaXmls_xml_info_valorProcedimentos_descricao caixaXmls_xml_info_descricao">Valor Total dos Procedimentos</div>    
                            <div class="caixaXmls_xml_info_valorProcedimentos_valor caixaXmls_xml_info_valor">R$ 2.220,00</div>    
                        </div>
                        <div class="caixaXmls_xml_info_valorDespesas caixaXmls_xml_info_item">
                            <div class="caixaXmls_xml_info_valorDespesas_descricao caixaXmls_xml_info_descricao">Valor Total dos Materiais e Medicamentos</div>    
                            <div class="caixaXmls_xml_info_valorDespesas_valor caixaXmls_xml_info_valor">R$ 856,35</div>    
                        </div>
                    -->
                        <div class="caixaXmls_xml_info_valorTotal caixaXmls_xml_info_item">
                            <div class="caixaXmls_xml_info_valorTotal_descricao caixaXmls_xml_info_descricao">Valor Total do XML</div>    
                            <div class="caixaXmls_xml_info_valorTotal_valor caixaXmls_xml_info_valor">${valorTotalXML}</div>
                        </div>
                        <div class="caixaXmls_xml_info_qtde caixaXmls_xml_info_item">
                            <div class="caixaXmls_xml_info_qtde_descricao caixaXmls_xml_info_descricao">Quantidade de Guias</div>    
                            <div class="caixaXmls_xml_info_qtde_valor caixaXmls_xml_info_valor">${guias.length}</div>
                        </div>
                    </div>
                </div>`
        }
        adicionaEscutadorPencil();
        adicionaEscutadorLixeira();
        adicionaCaixaXmlsAoStorage(caixaXmls);
        adicionaEscutadorDescricaoCaixa();
        adicionaEscutadorCaixaXmls();
    } else {
        abreLoading();

        fechaMenuSuperiorEsquerda();
        fechaCaixaXmls();
        abreInput();

        fechaLoading();
    }
}

function adicionaEscutadorCaixaXmls() {
    const btnInserir = document.querySelector('.caixaXmls_inserir');
    const btnsOpen = document.querySelectorAll('.icon-open');
    const btnsBaixar = document.querySelectorAll('.icon-download');

    btnsOpen.forEach(btnOpen => {
        btnOpen.addEventListener('click', btn => {
            abreLoading();
            fechaCaixaXmls();
            let caixaXmls = obtemCaixaXmlsObjeto();
            let id = btn.target.parentElement.dataset.id;

            adicionaMensagemTISSstorage(caixaXmls[id - 1]['mensagemTISS']);
            adicionaAoStorage(caixaXmls[id - 1]['objetoXML']);
            adicionaNomeDoArquivoNoStorage(caixaXmls[id - 1]['nomeDoArquivo']);
            adicionaIdNoStorage(id);
            atualizaDados();
            fechaLoading();
        })
    })

    btnsBaixar.forEach(btns => {
        btns.addEventListener('click', btn => {
            let caixaXmls = obtemCaixaXmlsObjeto();
            let id = btn.target.parentElement.dataset.id;
            transformObjectToXML(caixaXmls[id - 1]['objetoXML'], caixaXmls[id - 1]['nomeDoArquivo'])
        })
    })

    btnInserir.addEventListener('click', () => {
        abreLoading();
        fechaCaixaXmls();
        setTimeout(() => {
            abreInput();
            fechaLoading();
        }, 1000)
    })


}

function adicionaEscutadorVoltar() {
    const btnVoltar = document.querySelector('.opcoesAdicionais_voltar');
    btnVoltar.addEventListener('click', () => {
        abreLoading();

        localStorage.removeItem('definicoesPag');
        localStorage.removeItem('objetoXML');

        fechaCaixaXML();
        setTimeout(() => {
            mostraXmlsNaCaixa();
            abreCaixaXmls();
            fechaLoading();
        }, 1000)
    })
}

function deletaXmlDaCaixa(btn) {
    let caixaXmls = obtemCaixaXmlsObjeto();
    let id = btn.target.parentElement.dataset.id;

    caixaXmls.splice(id - 1, 1);
    adicionaCaixaXmlsAoStorage(caixaXmls);

    mostraXmlsNaCaixa();
}

function adicionaEscutadorDescricaoCaixa() {
    const caixasXml = document.querySelectorAll('.caixaXmls_xml');

    caixasXml.forEach(caixaXml => {
        caixaXml.addEventListener('click', caixa => {
            if (caixa.target.parentElement.classList.contains('caixaXmls_xml_info_item')) {
                expandeCaixaXml(caixa.target.parentElement.parentElement.parentElement);
            }else if (caixa.target.classList.contains('caixaXmls_xml_info')){
                expandeCaixaXml(caixa.target.parentElement);
            } else if (caixa.target.classList.contains('caixaXmls_xml')) {
                expandeCaixaXml(caixa.target);
            } else if (caixa.target.classList.contains('caixaXmls_xml_label')) {
                expandeCaixaXml(caixa.target.parentElement);
            }
        })
    })
}

function expandeCaixaXml(caixa) {
    caixa.classList.toggle('caixaXmls_xml_aberto');
    caixa.children[5].classList.toggle('caixaXmls_xml_info_aberto');
}