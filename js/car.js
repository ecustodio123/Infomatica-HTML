let carts = document.querySelectorAll('.add-cart') ;

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

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}


function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);

}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if (cartItems !== null){

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag] : product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems = {
            [product.tag] : product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost !== null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');


    if( cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product py-3">
                <i class="far fa-trash-alt icon-delete"></i>
                <img src="/images/${item.img}.png" style="height: 50px;">
                <span>${item.name}</span>
            </div>
            <div class="price">S/.${item.price},00</div>
            <div class="quantity py-3">
                <i class="fas fa-minus-circle icon-dec" style="color: #e57373"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-plus-circle icon-add" style="color: #41ceac"></i>
            </div>
            <div class="total py-3">
                <span>S/.${item.inCart * item.price},00</span>
            </div>
            `;
        })

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Monto a pagar
                </h4>
                <h4 class="basketTotal">
                    S/.${cartCost},00
                </h4>
                
            </div>
        `;
    }    
}

onLoadCartNumbers();
displayCart();
