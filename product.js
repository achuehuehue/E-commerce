const shop_cart = {
    
    item1: {
        name: 'Beans',
        img: 'Beans.png',
        price: '₹30.00',
        rating: 4,
        folder: 'Grocery-images',
        type: 'grocery',
        desc: `Discover the pure essence of organic beans, where freshness meets sustainability. Grown without synthetic pesticides or fertilizers, our organic beans boast unparalleled flavor and nutrition. Elevate your dishes with the wholesome goodness of organic beans.`
    },
    item2: {
        name: 'Cabbage',
        img: 'Cabbage.png',
        price: '₹25.00',
        rating: 3,
        folder: 'Grocery-images',
        type: 'grocery',
        desc: `Our organic cabbage is a testament to purity and quality. Grown locally without synthetic pesticides or GMOs, our cabbage bursts with flavor and nutrients. Versatile and nutritious, it's perfect for everything from crisp coleslaw to hearty soups. Support local farms and your health by choosing organic cabbage today!`
    },
    item3: {
        name: 'Carrot',
        img: 'Carrot.png',
        price: '₹30.00',
        rating: 4,
        folder: 'Grocery-images',
        type: 'grocery'
    },
    item4: {
        name: 'Cauliflower',
        img: 'Cauliflower.png',
        price: '₹20.00',
        rating: 3,
        folder: 'Grocery-images',
        type: 'grocery'
    },
    item5: {
        name: 'Karela',
        img: 'Karela.png',
        price: '₹20.00',
        rating: 2,
        folder: 'Grocery-images',
        type: 'grocery'
    },
    item6: {
        name: 'Onion',
        img: 'Onion.png',
        price: '₹40.00',
        rating: 4,
        folder: 'Grocery-images',
        type: 'grocery'
    },
    item7: {
        name: 'Potato',
        img: 'Potato.png',
        price: '₹40.00',
        rating: 5,
        folder: 'Grocery-images',
        type: 'grocery'
    },
    item8: {
        name: 'Tomato',
        img: 'Tomato.png',
        price: '₹35.00',
        rating: 5,
        folder: 'Grocery-images',
        type: 'grocery'
    },

    item9: {
        name: 'Apple juice',
        img: 'Apple.png',
        price: '₹80.00',
        rating: 4,
        folder: 'Juice-images',
        type: 'juice'
    },
    item10: {
        name: 'Mango juice',
        img: 'Mango.png',
        price: '₹100.00',
        rating: 5,
        folder: 'Juice-images',
        type: 'juice'
    },
    item11: {
        name: 'Orange juice',
        img: 'Orange.png',
        price: '₹80.00',
        rating: 4,
        folder: 'Juice-images',
        type: 'juice'
    },
    item12: {
        name: 'Pineapple juice',
        img: 'Pineapple.png',
        price: '₹100.00',
        rating: 4,
        folder: 'Juice-images',
        type: 'juice'
    },
    item13: {
        name: 'Strawberry juice',
        img: 'Strawberry.png',
        price: '₹120',
        rating: 5,
        folder: 'Juice-images',
        type: 'juice'
    }

};

let item;

getLocalStorageData();
renderData();

const box = document.querySelector('.box');

box.innerText = '1';

const buttonUp = document.querySelector('.box-button-up');
const buttonDown = document.querySelector('.box-button-down');

const lens = document.querySelector('.lens');
const productImg = document.querySelector('.product-img');
const result = document.querySelector('.result');

const star = document.querySelectorAll('.star');

let imgLeft;
let imgTop;
let imgRight;
let imgBottom;
let imgWidth;
let imgHeight;

let lensWidth;
let lensHeight;
let lensLeft;
let lensTop;
let lensRight;
let lensBottom;

let fx;
let fy;

const cartMoney = document.querySelector('.money');
const cartNum = document.querySelector('.cart-item-num');
const addToCart = document.querySelector('.add-to-cart');

