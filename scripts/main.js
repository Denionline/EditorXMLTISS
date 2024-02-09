const caixaInputFile = document.querySelector('.caixaInputXML');
const box = document.querySelector('.box');
const loading = document.querySelector('#loading');
const inputFile = document.querySelector('#fileXML');
const boxOut = document.querySelector('.caixaBtn');
const campoNomeDoArquivo = document.querySelector('#nomeDoArquivo');
const bloqueioDeTela = document.querySelector('.bloqueio_pop-up');
const caixaOpcoesAdicionais = document.querySelector('.opcoesAdicionais');
const campoQtdeGuiasSelecionadas = document.querySelector('.box_info_qtdeDeGuiasSelecionadas_valor');


// Abertura da Página
if (obtemCaixaXmlsObjeto()) {
    if (obtemCookie('temaDaPag')) {
        let objetoDoCookie = JSON.parse(obtemCookie('temaDaPag'));
        alteraCor(objetoDoCookie.tema);
    }

    if (obtemObjeto()) {
        abreCaixaXML();
        atualizaDados();
    } else {
        abreCaixaXmls();
        mostraXmlsNaCaixa();
    }
    
    fechaLoading();
} else {
    fechaLoading();
    abreInput();
}

// Carregamento do arquivo XML
inputFile.addEventListener('change', (event) => {
    abreLoading();
    fechaInput();

    if (obtemCookie('temaDaPag')) {
        let objetoDoCookie = JSON.parse(obtemCookie('temaDaPag'));
        alteraCor(objetoDoCookie.tema);
    }

    setTimeout(() => {
        const fileXML = event.target.files[0];
        let arquivoXML;
        if (fileXML) {
            const reader = new FileReader();

            reader.onload = (event) => {
                arquivoXML = event.target.result;

                const decoder = new TextDecoder('ISO-8859-1');
                const arquivoUTF8 = decoder.decode(new Uint8Array(arquivoXML));

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(arquivoUTF8, "text/xml");

                if (obtemCaixaXmlsObjeto()) {
                    let caixa = obtemCaixaXmlsObjeto();
                    caixa.push({ 'ID': caixa.length + 1 });
                    adicionaCaixaXmlsAoStorage(caixa);
                } else {
                    let caixa = [{ 'ID': 1 }];
                    adicionaCaixaXmlsAoStorage(caixa);
                }

                const jsonData = parseXML(xmlDoc.documentElement);
                adicionaAoStorage(jsonData);

                let caixaXmls = obtemCaixaXmlsObjeto();
                caixaXmls[caixaXmls.length - 1]['objetoXML'] = jsonData;
                let nomeDoArquivo = jsonData['ans:mensagemTISS']['ans:prestadorParaOperadora']['ans:loteGuias']['ans:numeroLote'];
                caixaXmls[caixaXmls.length - 1]['nomeDoArquivo'] = nomeDoArquivo;
                adicionaNomeDoArquivoNoStorage(nomeDoArquivo);
                adicionaIdNoStorage(caixaXmls.length);
                adicionaCaixaXmlsAoStorage(caixaXmls);

                atualizaDados();
            };
            reader.readAsArrayBuffer(fileXML, 'UTF-8');
        }
    }, 1000);
});