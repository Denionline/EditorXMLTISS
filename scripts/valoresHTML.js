function guiaHTML(guia, numeroGuiaOperadora, id, abaP, abaD) {
    let numeroGuiaPrestador = guia['ans:cabecalhoGuia']['ans:numeroGuiaPrestador'];
    let numeroCarteirinha = guia['ans:dadosBeneficiario']['ans:numeroCarteira'];
    let senha = guia['ans:dadosAutorizacao']['ans:senha'] == undefined ? "" : guia['ans:dadosAutorizacao']['ans:senha'];
    let data = formatData(guia['ans:dadosAutorizacao']['ans:dataAutorizacao']);
    let dataValidadeSenha =  formatData(guia['ans:dadosAutorizacao']['ans:dataValidadeSenha']);

    return `
        <div class="box_body_guia box_body_guia-${numeroGuiaOperadora}" id="${id}">
            <label class="box_body_guia_check">
                <input class="box_body_guia_check-input" type="checkbox">
                <span class="box_body_guia_check-span"></span>
            </label>
            <h2 class="box_body_guia_titulo">Guia ${id}</h2>
            <div class="box_body_guia_resumo">

                <div class="box_body_guia_resumo_numeroCarteira">
                    <span class="box_body_guia_resumo_descricao box_body_guia_resumo_numeroCarteira_descricao">Carteirinha:</span>
                    <input class="box_body_guia_resumo_valor box_body_guia_resumo_numeroCarteira_valor-${numeroGuiaOperadora}" data-campo="numeroCarteirinha" value="${numeroCarteirinha}" disabled>
                    <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
                </div>

                <div class="box_body_guia_resumo_guiaPrestador">
                    <span class="box_body_guia_resumo_descricao box_body_guia_resumo_guiaPrestador_descricao">Guia do prestador:</span>
                    <input class="box_body_guia_resumo_valor box_body_guia_resumo_guiaPrestador_valor" data-campo="numeroGuiaPrestador" value="${numeroGuiaPrestador}" disabled>
                    <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
                </div>

                <div class="box_body_guia_resumo_guiaOperadora">
                    <span class="box_body_guia_resumo_descricao box_body_guia_resumo_guiaOperadora_descricao">Guia da operadora:</span>
                    <input class="box_body_guia_resumo_valor box_body_guia_resumo_guiaOperadora_valor" data-campo="numeroGuiaOperadora" value="${numeroGuiaOperadora}" disabled>
                    <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
                </div>

                <div class="box_body_guia_resumo_senha">
                    <span class="box_body_guia_resumo_descricao box_body_guia_resumo_senha_descricao">Senha:</span>
                    <input class="box_body_guia_resumo_valor box_body_guia_resumo_senha_valor" data-campo="senha" value="${senha}" disabled>
                    <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
                </div>
                
                <div class="box_body_guia_resumo_data">
                    <span class="box_body_guia_resumo_descricao box_body_guia_resumo_data_descricao">Data da autorização:</span>
                    <input class="box_body_guia_resumo_valor box_body_guia_resumo_data_valor" data-campo="dataDaGuia" value="${data}" disabled>
                    <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
                </div>

                <div class="box_body_guia_resumo_dataValidadeSenha">
                    <span class="box_body_guia_resumo_descricao box_body_guia_resumo_dataValidadeSenha_descricao">Data da validade da senha:</span>
                    <input class="box_body_guia_resumo_valor box_body_guia_resumo_dataValidadeSenha_valor" data-campo="dataValidadeSenha" value="${dataValidadeSenha}" disabled>
                    <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
                </div>

            </div>
            <div class="box_body_guia_detalhes">

                <div class="box_body_guia_detalhes_procs box_body_guia_detalhes_procs-${numeroGuiaOperadora}">
                    <div class="box_body_guia_detalhes_cabecalho_procs_titulo box_body_guia_detalhes_itens">Procedimentos <img src="imgs/seta.png" class="seta-aba ${abaP}" alt="Seta para abrir/ocultar aba"></div>
                    <div class="box_body_guia_detalhes_procedimentos box_body_guia_detalhes_procedimentos-${numeroGuiaOperadora} ${abaP == 'seta-up'? 'abaOculta' : ''}">
                        <!-- Procedimentos -->
                    </div>
                </div>

                <div class="box_body_guia_detalhes_outras box_body_guia_detalhes_outras-${numeroGuiaOperadora}">
                    <div class="box_body_guia_detalhes_outras_titulo box_body_guia_detalhes_itens">Materiais e Medicamentos <img src="imgs/seta.png" class="seta-aba ${abaD}" alt="Seta para abrir/ocultar aba"></div>
                    <div class="box_body_guia_detalhes_outrasDespesas box_body_guia_detalhes_outrasDespesas-${numeroGuiaOperadora} ${abaD == 'seta-up'? 'abaOculta' : ''}">
                        <!-- Materiais e Medicamentos -->
                    </div>               
                </div>

            </div>
            <div class="box_body_guia_totais box_body_guia_totais-${numeroGuiaOperadora}">
                <div class="box_body_guia_totais_procedimentos">
                    <div class="box_body_guia_totais_item_descricao box_body_guia_totais_procedimentos_descricao">Total procedimentos</div>
                    <div class="box_body_guia_totais_item_valor box_body_guia_totais_procedimentos_valor"></div>
                </div>
                <div class="box_body_guia_totais_materiais">
                    <div class="box_body_guia_totais_item_descricao box_body_guia_totais_materiais_descricao">Total materiais</div>
                    <div class="box_body_guia_totais_item_valor box_body_guia_totais_materiais_valor"></div>            
                </div>
                <div class="box_body_guia_totais_medicamentos">
                    <div class="box_body_guia_totais_item_descricao box_body_guia_totais_medicamentos_descricao">Total medicamentos</div>
                    <div class="box_body_guia_totais_item_valor box_body_guia_totais_medicamentos_valor"></div>            
                </div>
                <div class="box_body_guia_totais_geral">
                    <div class="box_body_guia_totais_item_descricao box_body_guia_totais_geral_descricao">Total geral</div>
                    <div class="box_body_guia_totais_item_valor box_body_guia_totais_geral_valor"></div>
                </div>
            </div>

            <img src="imgs/lixeira.png" class="icon-lixeira" alt="Ícone de lixeira" title="Excluir">
        </div>
    `
}