updateCartNum('r');
updateCartPrice('r')
renderCart();

addToCart.addEventListener('click', () => {

    // GET CART JSON DATA
    let data = localStorage.getItem('cart');
    let cartData;

    // IF DATA IS NOT EMPTY CONVERT IT TO JS OBJECT
    if(data){
        cartData = JSON.parse(data).cart;
    }
    // IF IT IS EMPTY CREATE A JS OBJECT
    else{
        cartData = {};
    }

    const key = addToCart.getAttribute('data-item');

    // IF KEY EXISTS THEN INCREMENT ITS COUNT
    if(cartData[key]){
        cartData[key]+=Number(box.value);
    }
    // IF KEY IS NOT PRESENT THEN MAKE ITS VALUE EQUAL TO INPUT VALUE
    else{
        cartData[key] = Number(box.value);
    }

    // SAVE THE DATA IN BROWSER'S LOCAL STORAGE
    localStorage.setItem('cart', JSON.stringify({cart: cartData}));
    
    // UPDATE THE TOTAL CART NUMBER
    updateCartNum('w');
    updateCartPrice('w');
    renderCart();
})

function updateCartNum(mode){
     // GET CART JSON DATA
     let data = localStorage.getItem('cartNum');

     // UPDATE THE CART NUM IF IT ALREADY EXISTS
     if(data){
        data = JSON.parse(data).num;

        if(mode === 'w'){
            cartNum.innerText = data + Number(box.value);
            data = Number(cartNum.innerText);
            localStorage.setItem('cartNum', JSON.stringify({num: data}));
        }

        if(mode === 'r'){
            cartNum.innerText = data;
        }
       
     }
     // CREATE CART NUM
     else{
        cartNum.innerText = Number(box.value);
        localStorage.setItem('cartNum', JSON.stringify({num: Number(box.value)}))
     }
}

function updateCartPrice(mode){
    // GET CART JSON DATA
    let data = localStorage.getItem('cartPrice');

    // UPDATE THE CART NUM IF IT ALREADY EXISTS
    if(data){

        data = JSON.parse(data).price;
        
        if(mode === 'w'){
            cartMoney.innerText = '₹' + Number(data + Number(box.value)*Number(shop_cart[item].price.slice(1))).toFixed(2);
            data = Number(cartMoney.innerText.slice(1));
            localStorage.setItem('cartPrice', JSON.stringify({price: data}));
        }

        if(mode === 'r'){
            cartMoney.innerText = '₹' + Number(data).toFixed(2);
        }
       
    }
    // CREATE CART NUM
    else{
        cartMoney.innerText = '₹' + (Number(box.value)*Number(shop_cart[item].price.slice(1)));
        localStorage.setItem('cartPrice', JSON.stringify({price: Number(box.value)*Number(shop_cart[item].price.slice(1))}))
    }
}

