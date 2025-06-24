const productsDiv = document.getElementsByClassName("winkelwagen__producten--div")[0];
const geenProductenText = document.querySelector(".geen-producten__text");

if(localStorage.length > 0){
    geenProductenText.style.display = "none"; 
}

for(let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    let stored = JSON.parse(localStorage.getItem(key));

    let item = document.createElement("article");
    item.classList.add("winkelwagen__product");

    let image = document.createElement("img");
    image.classList.add("winkelwagen__product--image");
    image.setAttribute("src", stored.image);

    let name = document.createElement("h3");
    name.innerText = stored.name;

    let price = document.createElement("p");
    price.innerText = `Prijs: €${stored.prijs}`;

    let quantity = document.createElement("p");
quantity.innerText = `Aantal: ${stored.amount}`;

let removeBtn = document.createElement("button");
removeBtn.innerText = "Verwijderen";
removeBtn.onclick = () => {
    localStorage.removeItem(stored.name);
    item.remove();
    updateCartBadge();

    if (localStorage.length === 0) {
        geenProductenText.style.display = "block";
    }
};

item.appendChild(image);
item.appendChild(name);
item.appendChild(price);
item.appendChild(quantity);
item.appendChild(removeBtn); 

productsDiv.appendChild(item);

}


const updateCartBadge = () => {
    let total = 0;
    for(let i = 0; i < localStorage.length; i++){
        let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        total += item.amount;
    }
    const cart = document.getElementById("js--cart"); // dit moet je rode cirkel zijn
    if (cart) {
        cart.innerText = total;
        cart.style.display = total > 0 ? "flex" : "none";
    }
}


document.getElementById("clear-cart").onclick = () => {
    localStorage.clear();
    productsDiv.innerHTML = "";
    geenProductenText.style.display = "block";
    updateCartBadge();
};



window.onload = () => {
    updateCartBadge();
}



const subtotalElement = document.getElementById("js--subtotal");
const eindtotaalElement = document.getElementById("js--eindtotaal");

const updateTotaalPrijs = () => {
    let totaal = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let stored = JSON.parse(localStorage.getItem(localStorage.key(i)));
        totaal += stored.prijs * stored.amount;
    }

    const totaalFormatted = `€ ${totaal.toFixed(2).replace('.', ',')}`;
    subtotalElement.innerText = totaalFormatted;
    eindtotaalElement.innerText = totaalFormatted;
};

updateTotaalPrijs();

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}let slideIndex = 0;
showSlides();