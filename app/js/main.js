const menuButton = document.querySelector('.menu-button');
const menuList = document.querySelector('.menu__list');

menuButton.addEventListener('click', () => {
    
    // if(!menuList){
    //     console.error('Menu not found', ".menu__list")
    // } else {
      menuList.classList.toggle('menu__list--open');
      //menuButton.classList.toggle('menu-button--close');
    //}
}) 

$(function(){

    $('.book-slider, .slider__item').slick({
        arrows: false,
        dots: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000,
        
    });


});