function renderCart(){
    // GET CART JSON DATA
    let data = localStorage.getItem('cart');
    const cartInfo = document.querySelector('.cart-info-container');
    const checkout = document.querySelector('.checkout-js');

    if(data && Object.keys(JSON.parse(data).cart).length){
        cartData = JSON.parse(data).cart;
        cartDataKeys = Object.keys(cartData);
        cartLength = cartDataKeys.length;
        cartInfo.innerHTML = '';
        cartInfo.style.justifyContent = '';

        cartDataKeys.forEach( key => {

            if(key === cartDataKeys[cartLength - 1]){
                const childNode = `<div class="cart-item-container">        
                                <div class="cart-item">
                                    <img src="${shop_cart[key].folder}/${shop_cart[key].img}">
                                    <div class="item-info">
                                        <p>${shop_cart[key].name}</p>
                                        <p>${cartData[key]} x ${shop_cart[key].price}</p>
                                    </div>
                                    <svg class="remove-item" data-item="${key}" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path></svg>
                                </div>
                            </div>`
                
                cartInfo.innerHTML += childNode;
            }
            
            else{
                const childNode = `<div class="cart-item-container">        
                                <div class="cart-item">
                                    <img src="${shop_cart[key].folder}/${shop_cart[key].img}">
                                    <div class="item-info">
                                        <p>${shop_cart[key].name}</p>
                                        <p>${cartData[key]} x ${shop_cart[key].price}</p>
                                    </div>
                                    <svg class="remove-item" data-item="${key}" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path></svg>
                                </div>
                                <hr size="1" class="cart-line">
                            </div>`

                cartInfo.innerHTML += childNode;
            }
            
        })

        removeCartItem()

        checkout.classList.remove('continue-shopping-container');
        checkout.classList.add('checkout-container');
        checkout.innerHTML = '';
        checkout.innerHTML =    `<div class="upper-container">
                                <hr size="1" class="cart-line">
                                <div class="subtotal-container">
                                    <span>Subtotal:</span>
                                    <span>₹${JSON.parse(localStorage.getItem('cartPrice')).price.toFixed(2)}</span>
                                </div>
                                <hr size="1" class="cart-line">
                                </div>
                                <div class="button-container">
                                    <button class="continue-shopping">VIEW CART</button>
                                    <button class="continue-shopping">CHECKOUT</button>
                                </div>`
    }
    else{
        cartInfo.innerHTML = `<p class="cart-info">No products in the cart.</p>`;
        cartInfo.style.justifyContent = 'center';

        checkout.classList.remove('checkout-container');
        checkout.classList.add('continue-shopping-container');
        checkout.innerHTML = '';
        checkout.innerHTML = `<button class="continue-shopping">CONTINUE SHOPPING</button>`;
    }
}


productImg.addEventListener('mouseenter', () => {
    result.style.opacity = '1';
    productImg.style.opacity = '0'
})

result.addEventListener('mouseleave', () => {
    result.style.opacity = '0';
    productImg.style.opacity = '1'
})

lens.addEventListener('mouseleave', () => {
    result.style.opacity = '0';
    productImg.style.opacity = '1'
})


result.addEventListener('mousemove', event => {

    result.style.opacity = '1';
    productImg.style.opacity = '0'

    let mouseX = event.pageX;
    let mouseY = event.pageY;

    let lensCx = mouseX - imgLeft - lensWidth;
    let lensCy = mouseY - imgTop - lensHeight;

    lens.style.left = `${lensCx}px`;
    lens.style.top = `${lensCy}px`;

    lensLeft = lens.getBoundingClientRect().left;
    lensTop = lens.getBoundingClientRect().top;
    lensRight = lens.getBoundingClientRect().right;
    lensBottom = lens.getBoundingClientRect().bottom;

    if(lensLeft < imgLeft)
        lensCx += imgLeft - lensLeft;

    if(lensRight > imgRight)
        lensCx -= lensRight - imgRight;

    if(lensTop < imgTop)
        lensCy += imgTop - lensTop;

    if(lensBottom > imgBottom)
        lensCy -= lensBottom - imgBottom;

    lens.style.left = `${lensCx}px`;
    lens.style.top = `${lensCy}px`;

    result.style.backgroundPosition = `-${lensCx*fx}px -${lensCy*fy}px`;
})

lens.addEventListener('mousemove', (event) => {

    result.style.opacity = '1';
    productImg.style.opacity = '0'

    mouseX = event.pageX;
    mouseY = event.pageY;

    let lensCx = mouseX - imgLeft - lensWidth/2;
    let lensCy = mouseY - imgTop - lensHeight/2;

    lens.style.left = `${lensCx}px`;
    lens.style.top = `${lensCy}px`;

    lensLeft = lens.getBoundingClientRect().left;
    lensTop = lens.getBoundingClientRect().top;
    lensRight = lens.getBoundingClientRect().right;
    lensBottom = lens.getBoundingClientRect().bottom;

    if(lensLeft < imgLeft)
        lensCx += imgLeft - lensLeft;

    if(lensRight > imgRight)
        lensCx -= lensRight - imgRight;

    if(lensTop < imgTop)
        lensCy += imgTop - lensTop;

    if(lensBottom > imgBottom)
        lensCy -= lensBottom - imgBottom;

    lens.style.left = `${lensCx}px`;
    lens.style.top = `${lensCy}px`;

    if(lensCx < 0){
        lensCx = 0;
    }

    if(lensCy < 0){
        lensCy = 0;
    }

    result.style.backgroundPosition = `-${lensCx*fx}px -${lensCy*fy}px`;
})

