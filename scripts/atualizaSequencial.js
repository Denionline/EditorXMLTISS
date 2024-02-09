function atualizaSequencial(){
    const objetoDoXML = obtemObjeto();
    const guiasXML = objetoDoXML['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:guiasTISS'];

    for (g = 0; g < guiasXML.length; g++) {
        let guia = guiasXML[g];

        let procedimentos = guia['ans:procedimentosExecutados'] ? guia['ans:procedimentosExecutados'] : "";
        let despesas = guia['ans:outrasDespesas'] ? guia['ans:outrasDespesas'] : "";

        if (procedimentos) {
            for (p = 0; p < procedimentos.length; p++) {
                if(procedimentos[p]['ans:sequencialItem']){
                    procedimentos[p]['ans:sequencialItem'] = p+1;
                }
            }
        }
        if (despesas) {
            for (d = 0; d < despesas.length; d++) {
                if(despesas[d]['ans:sequencialItem']){
                    despesas[d]['ans:sequencialItem'] = d+1;
                }
            }
        }
    }
    adicionaAoStorage(objetoDoXML);
    let caixa = obtemCaixaXmlsObjeto();
    caixa[obtemIdNoStorage()-1]['objetoXML'] = objetoDoXML;
    adicionaCaixaXmlsAoStorage(caixa);
}