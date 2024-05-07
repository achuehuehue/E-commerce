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

let numGrocery = 0;
let numJuice = 0;

let sortValues = [];

countGrocery();
countJuice();

let itemList = Object.keys(shop_cart);

const slider1 = document.querySelector('.slider1');
const slider2 = document.querySelector('.slider2');
const slider_active = document.querySelector('.slider-active');

const lower_num = document.querySelector('.numeric-lower-range');
const upper_num = document.querySelector('.numeric-upper-range');

const totalItems = document.querySelector('.items-num');

totalItems.innerText = `Showing ${numGrocery + numJuice} results`;

let slider1_value = slider1.min;
let slider2_value = slider2.max;

let active_slider;

const slider_width = Number(window.getComputedStyle(slider1).getPropertyValue('width').slice(0,-2));

const slider_left = slider1.getBoundingClientRect().left;

const dropDown = document.querySelector('.drop-down');

const cartNum = document.querySelector('.cart-item-num');

const cartMoney = document.querySelector('.money');


slider1.addEventListener('input', () => {
    slider1_value = Number(slider1.value);
    
    active_slider = 1;
    checkSliderLimit();
    changeWidth();
    setTimeout(sortOnPriceRange,800,slider1_value/100,slider2_value/100);
})

slider2.addEventListener('input', () => {
    slider2_value = Number(slider2.value);
   
    active_slider = 2;
    checkSliderLimit();
    changeWidth();
    setTimeout(sortOnPriceRange,800,slider1_value/100,slider2_value/100);
})

dropDown.addEventListener('change', (event) => {
    const dropDownOption = event.target.value;

    console.log(dropDownOption === 'Default sorting');
    console.log('Default sorting');

    if(dropDownOption === 'Default sorting'){
        defaultSort();
    }
    else if(dropDownOption === 'Sort by average rating'){
        sortOnRating();
    }
    else if(dropDownOption === 'Sort by price: low to high'){
        sortOnPriceAsc();
    }
    else{
        sortOnPriceDesc();
    }
})

function changeWidth(){

    let move_left = slider_width*(slider1_value - slider1.min)/(slider1.max - slider1.min);
    slider_active.style.left = `${move_left}px`;

    let ratio = (slider2_value - slider1_value)/(slider2.max - slider1.min);
    let width  = slider_width*ratio;

    if(slider2_value <= (slider2.min + slider2.max)/2){
        width+=7;
    }
  
    slider_active.style.width = `${width}px`;
    lower_num.value = `₹${Math.ceil(slider1_value/100)}`;
    upper_num.value = `₹${Math.ceil(slider2_value/100)}`;

}

function checkSliderLimit(){
    if(Number(slider2_value) - Number(slider1_value) <= 100 ){

        if(active_slider === 1){
            slider1_value = String(Number(slider2_value)-100);
            slider1.value = String(Number(slider2_value)-100);
            
        }

        else{
            
            slider2_value = String(Number(slider1_value)+100);
            slider2.value = String(Number(slider1_value)+100);
            
        }   
    }
}

function countGrocery(){
    Object.keys(shop_cart).forEach( item => {
        if(shop_cart[item].type === 'grocery'){
            numGrocery++;
        }
    })
}

function countJuice(){
    Object.keys(shop_cart).forEach( item => {
        if(shop_cart[item].type === 'juice'){
            numJuice++;
        }
    })
}


function customRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderAd(){
    const ad_container = document.querySelector('.ad-container');
    ad_container.innerHTML = '';

    for(let i=1; i<=3; i++){
        const childNode = `<div class="ad">
                            <img class="ad-img">
                           </div>`;
                           
                           

        ad_container.innerHTML += childNode;
    }   
    
}

function updateItemsNum(){
    const itemNum = document.querySelectorAll('.item-num');
    itemNum[0].innerText = `(${numGrocery})`;
    itemNum[1].innerText = `(${numJuice})`
}

function renderProducts(itemList){
    const itemContainer = document.querySelector('.item-container');

    itemContainer.innerHTML = '';

    itemList.forEach( item => {
            const childNode =   `<div class="item-img-container">
                                    <a href="products.html">
                                        <img class="item-img" data-hidden-text="${item}" src="${shop_cart[item].folder}/${shop_cart[item].img}">
                                    </a>
                                    <p class="item-type">${shop_cart[item].type[0].toUpperCase()+shop_cart[item].type.slice(1)}</p>
                                    <a href="products.html" class="item-name" data-hidden-text="${item}">${shop_cart[item].name}</a>
                                    <div class="star-rating-container-${item}">
                                        <div class="star-1">&#x2605</div>
                                        <div class="star-2">&#x2605</div>
                                        <div class="star-3">&#x2605</div>
                                        <div class="star-4">&#x2605</div>
                                        <div class="star-5">&#x2605</div>
                                    </div>
                                    <p class="item-price">${shop_cart[item].price}</p>
                                </div>`;

            itemContainer.innerHTML += childNode;

            const starRatingContainer = document.querySelector(`.star-rating-container-${item}`);
            starRatingContainer.style.display = 'flex';
            starRatingContainer.style.justifyContent = 'space-between';
            starRatingContainer.style.width = '120px';
            starRatingContainer.style.marginTop = '5px';

            for(let i = 1; i <= shop_cart[item].rating; i++){
                const star = document.querySelector(`.star-rating-container-${item} .star-${i}`);
                star.style.color = 'gold';
            }


        })
};

