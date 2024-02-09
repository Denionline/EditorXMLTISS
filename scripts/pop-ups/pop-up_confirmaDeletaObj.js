const popUpConfirmaDeleteObj = document.querySelector('.pop-up_deletaObj');
const popUpConfirmaDeleteObj_opcao1 = document.querySelector('.pop-up_deletaObj_opcoes_1');
const popUpConfirmaDeleteObj_opcao2 = document.querySelector('.pop-up_deletaObj_opcoes_2');

popUpConfirmaDeleteObj_opcao1.addEventListener('click', () => {
    deletaObj();
    fechaPopUpDeletaObj();
})
popUpConfirmaDeleteObj_opcao2.addEventListener('click', () => {
    fechaPopUpDeletaObj();
})