window.addEventListener('resize', () => {
    imgLeft = productImg.getBoundingClientRect().left;
    imgTop = productImg.getBoundingClientRect().top;
    imgRight = productImg.getBoundingClientRect().right;
    imgBottom = productImg.getBoundingClientRect().bottom;
    imgWidth = productImg.getBoundingClientRect().width;
    imgHeight = productImg.getBoundingClientRect().height;  

    lensWidth = lens.getBoundingClientRect().width;
    lensHeight = lens.getBoundingClientRect().height;

    fx = imgWidth/lensWidth;
    fy = imgHeight/lensHeight;

    result.style.width = `${imgWidth}px`;
    result.style.height = `${imgHeight}px`;

    result.style.backgroundSize = `${imgWidth*fx}px ${imgHeight*fy}px`;
    result.style.backgroundImage = `url(${productImg.src})`;
})

box.addEventListener('mouseenter', () => {
    buttonUp.style.display = 'block';
    buttonDown.style.display = 'block';
})

box.addEventListener('mouseleave', () => {
    buttonUp.style.display = 'none';
    buttonDown.style.display = 'none';
})

box.addEventListener('input', () => {
    if(!Number(box.value)){
        box.value = 0;
    }
    
    else{
        if(box.value[0] == '0')
            box.value = box.value.slice(1);
    }

})

buttonUp.addEventListener('mouseenter', () => {
    buttonUp.style.display = 'block';
    buttonDown.style.display = 'block';
})

buttonDown.addEventListener('mouseenter', () => {
    buttonUp.style.display = 'block';
    buttonDown.style.display = 'block';
})

buttonUp.addEventListener('mouseleave', () => {
    buttonUp.style.display = 'none';
    buttonDown.style.display = 'none';
})

buttonDown.addEventListener('mouseleave', () => {
    buttonUp.style.display = 'none';
    buttonDown.style.display = 'none';
})

buttonUp.addEventListener('click', () => {
    buttonUp.style.display = 'block';
    buttonDown.style.display = 'block';
    box.value = String(Number(box.value)+1);
})

buttonDown.addEventListener('click', () => {

    buttonUp.style.display = 'block';
    buttonDown.style.display = 'block';

    if(box.value != '0' && box.value != '')
        box.value = String(Number(box.value)-1);
})

const starMouseEnterHandlerList = [];

star.forEach( (item,index) => {
    const mouseEnterHandler =  () => {
        colourStars(1,index+1, 'gold');
    };

    starMouseEnterHandlerList.push(mouseEnterHandler);
    item.addEventListener('mouseenter', mouseEnterHandler);

})

const starMouseLeaveHandlerList = [];

star.forEach( (item,index) => {
    const mouseLeaveHandler = () => {
        colourStars(1,index+1, 'rgb(190, 190, 190)');
    };   
    
    starMouseLeaveHandlerList.push(mouseLeaveHandler);
    item.addEventListener('mouseleave', mouseLeaveHandler);
})

star.forEach( (item,index) => {
    item.addEventListener( 'click', () => {
        colourStars(1,index+1, 'gold');
        colourStars(index+2,5,'rgb(190,190,190)')

        star.forEach( (item,index) => {
            item.removeEventListener('mouseenter', starMouseEnterHandlerList[index]);
            item.removeEventListener('mouseleave', starMouseLeaveHandlerList[index]);
        })
        
    })
})

