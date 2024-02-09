function abreCaixaXML() {
    box.style.display = 'flex';
    boxOut.style.display = 'flex';
    
    setTimeout(() => {
        box.style.opacity = '1';
        boxOut.style.opacity = '1';
        caixaOpcoesAdicionais.style.display = 'flex'
    }, 1000)
}
function fechaCaixaXML() {
    box.style.display = 'none';
    boxOut.style.display = 'none';
    caixaOpcoesAdicionais.style.display = 'none'

    box.style.opacity = '0';
    boxOut.style.opacity = '0';
}

function abreLoading() {
    loading.classList.remove('close_load')
    loading.classList.add('open_load')
    loading.style.height = '100%';
}
function fechaLoading() {
    setTimeout(() => {
        loading.classList.remove('open_load')
        loading.classList.add('close_load')
    }, 500)
}

function abreInput() {
    caixaInputFile.style.display = 'block';
    setTimeout(() => {
        caixaInputFile.style.opacity = '1';
    }, 1000)
    inputFile.value = '';
}

function fechaInput() {
    caixaInputFile.style.opacity = '0';
    caixaInputFile.style.display = 'none';
}

function abrePopUpDeletaObj(){
    abreBloqueioTela();
    popUpConfirmaDeleteObj.style.top = '20px';
}
function fechaPopUpDeletaObj(){
    fechaBloqueioTela();
    popUpConfirmaDeleteObj.style.top = '-30%';
}

function abrePopUpXmlGerado(){
    abreBloqueioTela();
    popUpXmlGerado.style.top = '3%';
    popUpXmlGerado.style.left = '2%';
}
function fechaPopUpXmlGerado(){
    fechaBloqueioTela();
    popUpXmlGerado.style.top = '-120px';
    popUpXmlGerado.style.left = '-520px';
}

function abreBloqueioTela(){
    bloqueioDeTela.style.display = 'block';
}
function fechaBloqueioTela(){
    bloqueioDeTela.style.display = 'none';
}

function abreCaixaXmls(){
    campo_caixaXmls.style.display = 'flex';
}
function fechaCaixaXmls(){
    campo_caixaXmls.style.display = 'none';
}

function abrePopUpValidadorXML(){
    popUpValidadorXML.classList.add('pop-up_validadorXML__opened');
}
function fechaPopUpValidadorXML(){
    popUpValidadorXML.classList.remove('pop-up_validadorXML__opened');
}

function abreMenuSuperiorEsquerda(){
    menuSuperiorDireita.style.display = 'block';
}
function fechaMenuSuperiorEsquerda(){
    menuSuperiorDireita.style.display = 'none';
}