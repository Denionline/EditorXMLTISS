function formatData(data) {
    const date = new Date(data);
    const dataObj = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    const dataFormatada = dataObj.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    return dataFormatada;
}
function formatDataParaXML(data) {
    const dataBrasileira = data;
    const partes = dataBrasileira.split('/');
    const dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
    return dataFormatada;
}

function formatValue(valor) {
    const valorFormatado = parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return valorFormatado;
}
function formatValueParaXML(valor) {
    const valorMoedaBrasileira = valor;
    const valorNumerico = parseFloat(valorMoedaBrasileira.replace('R$', '').replace(',', '.'));
    return valorNumerico;
}

function formatDecimalQtde(numero) {
    const numeroFormatado = parseInt(numero).toFixed(4);
    return numeroFormatado;
}

function formatReducao(porcentagem, valor, id) {
    let reducao = 100 - (porcentagem * 100)

    let valorDoProcedimentoOriginal = (parseFloat(valor) + (parseFloat(valor) * (parseFloat(reducao) / 100)));


    let valorFinal = valorDoProcedimentoOriginal
    // console.log(id + ' - ' + valorFinal);
}