function procedimentoHTML(procedimento, id, numeroGuiaOperadora) {
    let codigoDaTabela = procedimento['ans:procedimento']['ans:codigoTabela'];
    let descricaoProcedimento = procedimento['ans:procedimento']['ans:descricaoProcedimento'];
    let codigoDoProcedimento = procedimento['ans:procedimento']['ans:codigoProcedimento'];
    let dataDoProcedimento = formatData(procedimento['ans:dataExecucao']);
    let valorTotalDoProcedimento = formatValue(procedimento['ans:valorTotal']);
    formatReducao(procedimento['ans:reducaoAcrescimo'], procedimento['ans:valorTotal'], id)

    return `
        <div class="box_body_guia_detalhes_procs_proc box_body_guia_detalhes_procs_proc-${numeroGuiaOperadora}" id="${id}">

            <!-- Código da Tabela -->
            <div class="box_body_guia_detalhes_procs_proc-itens box_body_guia_detalhes_procs_proc_tabela">
                <input class="box_body_guia_detalhes_procs_proc_item" data-campo="codigoDaTabela" value="${codigoDaTabela}" disabled>
                <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
            </div>

            <!-- Descrição do Procedimento -->
            <div class="box_body_guia_detalhes_procs_proc-itens box_body_guia_detalhes_procs_proc_nome">
                <input class="box_body_guia_detalhes_procs_proc_item" data-campo="descricaoProcedimento" value="${descricaoProcedimento}" disabled>
                <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
            </div>

            <!-- Código do Procedimento -->
            <div class="box_body_guia_detalhes_procs_proc-itens box_body_guia_detalhes_procs_proc_codigo">
                <input class="box_body_guia_detalhes_procs_proc_item" data-campo="codigoDoProcedimento" value="${codigoDoProcedimento}" disabled>
                <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
            </div>
            
            <!-- Data do Procedimento -->
            <div class="box_body_guia_detalhes_procs_proc-itens box_body_guia_detalhes_procs_proc_data">
                <input class="box_body_guia_detalhes_procs_proc_item" data-campo="dataDoProcedimento" value="${dataDoProcedimento}" disabled>
                <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
            </div>

            <!-- Valor total do Procedimento -->
            <div class="box_body_guia_detalhes_procs_proc-itens box_body_guia_detalhes_procs_proc_valor">
                <input class="box_body_guia_detalhes_procs_proc_item" data-campo="valorTotalDoProcedimento" value="${valorTotalDoProcedimento}" disabled>
                <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
            </div>

            <img src="imgs/lixeira.png" class="icon-lixeira" alt="Ícone de lixeira" title="Excluir">
        </div>
    `
}

