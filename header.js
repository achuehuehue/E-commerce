const cart_buttons = document.querySelectorAll('.cart-js');
const shopping_cart = document.querySelectorAll('.shopping-cart');
const overlay = document.querySelectorAll('.overlay');
const cross = document.querySelectorAll('.cross-mark');
const menu = document.querySelectorAll('.menu');

let width;
let last_side_bar; // 0 -> Shopping Cart, 1 -> Menu Cart

const hamburger = document.querySelectorAll('.hamburger');

hamburger.forEach( (item, index) => {
    item.addEventListener('click', () => {

        const rect = document.querySelector('.middle-container').getBoundingClientRect();
    
        width = document.querySelector('body').getBoundingClientRect().right - ((rect.left + rect.right)/2);
    
            overlay[index].style.opacity = '1';
            overlay[index].style.zIndex = '2';
            document.querySelector('body').style.overflow = 'hidden';
            overlay[index].style.cursor = 'pointer';
            menu[index].style.width = `${width}px`;
            menu[index].style.right = '0px'; 
            last_side_bar = 1;
    })
})

cart_buttons.forEach((item, index) => {
    item.addEventListener('click', () => {

    const rect = document.querySelector('.middle-container').getBoundingClientRect();

    width = document.querySelector('body').getBoundingClientRect().right - ((rect.left + rect.right)/2);

        overlay.forEach((item,index) => {
            item.style.opacity = '1';
            item.style.zIndex = '2';
        
            item.style.cursor = 'pointer';
            shopping_cart[index].style.width = `${width}px`;
            shopping_cart[index].style.right = '0px'; 
        })
        
        document.querySelector('body').style.overflow = 'hidden';
        last_side_bar = 0;
    })
})



const removeOverlay = () => {

    overlay.forEach( (item, index) => {
        item.style.opacity = '0';
        document.querySelector('body').style.overflow = 'auto';
        item.style.cursor = 'default';
        
        if(last_side_bar === 0)
            shopping_cart[index].style.right = `${-width}px`;
        else
            menu[index].style.right = `${-width}px`;
        setTimeout(() => {
            item.style.zIndex = '-1';
        },450); 
    })
};

overlay.forEach( item => {
    item.addEventListener('click', removeOverlay);
    cross.forEach(item => {
    item.addEventListener('click', removeOverlay);
})
})
