import {
    getData
} from './getData.js';
import generateSubcatalog from './generateSubcatalog.js';

export const useCatalog = () => {
    const updateSubCatalog = generateSubcatalog();
    const btnBurger = document.querySelector('.btn-burger');
    const catalog = document.querySelector('.catalog');
    const closeButton = document.querySelector('.btn-close');
    const subCatalog = document.querySelector('.subcatalog');
    const subCatalogHeader = document.querySelector('.subcatalog-header');
    const subCatalogCloseBtn = document.querySelector('.btn-return');

    //create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.append(overlay);

    //открыть основное меню
    const openMenu = () => {
        catalog.classList.add('open');
        overlay.classList.add('active');
    };

    //закрыть оснвоное меню
    const closeMenu = () => {
        closeSubMenu();
        catalog.classList.remove('open');
        overlay.classList.remove('active');
    };

    //открыть подменю при клике на ссылку в основном меню
    const openSubMenu = e => {
        e.preventDefault();
        const target = e.target;
        const itemList = target.closest('.catalog-list__item');
        if (itemList) {
            getData.subCatalog(target.textContent, (data) => {
                updateSubCatalog(target.textContent, data);
                subCatalog.classList.add('subopen');
            });

        }
    };

    //закрыть подменю
    const closeSubMenu = () => {
        subCatalog.classList.remove('subopen');
    };

    //события
    btnBurger.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    catalog.addEventListener('click', openSubMenu);
    subCatalogCloseBtn.addEventListener('click', closeSubMenu);
    document.addEventListener('keydown', e => {
        if (e.code === 'Escape') {
            closeMenu();
        }
    });
};