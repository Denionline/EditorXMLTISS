const menuSuperiorDireita = document.querySelector('.menuSuperiorDireita');
const icon_menu = document.querySelector('.menuSuperiorDireita_icon-menu');

menuSuperiorDireita.addEventListener('click', () => {
    if(menuSuperiorDireita.classList.contains('menuSuperiorDireita__opened')){
        //Fecha Menu 
        menuSuperiorDireita.classList.remove('menuSuperiorDireita__opened');
        menuSuperiorDireita.classList.add('menuSuperiorDireita__closed');
        icon_menu.classList.toggle('menuSuperiorDireita_icon-menu__opened');
    }else{
        //Abre Menu
        menuSuperiorDireita.classList.remove('menuSuperiorDireita__closed');
        menuSuperiorDireita.classList.add('menuSuperiorDireita__opened');

        icon_menu.classList.toggle('menuSuperiorDireita_icon-menu__opened');
    }
})