function renewItemList(){
    itemList = [];
    sortValues = [];
    itemList = Object.keys(shop_cart);
    sortValuesArray()
}

function sortValuesArray(){
    itemList.forEach( (item, index) => {
        sortValues.push([item, Number(shop_cart[item].price.slice(1)), shop_cart[item].rating, index]);
    })
};

function updateItemList(){

    itemList = [];

    sortValues.forEach( (item, index) => {
        itemList.push(sortValues[index][0]);
    })
}

function defaultSort(){
    sortValues.sort((a,b) => a[3] - b[3]);
    updateItemList();
    renderProducts(itemList);
    productImages = document.querySelectorAll('.item-img-container .item-img');
    productImages.forEach(img => {
        img.addEventListener('click', renderSelectedProduct)
    });
    renewItemList();
}

function sortOnRating(){
    sortValues.sort((a,b) => b[2] - a[2]);
    updateItemList();
    renderProducts(itemList);
    productImages = document.querySelectorAll('.item-img-container .item-img');
    productImages.forEach(img => {
        img.addEventListener('click', renderSelectedProduct)
    });
    renewItemList();
}

function sortOnPriceAsc(){
    sortValues.sort((a,b) => a[1] - b[1]);
    updateItemList();
    renderProducts(itemList);
    productImages = document.querySelectorAll('.item-img-container .item-img');
    productImages.forEach(img => {
        img.addEventListener('click', renderSelectedProduct)
    });
    renewItemList();
}

function sortOnPriceDesc(){
    sortValues.sort((a,b) => b[1] - a[1]);
    updateItemList();
    renderProducts(itemList);
    productImages = document.querySelectorAll('.item-img-container .item-img');
    productImages.forEach(img => {
        img.addEventListener('click', renderSelectedProduct)
    });
    renewItemList();
}

function sortOnPriceRange(lower, upper){
    sortValues = sortValues.filter( itemInfo => itemInfo[1] >= lower && itemInfo[1] <= upper )
    sortValues.sort((a,b) => a[1] - b[1]);
    updateItemList();
    renderProducts(itemList);
    productImages = document.querySelectorAll('.item-img-container .item-img');
    productImages.forEach(img => {
        img.addEventListener('click', renderSelectedProduct)
    });
    totalItems.innerText = `Showing ${itemList.length} results`;
    renewItemList();
}
    
renderAd();
updateItemsNum();
renderProducts(itemList);
sortValuesArray();
updateCartNum();
updateCartPrice();
renderCart();

let productImages = document.querySelectorAll('.item-img-container .item-img');
let productNames = document.querySelectorAll('.item-img-container .item-name');

function renderSelectedProduct(event){
    let data = { item: event.target.getAttribute('data-hidden-text') };
    localStorage.setItem('item', JSON.stringify(data));
}


productImages.forEach(img => {
    img.addEventListener('click', renderSelectedProduct)
});

productNames.forEach(name => {
    name.addEventListener('click', renderSelectedProduct)
});

function updateCartNum(){
    // GET CART JSON DATA
    let data = localStorage.getItem('cartNum');

    // UPDATE THE CART NUM IF IT ALREADY EXISTS
    if(data){
       data = JSON.parse(data).num;
       cartNum.innerText = data;
    }

}

function updateCartPrice(){
    // GET CART JSON DATA
    let data = localStorage.getItem('cartPrice');

    // UPDATE THE CART NUM IF IT ALREADY EXISTS
    if(data){
       data = JSON.parse(data).price;
       cartMoney.innerText = '₹' + Number(data).toFixed(2);
    }

}

function renderCart(){
    // GET CART JSON DATA
    let data = localStorage.getItem('cart');
    const cartInfo = document.querySelector('.cart-info-container');
    const checkout = document.querySelector('.checkout-js');

    if( data && Object.keys(JSON.parse(data).cart).length){
        cartData = JSON.parse(data).cart;
        cartDataKeys = Object.keys(cartData);
        cartLength = cartDataKeys.length;
        cartInfo.innerHTML = '';
        cartInfo.style.justifyContent = 'none';

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

            updateCartNum();
            updateCartPrice();
            renderCart();

        })
    })
}