function colourStars(min, curr, color){
    for(let i=min; i <= curr; i++){
        document.querySelector(`.star-${i}`).style.color = color;
    }
}



function getLocalStorageData(){
    const storedData = localStorage.getItem('item');
    item = JSON.parse(storedData).item;
}

function renderData(){
    const mainContainer = document.querySelector('.products-main-container');
    mainContainer.innerHTML = '';
    mainContainer.innerHTML = ` <div class="upper-section">
                                    <div class="product-img-container">
                                        <img class="product-img" src="${shop_cart[item].folder}/${shop_cart[item].img}">
                                        <p class="result"></p>
                                        <p class="lens"></p>
                                    </div>
                                    <div class="product-info-container">
                                        <p class="product-title">${shop_cart[item].name}</p>
                                        <p class="price">${shop_cart[item].price}</p><span class="content"> + Free Shipping</span>
                                        <p class="content">Discover the pure essence of organic beans, where freshness meets sustainability. Grown without synthetic pesticides or fertilizers, our organic beans boast unparalleled flavor and nutrition. Elevate your dishes with the wholesome goodness of organic beans.</p>
                                        <div class="add-to-cart-container">
                                            <input class="box" value="0">
                                            <button class="box-button-up">&#x25B2</button>
                                            <button class="box-button-down">&#x25BC</button>
                                            <button class="add-to-cart" data-item="${item}">ADD TO CART</button>
                                        </div>
                                        <hr class="line">
                                        <span class="category">Category : </span><span class="category-type">Grocery</span>
                                        <p class="rate-product">Rate Product :</p>
                                        <div class="star-container">
                                            <div class="star-1 star">&#x2605</div>
                                            <div class="star-2 star">&#x2605</div>
                                            <div class="star-3 star">&#x2605</div>
                                            <div class="star-4 star">&#x2605</div>
                                            <div class="star-5 star">&#x2605</div>
                                        </div>
                                    </div>
                                </div>`;

}

setTimeout(() => {
    imgLeft = productImg.getBoundingClientRect().left;
    imgTop = productImg.getBoundingClientRect().top;
    imgRight = productImg.getBoundingClientRect().right;
    imgBottom = productImg.getBoundingClientRect().bottom;
    imgWidth = productImg.getBoundingClientRect().width;
    imgHeight = productImg.getBoundingClientRect().height;  

    lensWidth = lens.getBoundingClientRect().width;
    lensHeight = lens.getBoundingClientRect().height;

    fx = imgWidth/lensWidth;
    fy = imgHeight/lensHeight;

    result.style.width = `${imgWidth}px`;
    result.style.height = `${imgHeight}px`;

    result.style.backgroundSize = `${imgWidth*fx}px ${imgHeight*fy}px`;
    result.style.backgroundImage = `url(${productImg.src})`;
},20);

function removeCartItem(){
    const removeItem = document.querySelectorAll('.remove-item');

    removeItem.forEach( cross => {
        cross.addEventListener('click', () => {
            const item = cross.getAttribute('data-item');
            let cartData = JSON.parse(localStorage.getItem('cart')).cart;
            let cartNumData = JSON.parse(localStorage.getItem('cartNum')).num;
            let cartPriceData = JSON.parse(localStorage.getItem('cartPrice')).price;
            
            cartNumData -= cartData[item];
            cartPriceData -= cartData[item]*Number(shop_cart[item].price.slice(1));
            delete cartData[item];

            localStorage.setItem('cart', JSON.stringify({cart: cartData}));
            localStorage.setItem('cartNum', JSON.stringify({num: cartNumData}));
            localStorage.setItem('cartPrice', JSON.stringify({price: cartPriceData}));

            updateCartNum('r');
            updateCartPrice('r');
            renderCart();

        })
    })
}
