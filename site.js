import { products } from "./products.js"
CreateProductListings();
document.getElementById("cartList").innerText = "";
const cart = document.getElementById("cart-container")
const productsContainer = document.getElementById("products-container")
productsContainer.addEventListener("drop", dropOutCart);
productsContainer.addEventListener("dragover", allowDrop);
cart.addEventListener("drop", dropToCart);
cart.addEventListener("dragover", allowDrop);
var productsInCart = [];
var NumberOfItemsInCart = 0;
function CreateProductListings()
{
    document.getElementById("products-container").innerText = "";
    products.forEach((products, index) => {
        if (products.quantity == 0) {return}
        const productlisting = document.createElement("div");
        productlisting.addEventListener('dragstart', drag);
        productlisting.setAttribute("draggable", true)
        productlisting.setAttribute("id", index)
        productlisting.className = "card"
        const productcontent = document.createElement("div");
        productcontent.className = "card-content"
        const productImg = document.createElement("div");
        productImg.className = "card-img"
        productImg.style.backgroundImage = "url('" + products.image + "')";
        const productTitle = document.createElement("div");
        productTitle.className = "card-title"
        productTitle.textContent = products.title;
        const productDescription = document.createElement("div");
        productDescription.className = "card-description"
        productDescription.textContent = products.description;
        const productcprice = document.createElement("div");
        productcprice.className = "card-price"
        productcprice.textContent = "$"+products.price;
        const productquantity = document.createElement("div");
        productquantity.className = "card-quantity"
        productquantity.textContent = "Quantity: " + products.quantity;
        productcontent.appendChild(productTitle);
        productcontent.appendChild(productDescription);
        productcontent.appendChild(productcprice);
        productcontent.appendChild(productquantity);
        productlisting.appendChild(productImg)
        productlisting.appendChild(productcontent)
        document.getElementById("products-container").appendChild(productlisting)
    })

}

function createCartCards() 
{
    document.getElementById("cartList").innerText = "";
    const cart = document.getElementById('cartList')
    productsInCart.forEach((item, index) => {
        if (item.quantity <= 0) {return};
        const card = getCartHTML(item, item.quantity)
        card.className = "card"
        card.addEventListener('dragstart', drag);
        card.setAttribute("draggable", true)
        card.setAttribute("id", item.title)
        cart.appendChild(card)
        computeTotalPrice()
    })
}

function allowDrop(event){
    event.preventDefault();
}
const getCartHTML = (product, quantity) => {
    const card = document.createElement("div")
    card.classList.add("card")
    const cardImg = document.createElement("div")
    cardImg.classList.add("card-img")
    const cardAttribute = `background-image: url("` + product.image + `");`
    cardImg.setAttribute("style", cardAttribute)
    const cardContent = document.createElement("div")
    cardContent.classList.add("card-content")
    const cardTitle = document.createElement("div")
    cardTitle.classList.add("card-title")
    cardTitle.innerText = product.title
    const cardDescription = document.createElement("div")
    cardDescription.classList.add("card-description")
    cardDescription.innerText = product.description
    const cardPrice = document.createElement("div")
    cardPrice.classList.add("card-price")
    cardPrice.innerText = product.price
    const cardQuantity = document.createElement("div")
    cardQuantity.classList.add("cardQuantity")
    cardQuantity.innerText = ("Quantity: "+ quantity)
    card.appendChild(cardImg)
    cardContent.appendChild(cardTitle)
    cardContent.appendChild(cardDescription)
    cardContent.appendChild(cardPrice)
    cardContent.appendChild(cardQuantity)
    card.appendChild(cardContent)
    return card
}
function drag(event){
    event.dataTransfer.clearData()
    event.dataTransfer.setData("text/plain", event.target.id)
}
function dropToCart(event){
    event.preventDefault();
    const index = event.dataTransfer.getData("text/plain")
    const product = products[index]
    const newProduct = Object.assign({}, product)
    newProduct.quantity = 0;
    newProduct.quantity += 1;
    var itemAlreadyInCart = false;
    productsInCart.forEach((item) => {
        if (product.title == item.title)
        {
            item.quantity += 1
            itemAlreadyInCart = true;
        }
    })
    if (itemAlreadyInCart == false)
    {
    productsInCart[NumberOfItemsInCart] = newProduct;
    }
    product.quantity += -1
    NumberOfItemsInCart += 1;
    document.getElementById("products-container").innerText = `<h2>Available Products</h2>`
    CreateProductListings(product, index)
    createCartCards();
}
function dropOutCart(event){
    var droppeditemIndex = null;
    event.preventDefault();
    const item = event.dataTransfer.getData("text/plain")
    productsInCart.forEach((product, index) => {
        if (item == product.title)
        {
            droppeditemIndex = index
        }
    }) 
    productsInCart[droppeditemIndex].quantity += -1;
    products.forEach((product, index) => {
        if (item == product.title) 
        {
            droppeditemIndex = index
        }
    })
    products[droppeditemIndex].quantity += 1;
    document.getElementById("products-container").innerText = `Available Products`
    CreateProductListings(products, droppeditemIndex)
    createCartCards()
    computeTotalPrice()
}
function computeTotalPrice () {
    document.getElementsByClassName("cart-total")[0].innerText = "Total"
    var totalPrice = 0;
    productsInCart.forEach((item) => {
        totalPrice += item.price * item.quantity
    })
    totalPrice = totalPrice.toFixed(2)
    const cartTotal = document.getElementsByClassName("cart-total")[0]
    const finalPrice = document.createElement("div")
    finalPrice.setAttribute("id", "amount")
    finalPrice.className = "total-amount"
    finalPrice.textContent = "$" + totalPrice;
    cartTotal.appendChild(finalPrice);
}