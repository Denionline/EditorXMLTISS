// function adicionaEscutadorBaixarXml(){
//     const btnBaixarXml = document.querySelector('.menuSuperiorDireita_opcoes_btnToXML_gif');

//     btnBaixarXml.addEventListener('click', () => {
//         const objetoXML = obtemObjeto();
//         const nomeDoArquivo = obtemNomeDoArquivoNoStorage();
//         transformObjectToXML(objetoXML, nomeDoArquivo);
//     })
// }

function transformObjectToXML(objetoXML, nomeDoArquivo){
    objetoXML['ans:mensagemTISS']['ans:epilogo']['ans:hash'] = '--novo_hash--';

    let xmlFormatado = jsonToXml(objetoXML);
    // let hash = calculateHash(objetoEmXML);
    // let objetoEmXML_newHash = objetoEmXML.replace('<ans:hash>--novo_hash--</ans:hash>', `<ans:hash>${hash}</ans:hash>`);
    let objetoEmXML = xmlFormatado.replace('<?xml version="1.0" encoding="UTF-8"?>', '<?xml version="1.0" encoding="ISO-8859-1"?>')
    let blob = new Blob([objetoEmXML], { type: 'application/xml' });

    //Faz o download do Arquivo.
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${nomeDoArquivo}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function jsonToXml(json) {
    let mensagemTISS = obtemMensagemTISSstorage();
    var xml = '<?xml version="1.0" encoding="UTF-8"?>';

    function convertNode(obj, parentKey) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key === 'ans:guiasTISS' && Array.isArray(obj[key])) {
                    xml += '<ans:guiasTISS>';
                    for (var i = 0; i < obj[key].length; i++) {
                        xml += '<ans:guiaSP-SADT>';
                        convertNode(obj[key][i], 'ans:guiaSP-SADT');
                        xml += '</ans:guiaSP-SADT>';
                    }
                    xml += '</ans:guiasTISS>';
                } else if (key === 'ans:outrasDespesas' && Array.isArray(obj[key])) {
                    xml += '<ans:outrasDespesas>';
                    for (var j = 0; j < obj[key].length; j++) {
                        xml += '<ans:despesa>';
                        convertNode(obj[key][j], 'ans:despesa');
                        xml += '</ans:despesa>';
                    }
                    xml += '</ans:outrasDespesas>';
                } else if (key === 'ans:procedimentosExecutados' && Array.isArray(obj[key])) {
                    xml += '<ans:procedimentosExecutados>';
                    for (var j = 0; j < obj[key].length; j++) {
                        xml += '<ans:procedimentoExecutado>';
                        convertNode(obj[key][j], 'ans:procedimentoExecutado');
                        xml += '</ans:procedimentoExecutado>';
                    }
                    xml += '</ans:procedimentosExecutados>';
                } else {

                    if(key === 'ans:mensagemTISS'){
                        xml += '<' + key + ` xmlns:ans="${mensagemTISS.ans}" xmlns:xsi="${mensagemTISS.xsi}" xsi:schemaLocation="${mensagemTISS.schemaLocation}">`;
                    }else{
                        xml += '<' + key + '>';
                    }

                    if (typeof obj[key] === 'object') {
                        convertNode(obj[key], key);
                    } else {
                        xml += obj[key];
                    }

                    xml += '</' + key + '>';
                }
            }
        }
    }

    convertNode(json);
    return xml;
}
