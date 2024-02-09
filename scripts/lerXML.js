function parseXML(xml) {
    var result = {};

    function parseNode(node, obj) {
        
        if(node.nodeType === 3){
            let mensagemTISS = node.parentElement
            let proximoElemento = node.nextSibling == null?'':node.nextSibling.nodeName;

            if(mensagemTISS.nodeName == 'ans:mensagemTISS' && proximoElemento == 'ans:cabecalho'){
                const atributos = {
                    ans: node.parentElement.attributes[0].nodeValue,
                    xsi: node.parentElement.attributes[1].nodeValue,
                    schemaLocation: node.parentElement.attributes[2].nodeValue
                }
                adicionaMensagemTISSstorage(atributos);

                let caixaXmls = obtemCaixaXmlsObjeto();
                caixaXmls[caixaXmls.length - 1]['mensagemTISS'] = atributos;
                adicionaCaixaXmlsAoStorage(caixaXmls);
            }         
        }

        if (node.nodeType === 1) {
            var nodeName = node.nodeName;
            if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {

                
                obj[nodeName] = node.childNodes[0].nodeValue;
            } else if (node.childNodes.length > 1 || node.childNodes[0].nodeType !== 3) {
                if (nodeName === 'ans:guiasTISS') {
                    obj[nodeName] = [];
                    for (var i = 0; i < node.childNodes.length; i++) {
                        if (node.childNodes[i].nodeName === 'ans:guiaSP-SADT') {
                            var guia = {};
                            for (var j = 0; j < node.childNodes[i].childNodes.length; j++) {
                                if (node.childNodes[i].childNodes[j].nodeName === 'ans:procedimentosExecutados' || 
                                    node.childNodes[i].childNodes[j].nodeName === 'ans:outrasDespesas') {
                                    guia[node.childNodes[i].childNodes[j].nodeName] = [];
                                    for (var k = 0; k < node.childNodes[i].childNodes[j].childNodes.length; k++) {
                                        if (node.childNodes[i].childNodes[j].childNodes[k].nodeName === 'ans:procedimentoExecutado' || 
                                            node.childNodes[i].childNodes[j].childNodes[k].nodeName === 'ans:despesa') {
                                            var item = {};
                                            for (var l = 0; l < node.childNodes[i].childNodes[j].childNodes[k].childNodes.length; l++) {
                                                parseNode(node.childNodes[i].childNodes[j].childNodes[k].childNodes[l], item);
                                            }
                                            guia[node.childNodes[i].childNodes[j].nodeName].push(item);
                                        }
                                    }
                                } else {
                                    parseNode(node.childNodes[i].childNodes[j], guia);
                                }
                            }
                            obj[nodeName].push(guia);
                        }
                    }
                } else {
                    obj[nodeName] = {};
                    for (var i = 0; i < node.childNodes.length; i++) {
                        parseNode(node.childNodes[i], obj[nodeName]);
                    }
                }
            }
        }
    }

    parseNode(xml, result);
    return result;
}