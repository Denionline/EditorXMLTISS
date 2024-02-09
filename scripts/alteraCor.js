function adicionaEscutadorTema() {
    const btnsTemas = document.querySelectorAll('.icon-tema');

    btnsTemas.forEach(btnTema => {
        btnTema.addEventListener('click', btn => {
            let cor = btn.target.dataset.cor;
            let meuObjeto = {
                tema: cor
            };
            adicionaCookie('temaDaPag', JSON.stringify(meuObjeto), 365);
            alteraCor(cor);
        })
    })
}

function alteraCor(cor) {
    const css = document.documentElement.style;
    
    if (cor == 'claro') {// Tema claro
        css.setProperty('--cor-de-fundo-body', '#2C3532');
        css.setProperty('--cor-de-fundo-box', '#D2E8E3');
        css.setProperty('--cor-de-fundo-guia', '#0F6466');
        css.setProperty('--cor-de-fundo-procs', '#D8B08C');
        css.setProperty('--cor-de-fundo-outras', '#FFCB9A');

        css.setProperty('--cor-de-fundo-tema', 'rgb(0, 0, 0)');
        css.setProperty('--cor-de-texto-tema-caixa', 'rgb(255, 255, 255)');
        css.setProperty('--cor-de-texto-tema', 'rgb(255, 255, 255)');

        document.querySelector('[data-cor="claro"]').src = 'imgs/sol-escuro.png';
        document.querySelector('[data-cor="escuro"]').src = 'imgs/lua-escuro.png';
    }
    else {// Tema Escuro
        css.setProperty('--cor-de-fundo-body', '#0D0D0D');
        css.setProperty('--cor-de-fundo-box', '#b1b1b1');
        css.setProperty('--cor-de-fundo-guia', '#0D0D0D');
        css.setProperty('--cor-de-fundo-procs', '#595959');
        css.setProperty('--cor-de-fundo-outras', '#A6A6A6');
        
        css.setProperty('--cor-de-fundo-tema', 'rgb(255, 255, 255)');
        css.setProperty('--cor-de-texto-tema-caixa', 'rgb(0, 0, 0)');
        css.setProperty('--cor-de-texto-tema', 'rgb(0, 0, 0)');
        
        document.querySelector('[data-cor="claro"]').src = 'imgs/sol-claro.png';
        document.querySelector('[data-cor="escuro"]').src = 'imgs/lua-claro.png';
    }
}
