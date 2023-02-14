

let ShoppingList = [];

// vegetables
const items = [
    {
        image: "cucumber.jpg",
        name: "Cucumber",
        price: 5,
        category: 'Garden vegetables',
        id: 1
    },
    {
        image: "tomato.jpg",
        name: "Tomato",
        price: 4,
        category: 'Garden vegetables',
        id: 2
    },
    {
        image: "salanova.jpg",
        name: "Salanova lettuce",
        price: 6.3,
        category: 'Lettuce',
        id: 3
    },    {
        image: "portabelo.jpg",
        name: "Portobello",
        price: 5,
        category: 'Mushrooms',
        id: 4
    }, {
        image: "mint.jpg",
        name: "Mint",
        price: 10,
        category: 'Herbs',
        id: 5
    }]

//show all items on home page-index
function showItems() {
    const GardenCategory = document.getElementById('Garden-vegetables');
    const LettuceCategory = document.getElementById('Lettuce');
    const HerbsCategory = document.getElementById('Herbs');
    const MushroomsCategory = document.getElementById('Mushrooms');
    var shopping =  sessionStorage.getItem('myArray');
    console.log(ShoppingList)
    if(shopping){
        ShoppingList =  JSON.parse(shopping);
    }

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.category === 'Garden vegetables') {
            createCard(GardenCategory, items[i]);
        } else if (item.category === 'Lettuce') {
            createCard(LettuceCategory, items[i]);
        } else if (item.category === 'Herbs') {
            createCard(HerbsCategory, items[i])
        } else if (item.category === 'Mushrooms') {
            createCard(MushroomsCategory, items[i])
        }
    }
}

function createCard(container, item) {
    const containerDiv = document.createElement('div');
    const image = document.createElement('img');
    const title = document.createElement('h2');
    const price = document.createElement('h3');
    const btn_addItem = document.createElement('button');
    const input= document.createElement('input');
    containerDiv.classList.add('card');
    image.classList.add('card-image');
    title.classList.add('card-title');
    price.classList.add('card-price');
    btn_addItem.classList.add('card-btn');
    image.src = item.image;
    title.innerText = item.name;
    price.innerText = "Price: " + item.price + "₪ per kg";
    btn_addItem.innerText = 'Add To Cart';
    input.innerText = 'Quantity';
    input.placeholder=1;

    btn_addItem.onclick = () => {
         addToShoppingList(item,input.value);
    };


   containerDiv.appendChild(image);
    containerDiv.appendChild(title);
    containerDiv.appendChild(price);
    containerDiv.appendChild(input);
    containerDiv.appendChild(btn_addItem);

    container.appendChild(containerDiv);
}


function addToShoppingList(item,quantity){
        console.log(item)
   ShoppingList.push({name:item.name,
                        price:isNaN(parseFloat(quantity))?item.price:item.price*parseFloat(quantity)})//checks if the quantity is a number by using an inplace if and if it is multiplies it by quantity if not gives the price of 1 kilo
    console.log(ShoppingList,quantity)
    sessionStorage.setItem('myArray', JSON.stringify(ShoppingList));
}

showItems();

function createCartItem(container, item) {
    const containerTR = document.createElement('tr');
    const title = document.createElement('td');
    const price = document.createElement('td');

    containerTR.classList.add('cart-item');
    title.innerText = item.name;
    price.innerText = item.price + "₪";

    containerTR.appendChild(title);
    containerTR.appendChild(price);
    container.appendChild(containerTR);
    console.log(container)
}





//add rows in cart table Of the choosen Items
function createShoppingListCart() {
    ShoppingList=  sessionStorage.getItem('myArray');
    ShoppingList=  JSON.parse(ShoppingList);
    const cart = document.getElementById('shopping-cart');
    let finalPrice = 0;
    const totalContainer = document.getElementById('total-price');

    console.log(ShoppingList)
        for (let i = 0; i < ShoppingList.length; i++) {
            console.log(ShoppingList[i])
            createCartItem(cart, ShoppingList[i], i);
            finalPrice += ShoppingList[i].price;
        }

        console.log(finalPrice)
        totalContainer.innerText = "Total price: " + finalPrice + "₪";

}

function clearShoppingList(){
    sessionStorage.clear();
}
