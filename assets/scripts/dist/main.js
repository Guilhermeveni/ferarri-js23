"use strict";
const title = "Bem vindo ao curso de JavaScript + TypeScript";
window.onload = (e) => {
    document.title = title;
};
const body = document.querySelector("body");
const btnOpen = document.getElementById("btn-open");
//const btnOpen = document.querySelector("#btn-open");
const closeMenu = document.querySelectorAll('[data-close="menu"]');
if (body) {
    if (btnOpen) {
        btnOpen.addEventListener("click", (e) => {
            e.preventDefault(); //Pare o comportamento padrão do botão
            e.stopPropagation(); //Parado, quietinho....
            body.classList.add("open-menu");
        });
    }
    if (closeMenu) {
        closeMenu.forEach((el) => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                body.classList.remove("open-menu");
            });
        });
    }
}
