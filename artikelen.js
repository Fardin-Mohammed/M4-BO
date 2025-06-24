

const buttons = document.getElementsByClassName("artikelen__div--button");
const cart = document.getElementById("js--cart");
const background = document.getElementsByClassName("modal__background")[0];
const modal = document.getElementById("js--modal");
const image = document.getElementsByClassName("modal__image")[0];
const name = document.getElementsByClassName("modal__name")[0];
const price = document.getElementsByClassName("modal__price")[0];
const addButtons = document.getElementsByClassName("modal__button");
const exit = document.getElementsByClassName("modal__exit")[0];
const filters = document.getElementsByClassName("filters__item--checkbox");




let index = 1;

let addProduct = null;

for(let i = 0; i < buttons.length; i++){
  buttons[i].onclick = function(){
    console.log(i);
    fetchData(i);
    // cart.style.display = "flex";
    // cart.innerText = index++;
  }
}

const fetchData = async (id) => {
    const response = await fetch("./data.json");
    const data = await response.json();
    console.log(data.products[id]);
    showModal(data.products[id]);
}

const showModal = (data) => {
    background.style.display = "flex";
    addProduct = data;
    exit.onclick = () => {
        background.style.display = "none";
    }
    image.setAttribute("src", data.image);
    name.innerText = data.name;
    price.innerText = "€" + data.prijs;
}

for(let i = 0; i < addButtons.length; i++){
    addButtons[i].onclick = () => {
        cart.style.display = "flex";
        cart.innerText = index++;
        if (addProduct) {
            localstorage(addProduct);
        } else {
            console.error("addProduct is niet gevuld!");
        }
    }
}


const localstorage = (product) => {
    const getitem = localStorage.getItem(product.name);
    if(getitem == null){
        localStorage.setItem(product.name, JSON.stringify({ ...product, amount: 1 }));
    } else {
        let parsed = JSON.parse(getitem);
        parsed.amount++;
        localStorage.setItem(product.name, JSON.stringify(parsed));
    }
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



window.onload = () => {
    updateCartBadge();
}

for(let i = 0; i < filters.length; i++){
    filters[i].onchange = function(){
        let filter = document.getElementsByClassName("filters__item--text")[i].innerText;
        if(filters[i].checked == false){
            for(let i = 0; i < buttons.length; i++){
                console.log(filter.toLowerCase().replace(' ', ''))
                if(buttons[i].classList.contains(filter.toLowerCase().replace(' ', ''))){
                    buttons[i].style.display = "none";
                }
            }
        }
        else{
            for(let i = 0; i < buttons.length; i++){
                if(buttons[i].classList.contains(filter.toLowerCase().replace(' ', ''))){
                    buttons[i].style.display = "block";
                }
            }
        }
    }
}

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}let slideIndex = 0;
showSlides();