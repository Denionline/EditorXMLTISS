const popUpXmlGerado = document.querySelector('.pop-up_xmlGerado');

function adicionaEscutadorBaixarXml() {
    const btnToXML = document.querySelector('.menuSuperiorDireita_opcoes_btnToXML');

    btnToXML.addEventListener('click', () => {
        abreBloqueioTela();
        atualizaDados();
        transformObjectToXML(obtemObjeto(), obtemNomeDoArquivoNoStorage());
        abrePopUpValidadorXML();
    })
}

function mudaGifDownload() {
    const gifDownload = document.querySelector('.menuSuperiorDireita_opcoes_btnToXML_gif');

    if (gifDownload.classList.contains('gif')) {
        gifDownload.src = 'imgs/download-anim1.png';
        gifDownload.classList.toggle('gif');
    } else {
        gifDownload.src = 'imgs/download-anim2.gif';
        gifDownload.classList.toggle('gif');
    }
}

const btnToDeleteObj = document.querySelector('.menuSuperiorDireita_opcoes_btnToDeleteObj');
btnToDeleteObj.addEventListener('click', () => {
    abrePopUpDeletaObj();
});
function mudaGifExcluir() {
    const gifDownload = document.querySelector('.menuSuperiorDireita_opcoes_btnToDeleteObj_gif');

    if (gifDownload.classList.contains('gif')) {
        gifDownload.src = 'imgs/lixeira-anim1.png';
        gifDownload.classList.toggle('gif');
    } else {
        gifDownload.src = 'imgs/lixeira-anim2.gif';
        gifDownload.classList.toggle('gif');
    }
}