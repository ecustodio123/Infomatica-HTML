let products = [
    {
        id : "0",
        name: "AMC T180",
        tag : "amc t180",
        price: 60,
        img : "28mSYjHazLhUDfsgUwRNiEEkNxktDOwWS2yQAsiv",
        inCart: 0
    },
    
    {
        id : "1",
        name: "AMC KDS 1501",
        tag : "amc kds 1501",
        price: 40,
        img : "lQbYqitLp53hQzum1TgnhrgdZcACfAWnJatJoIdv",
        inCart: 0
    },
    {
        id : "2",
        name: "AMC 1001 WP",
        tag : "amc 1001 wp",
        price: 30,
        img : "FRu2zl9cNMI4ZRSeslkG5vEsY9Jch6CeubwGmPLS",
        inCart: 0
    },
    {
        id : "3",
        name: "AMC 1001",
        tag : "amc 1001",
        price: 80,
        img : "vBJl7VPLBaSGEmyZ44wMfFnwtuUoA6GCE7OFSzaQ",
        inCart: 0
    },
    {
        id : "4",
        name: "AMC 1502 WP",
        tag : "amc 1502 wp",
        price: 90,
        img : "oRU2UB1nADdaLoAe7G8hCuSEJxGkWIRKcQBIukyj",
        inCart: 0
    },
    {
        id : "5",
        name: "AMC 1502",
        tag : "amc 1502",
        price: 20,
        img : "q4zzwW9zmoThr4dtZ4uY7nAyr6PAf2woMmoYPYfT",
        inCart: 0
    },
    {
        id : "6",
        name: "AMC 1520",
        tag : "amc 1520",
        price: 30,
        img : "Zs3NQizp6jbXLZzaIVJbDc6xbyxD54V0Mw22Wra5",
        inCart: 0
    }

]

