

let ShoppingList = [];
var shopping =  sessionStorage.getItem('myArray');
console.log(ShoppingList)
if(shopping){
    ShoppingList =  JSON.parse(shopping);
}




try{
    let a=document.getElementsByClassName('button');

for (let i=0;i<a.length;i++)
    a[i].addEventListener("click", function(e) {
        let pec=a[i].parentElement.children;
        let item = {
            "name":pec[1].innerHTML,
            "price":pec[3].innerHTML.split('₪')[0]
        }
        addToShoppingList(item,pec[5].value);

});
}
catch (e)
{

}

try
{document.getElementById('mycart').addEventListener("click",function(e) {
    e.preventDefault();
    var element=document.getElementById('mycart');
    var urlString = element.href;
    var newURL = urlString+ "?cart="+ JSON.stringify(ShoppingList);
    console.log(newURL);
    window.open(newURL, "_self");
});}
catch (e)
{

}


try{
   document.getElementById('confirmation').addEventListener("click",function(e) {
        e.preventDefault();
        var element=document.getElementById('confirmation');
        var elements=document.getElementsByClassName('input_customer');
        console.log(elements[2].innerHTML);
        var urlString = element.href;
        var newURL = urlString+ "?cart="+ JSON.stringify(ShoppingList)+"&fName="+ elements[0].value+"&lName="+ elements[1].value+"&email="+ elements[2].value;

        clearShoppingList();
        window.open(newURL, "_self");

});
}
catch (e)
{

}


// function showItems() {
//     const GardenCategory = document.getElementById('Garden-vegetables');
//     const LettuceCategory = document.getElementById('Lettuce');
//     const HerbsCategory = document.getElementById('Herbs');
//     const MushroomsCategory = document.getElementById('Mushrooms');
//     var shopping =  sessionStorage.getItem('myArray');
//     console.log(ShoppingList)
//     if(shopping){
//         ShoppingList =  JSON.parse(shopping);
//     }
//
//     for (let i = 0; i < items.length; i++) {
//         const item = items[i];
//         if (item.category === 'Garden vegetables') {
//             createCard(GardenCategory, items[i]);
//         } else if (item.category === 'Lettuce') {
//             createCard(LettuceCategory, items[i]);
//         } else if (item.category === 'Herbs') {
//             createCard(HerbsCategory, items[i])
//         } else if (item.category === 'Mushrooms') {
//             createCard(MushroomsCategory, items[i])
//         }
//     }
// }

// function createCard(container, item) {
//     const containerDiv = document.createElement('div');
//     const image = document.createElement('img');
//     const title = document.createElement('h2');
//     const price = document.createElement('h3');
//     const btn_addItem = document.createElement('button');
//     const input= document.createElement('input');
//     containerDiv.classList.add('card');
//     image.classList.add('card-image');
//     title.classList.add('card-title');
//     price.classList.add('card-price');
//     btn_addItem.classList.add('card-btn');
//     image.src = item.image;
//     title.innerText = item.name;
//     price.innerText = "Price: " + item.price + "₪ per kg";
//     btn_addItem.innerText = 'Add To Cart';
//     input.innerText = 'Quantity';
//     input.placeholder=1;
//
//     btn_addItem.onclick = () => {
//          addToShoppingList(item,input.value);
//     };
//
//
//    containerDiv.appendChild(image);
//     containerDiv.appendChild(title);
//     containerDiv.appendChild(price);
//     containerDiv.appendChild(input);
//     containerDiv.appendChild(btn_addItem);
//
//     container.appendChild(containerDiv);
// }
function toFixed(value, precision) {
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
}

function addToShoppingList(item,quantity){
    console.log(item)
   ShoppingList.push({name:item.name,qty:quantity,
                        price:toFixed(isNaN(parseFloat(quantity))?item.price:item.price*parseFloat(quantity),2)})//checks if the quantity is a number by using an inplace if and if it is multiplies it by quantity if not gives the price of 1 kilo
    console.log(ShoppingList,quantity)
    sessionStorage.setItem('myArray', JSON.stringify(ShoppingList));
}

// showItems();

// function createCartItem(container, item) {
//     const containerTR = document.createElement('tr');
//     const title = document.createElement('td');
//     const price = document.createElement('td');
//
//     containerTR.classList.add('cart-item');
//     title.innerText = item.name;
//     price.innerText = item.price + "₪";
//
//     containerTR.appendChild(title);
//     containerTR.appendChild(price);
//     container.appendChild(containerTR);
//     console.log(container)
// }





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


