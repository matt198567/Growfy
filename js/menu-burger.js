'use strict';

// меню бургер

const activeMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
if (activeMenu) {
  activeMenu.addEventListener('click', function (e) {
    document.body.classList.toggle('_lock');
    document.documentElement.classList.toggle('menu-open');
    activeMenu.classList.toggle('menu-open');
    menuBody.classList.toggle('menu-open');
  });
}

// document.addEventListener('click', documentClick);

// function documentClick(e) {
//   const targetItem = e.target;
//   if (targetItem.closest('.icon-menu')) {
//     document.documentElement.classList.toggle('menu-open');
//     document.body.classList.toggle('_lock');
//   }
// }

// перемена цвета для меню бургер

window.addEventListener('load', windowLoad);

function windowLoad() {
  document.documentElement.classList.add('loaded');
  const menu = document.querySelector('.menu__list');
  let menuActiveElement;

  if (menu) {
    menuActiveElement = document.querySelector('.menu__active span');

    const menuActiveItem = menu.querySelector('.menu__item._active');
    menuActiveItem ? menuSetActive(menuActiveItem) : null;
    menu.addEventListener('click', menuActions);
  }

  function menuActions(e) {
    const menuItem = e.target;
    if (menuItem.closest('.menu__item')) {
      const menuParentItem = menuItem.closest('.menu__item');
      const menuActiveItem = menu.querySelector('.menu__item._active');

      if (!menuParentItem.classList.contains('_active')) {
        menuActiveItem ? menuActiveItem.classList.remove('_active') : null;
      }
      menuSetActive(menuParentItem);
      e.preventDefault();
    }
  }

  function menuSetActive(menuParentItem) {
    menuParentItem.classList.add('_active');
    menuActiveElement.style.cssText = `
        height:${menuParentItem.offsetHeight}px;
        top:${menuParentItem.offsetTop}px;
        background-color:${menuParentItem.dataset.activeColor}`;
  }
}

// Прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector('header').offsetHeight;

      if (activeMenu.classList.contains('menu-open')) {
        document.body.classList.remove('_lock');
        document.documentElement.classList.remove('menu-open');
        activeMenu.classList.remove('menu-open');
        menuBody.classList.remove('menu-open');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      });
      e.preventDefault();
    }
  }
}