function displayCart(){

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if( cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product py-3" id="id-name-${item.id}">
                <i class="far fa-trash-alt icon-delete"></i>
                <img src="/images/${item.img}.png" style="height: 50px;">
                <span>${item.name}</span>
            </div>
            <div class="price" id="id-price-${item.id}">S/.${item.price},00</div>
            <div class="quantity py-3" id="id-quantity-${item.id}">
                <i class="fas fa-minus-circle icon-dec" id="icon-dec-${item.id}" style="color: #e57373"></i>
                <span class="item-qt-${item.id}">${item.inCart}</span>
                <i class="fas fa-plus-circle icon-add" style="color: #41ceac"></i>
            </div>
            <div class="total py-3" id="id-total-${item.id}">
                <span class="item-total-${item.id}">S/.${item.inCart * item.price},00</span>
            </div>
            `;
        })

        productContainer.innerHTML += `
            <div class="basketTotalContainer mr-4">
                <h4 class="basketTotalTitle">
                    Monto a pagar
                </h4>
                <h4 class="basketTotal">S/.${cartCost},00</h4>
                
            </div>
        `;
    }   
    
    let iconDelete = document.querySelectorAll('.icon-delete') ;
    
    for (let i = 0; i < iconDelete.length; i++) {
        let itemNumber1 = document.querySelector(`.item-qt-${i}`).textContent;
        itemNumber1 = parseInt(itemNumber1);

        if (itemNumber1 <= 0){
            let name = document.getElementById(`id-name-${i}`);
            name.classList.add("d-none");
            let price = document.getElementById(`id-price-${i}`);
            price.classList.add("d-none");
            let quantity = document.getElementById(`id-quantity-${i}`);
            quantity.classList.add("d-none");
            let total = document.getElementById(`id-total-${i}`);
            total.classList.add("d-none");
        }

    }   
    
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

displayCart();
onLoadCartNumbers();

// Con fe

let iconDelete = document.querySelectorAll('.icon-delete') ;
let iconAdd = document.querySelectorAll('.icon-add') ;
let iconDec = document.querySelectorAll('.icon-dec') ;

for (let i = 0; i < iconAdd.length; i++) {
    iconAdd[i].addEventListener('click', () =>{
        setItemsAdd(i)
    })
}

for (let i = 0; i < iconDec.length; i++) {
    iconDec[i].addEventListener('click', () =>{
        setItemsDec(i)
    })
}

for (let i = 0; i < iconDelete.length; i++) {
    iconDelete[i].addEventListener('click', () =>{
        setItemsDel(i)
    })
}

function setItemsAdd(i){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cartCost = localStorage.getItem('totalCost');

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);


    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;

    cartCost = parseInt(cartCost);

    localStorage.setItem("totalCost", cartCost + products[i].price);

    
    if (cartItems !== null){

        if(cartItems[products[i].tag] == undefined){
            cartItems = {
                ...cartItems,
                [products[i].tag] : products[i]
            }
        }
        cartItems[products[i].tag].inCart += 1;
    } 

    let itemNumber = document.querySelector(`.item-qt-${i}`);
    itemNumber.innerHTML = '';
    itemNumber.innerHTML += `
        <span class="item-qt-${i}">${cartItems[products[i].tag].inCart}</span>
    `;

    let itemTotal = document.querySelector(`.item-total-${i}`);
    itemTotal.innerHTML = '';
    itemTotal.innerHTML += `
        <span class="item-total-${i}">S/.${cartItems[products[i].tag].inCart * cartItems[products[i].tag].price},00</span>
    `;

    let basketTotal = document.querySelector(`.basketTotal`);
    basketTotal.innerHTML = '';
    basketTotal.innerHTML += `
        S/.${cartCost + products[i].price},00
    `;

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function setItemsDec(i){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cartCost = localStorage.getItem('totalCost');

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    localStorage.setItem('cartNumbers', productNumbers - 1);
    document.querySelector('.cart span').textContent = productNumbers - 1;

    cartCost = parseInt(cartCost);

    localStorage.setItem("totalCost", cartCost - products[i].price);

    let itemNumber1 = document.querySelector(`.item-qt-${i}`).textContent;

    // if (itemNumber1  != 1 ){
    
        if (cartItems !== null){
    
            if(cartItems[products[i].tag] == undefined){
                cartItems = {
                    ...cartItems,
                    [products[i].tag] : products[i]
                }
            }
            cartItems[products[i].tag].inCart -= 1;
        } 
    
        let itemNumber = document.querySelector(`.item-qt-${i}`);
        itemNumber.innerHTML = '';
        itemNumber.innerHTML += `
            <span class="item-qt-${i}">${cartItems[products[i].tag].inCart}</span>
        `;
    
        let itemTotal = document.querySelector(`.item-total-${i}`);
        itemTotal.innerHTML = '';
        itemTotal.innerHTML += `
            <span class="item-total-${i}">S/.${cartItems[products[i].tag].inCart * cartItems[products[i].tag].price},00</span>
        `;
    
        let basketTotal = document.querySelector(`.basketTotal`);
        basketTotal.innerHTML = '';
        basketTotal.innerHTML += `
            S/.${cartCost - products[i].price},00
        `;
    
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    // }
}

function setItemsDel(i){

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cartCost = localStorage.getItem('totalCost');

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    let itemNumber1 = document.querySelector(`.item-qt-${i}`).textContent;

    itemNumber1 = parseInt(itemNumber1);

    localStorage.setItem('cartNumbers', productNumbers - itemNumber1);
    document.querySelector('.cart span').textContent = productNumbers - itemNumber1;

    cartCost = parseInt(cartCost);

    localStorage.setItem("totalCost", cartCost - (products[i].price * itemNumber1));

    cartItems[products[i].tag].inCart = 0;

    let itemNumber = document.querySelector(`.item-qt-${i}`)

    itemNumber.innerHTML = '';
    itemNumber.innerHTML += `
        <span class="item-qt-${i}">0</span>
    `;

    let itemTotal = document.querySelector(`.item-total-${i}`);
    itemTotal.innerHTML = '';
    itemTotal.innerHTML += `
        <span class="item-total-${i}">S/.${cartItems[products[i].tag].inCart * cartItems[products[i].tag].price},00</span>
    `;

    let basketTotal = document.querySelector(`.basketTotal`);
    basketTotal.innerHTML = '';
    basketTotal.innerHTML += `
        S/.${cartCost - (products[i].price * itemNumber1)},00
    `;
    
    let name = document.getElementById(`id-name-${i}`);
    name.classList.add("d-none");
    let price = document.getElementById(`id-price-${i}`);
    price.classList.add("d-none");
    let quantity = document.getElementById(`id-quantity-${i}`);
    quantity.classList.add("d-none");
    let total = document.getElementById(`id-total-${i}`);
    total.classList.add("d-none");

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

// Con fe


