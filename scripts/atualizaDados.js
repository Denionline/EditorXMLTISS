const campoGuiasXML = document.querySelector('.box_body');
const cabecalhoDoXML = {
    campoCodigoDoPrestador: document.querySelector('.box_top_item_valor'),
    campoNumeroDoProtocolo: document.querySelector('.box_top_numeroDoProtocolo_valor'),
    campoRegistroANS: document.querySelector('.box_top_ans_valor'),
    campoVersaoXML: document.querySelector('.box_top_versao_valor'),
    campoValorXML: document.querySelector('.box_top_valor_valor')
};

function atualizaDados() {
    let objetoDoXML = obtemObjeto();

    fechaInput();
    fechaCaixaXmls();

    const objetoDefinicoes = obtemDefinicoesDaPagNoStorage();

    let guiaNaPag = objetoDefinicoes ? objetoDefinicoes : {
        abaOpenOrClosed: []
    }

    campoGuiasXML.innerHTML = '';
    campoQtdeGuiasSelecionadas.innerHTML = 0;

    const cabecalhoXML = objetoDoXML['ans:mensagemTISS']['ans:cabecalho'];

    const numeroDoProtocolo = objetoDoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:numeroLote'];
    campoNomeDoArquivo.value = obtemNomeDoArquivoNoStorage();
    const codigoDoPrestador = cabecalhoXML['ans:origem']['ans:identificacaoPrestador']['ans:codigoPrestadorNaOperadora'];
    const versaoXML = cabecalhoXML['ans:Padrao'] ? cabecalhoXML['ans:Padrao'] : cabecalhoXML['ans:versaoPadrao'];
    const registroANS = cabecalhoXML['ans:destino']['ans:registroANS'];

    cabecalhoDoXML.campoCodigoDoPrestador.value = codigoDoPrestador;
    cabecalhoDoXML.campoVersaoXML.innerText = versaoXML;
    cabecalhoDoXML.campoRegistroANS.value = registroANS;
    cabecalhoDoXML.campoNumeroDoProtocolo.value = numeroDoProtocolo;

    const guiasXML = objetoDoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'];

    for (g = 0; g < guiasXML.length; g++) {
        let guia = guiasXML[g];

        let abaProcedimentos = 'seta-up';
        let abaDespesas = 'seta-up';

        if (objetoDefinicoes) {
            abaProcedimentos = objetoDefinicoes.abaOpenOrClosed[g].abaP;
            abaDespesas = objetoDefinicoes.abaOpenOrClosed[g].abaD;
        } else {
            let itensDaGuiaNaPag = {
                abaP: 'seta-up',
                abaD: 'seta-up'
            }
            guiaNaPag.abaOpenOrClosed.push(itensDaGuiaNaPag);
            abaProcedimentos = guiaNaPag.abaOpenOrClosed[g].abaP;
            abaDespesas = guiaNaPag.abaOpenOrClosed[g].abaD;
        }

        let arrayProcedimentos = guia['ans:procedimentosExecutados'] ? guia['ans:procedimentosExecutados'] : "";
        let arrayDespesas = guia['ans:outrasDespesas'] ? guia['ans:outrasDespesas'] : "";

        arrayProcedimentos.length > 0 ? guia['ans:procedimentosExecutados'] : delete guia['ans:procedimentosExecutados'];
        arrayDespesas.length > 0 ? guia['ans:outrasDespesas'] : delete guia['ans:outrasDespesas'];

        adicionaAoStorage(objetoDoXML);

        let procedimentos = guia['ans:procedimentosExecutados'] ? guia['ans:procedimentosExecutados'] : "";
        let despesas = guia['ans:outrasDespesas'] ? guia['ans:outrasDespesas'] : "";

        let numeroGuiaOperadora = guia['ans:dadosAutorizacao']['ans:numeroGuiaOperadora'];

        campoGuiasXML.innerHTML += guiaHTML(guia, numeroGuiaOperadora, g + 1, abaProcedimentos, abaDespesas);

        if (procedimentos) {
            let campoProcedimentos = document.querySelector(`.box_body_guia_detalhes_procedimentos-${numeroGuiaOperadora}`);
            // Adiciona o cabeçalho dos Procedimentos
            campoProcedimentos.innerHTML += `
                <div class="box_body_guia_detalhes_cabecalho_procs_proc">
                    <div class="box_body_guia_detalhes_cabecalho_procs_proc_tabela">Tabela</div>
                    <div class="box_body_guia_detalhes_cabecalho_procs_proc_nome">Descrição</div>
                    <div class="box_body_guia_detalhes_cabecalho_procs_proc_codigo">Código</div>
                    <div class="box_body_guia_detalhes_cabecalho_procs_proc_data">Data</div>
                    <div class="box_body_guia_detalhes_cabecalho_procs_proc_valor">Valor</div>
                </div>
            `
            for (p = 0; p < procedimentos.length; p++) {
                // Adiciona os Procedimentos
                campoProcedimentos.innerHTML += procedimentoHTML(procedimentos[p], p + 1, numeroGuiaOperadora);
            }
            campoProcedimentos.innerHTML += `
                <div class="box_body_guia_detalhes_adicionar">
                    <img class="box_body_guia_detalhes_adicionar-img icon-add-item" src="imgs/adicionar_item.png" alt="Ícone para adicionar item.">
                </div>
            `
        } else {
            // document.querySelector(`.box_body_guia_detalhes_procs-${numeroGuiaOperadora}`).style.display = 'none';
            document.querySelector(`.box_body_guia_detalhes_procs-${numeroGuiaOperadora}`).classList.add('box_body_guia_detalhes__vazio');
        }

        if (despesas) {
            let campoDespesas = document.querySelector(`.box_body_guia_detalhes_outrasDespesas-${numeroGuiaOperadora}`);
            // Adiciona o cabeçalho das Despesas
            campoDespesas.innerHTML += `
                <div class="box_body_guia_detalhes_outras_cabecalho_despesa">
                <div class="box_body_guia_detalhes_outras_cabecalho_despesa_tabela">Tabela</div>
                    <div class="box_body_guia_detalhes_outras_cabecalho_despesa_nome">Descrição</div>
                    <div class="box_body_guia_detalhes_outras_cabecalho_despesa_codigo">Código</div>
                    <div class="box_body_guia_detalhes_outras_cabecalho_despesa_data">Data</div>
                    <div class="box_body_guia_detalhes_outras_cabecalho_despesa_unidade">UN</div>
                    <div class="box_body_guia_detalhes_outras_cabecalho_despesa_qtde">Qtde</div>
                    <div class="box_body_guia_detalhes_outras_cabecalho_despesa_valorU">Valor Unitário</div>
                    <div class="box_body_guia_detalhes_outras_cabecalho_despesa_valor">Valor Total</div>
                </div>
                `
            for (d = 0; d < despesas.length; d++) {
                // Adiciona as Despesas
                campoDespesas.innerHTML += despesaHTML(despesas[d], d + 1, numeroGuiaOperadora);
            }
            campoDespesas.innerHTML += `
            <div class="box_body_guia_detalhes_adicionar">
                <img class="box_body_guia_detalhes_adicionar-img icon-add-item" src="imgs/adicionar_item.png" alt="Ícone para adicionar item.">
            </div>
        `
        } else {
            //     document.querySelector(`.box_body_guia_detalhes_outras-${numeroGuiaOperadora}`).style.display = 'none';
            document.querySelector(`.box_body_guia_detalhes_outras-${numeroGuiaOperadora}`).classList.add('box_body_guia_detalhes__vazio');
        }
    }
    abreMenuSuperiorEsquerda();

    adicionaDefinicoesDaPagNoStorage(guiaNaPag);

    atualizaValores();
    atualizaSequencial();

    acaoTodasAsGuias();

    adicionaEscutadorPencil();
    adicionaEscutadorInput();
    adicionaEscutadorBaixarXml();
    adicionaEscutadorLixeira();
    adicionaEscutadorAbas();
    adicionaEscutadorTema();
    adicionaEscutadorSelecionaGuia();
    adicionaEscutadorVoltar();
    adicionaEscutadorInsereItem();

    fechaLoading();
    abreCaixaXML();
}