function despesaHTML(despesa, id, numeroGuiaOperadora) {
    let tabelaDaDespesa = despesa['ans:servicosExecutados']['ans:codigoTabela'];
    let descricaoDaDespesa = despesa['ans:servicosExecutados']['ans:descricaoProcedimento'];
    let codigoDaDespesa = despesa['ans:servicosExecutados']['ans:codigoProcedimento'];
    let dataDaDespesa = formatData(despesa['ans:servicosExecutados']['ans:dataExecucao']);
    let unidadeDaDespesa = despesa['ans:servicosExecutados']['ans:unidadeMedida'];
    let qtdeDaDespesa = despesa['ans:servicosExecutados']['ans:quantidadeExecutada'];
    let valorUnDaDespesa = formatValue(despesa['ans:servicosExecutados']['ans:valorUnitario']);
    let valorDaDespesa = formatValue(despesa['ans:servicosExecutados']['ans:valorTotal']);

    return `
        <div class="box_body_guia_detalhes_outras_despesa box_body_guia_detalhes_outras_despesa-${numeroGuiaOperadora}" id="${id}">

            <!-- Tabela da Despesa -->
            <div class="box_body_guia_detalhes_outras_despesa_itens">
                <input class="box_body_guia_detalhes_outras_despesa_item box_body_guia_detalhes_outras_despesa_tabela" data-campo="tabelaDaDespesa" value="${tabelaDaDespesa}" disabled>
                <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
            </div>

            <!-- Descrição da Despesa -->
            <div class="box_body_guia_detalhes_outras_despesa_itens">
                <input type="text" class="box_body_guia_detalhes_outras_despesa_item box_body_guia_detalhes_outras_despesa_nome" data-campo="descricaoDaDespesa" value="${descricaoDaDespesa}" disabled>
                <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
            </div>

            <!-- Código da Despesa -->
            <div class="box_body_guia_detalhes_outras_despesa_itens">
                <input class="box_body_guia_detalhes_outras_despesa_item box_body_guia_detalhes_outras_despesa_codigo" data-campo="codigoDaDespesa" value="${codigoDaDespesa}" disabled>
                <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
            </div>

            <!-- Data da Despesa -->
            <div class="box_body_guia_detalhes_outras_despesa_itens">
                <input class="box_body_guia_detalhes_outras_despesa_item box_body_guia_detalhes_outras_despesa_data" data-campo="dataDaDespesa" value="${dataDaDespesa}" disabled>
                <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
            </div>
            
            <!-- Unidade da Despesa -->
            <div class="box_body_guia_detalhes_outras_despesa_itens">
                <input class="box_body_guia_detalhes_outras_despesa_item box_body_guia_detalhes_outras_despesa_unidade"  data-campo="unidadeDaDespesa" value="${unidadeDaDespesa}" disabled>
                <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
            </div>
            
            <!-- Quantidade da Despesa -->
            <div class="box_body_guia_detalhes_outras_despesa_itens">
                <input class="box_body_guia_detalhes_outras_despesa_item box_body_guia_detalhes_outras_despesa_qtde" data-campo="qtdeDaDespesa" value="${parseInt(qtdeDaDespesa)}" disabled>
                <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
            </div>

            <!-- Valor unitário da Despesa -->
            <div class="box_body_guia_detalhes_outras_despesa_itens">
                <input class="box_body_guia_detalhes_outras_despesa_item box_body_guia_detalhes_outras_despesa_valorU" data-campo="valorUnDaDespesa" value="${valorUnDaDespesa}" disabled>
                <img src="imgs/pencil.png" class="icon-pencil" data-id="${id}" alt="Ícone para alterar" title="Editar">
            </div>

            <!-- Valor total da Despesa -->
            <div class="box_body_guia_detalhes_outras_despesa_itens">
                <input class="box_body_guia_detalhes_outras_despesa_item box_body_guia_detalhes_outras_despesa_valor" data-campo="valorDaDespesa" value="${valorDaDespesa}" disabled>
            </div>
            
            <img src="imgs/lixeira.png" class="icon-lixeira" alt="Ícone de lixeira" title="Excluir">
        </div>
    `
}