import { getExistingFavs } from "./utils/favFunctions.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const cartItems = getExistingFavs();
const total = document.querySelector(".total");
const cartContainer = document.querySelector(".row");

if (cartItems.length === 0) {
    cartContainer.innerHTML = "No products added to cart";
}

cartItems.forEach((cartItem) => {
    let cssClass = "fa";

    const doesObjectExist = cartItems.find(function (fav) {

        return parseInt(fav.id) === cartItems.id;
    });

    if (doesObjectExist) {
        cssClass = "far";
    }
    cartContainer.innerHTML +=                                           
    `<div class="col">
        <div class="card" style="width: 18rem;">
            <a href="details.html?id=${cartItem.id}">
                <img src="http://localhost:1337${cartItem.image}" class="card-img-top" alt="${cartItem.alt}">
                <div class="card-body">
                    <h5 class="card-title">${cartItem.name}</h5>
                    <p class="card-tetx">${cartItem.price}$</p>
                </div>
            </a>
            <i class="${cssClass} fa-times" data-id="${cartItem.id}" data-name="${cartItem.name}"></i>
        </div> 
    </div>`;
    const favButtons = document.querySelectorAll(".card i");

    favButtons.forEach((button) => {
        button.addEventListener("click", handleClick);
    });
                                
    function handleClick() {
        this.classList.toggle("fa");
        this.classList.toggle("far");

        const id = this.dataset.id;
        
        const currentFavs = getExistingFavs();

        const productExists = currentFavs.find(function (fav) {
            return fav.id === id;
        });

        if (productExists === undefined) {
            const product = { id: id};
            currentFavs.push(product);
            saveFavs(currentFavs);
        } else {
            const newFavs = currentFavs.filter((fav) => fav.id !== id);
            saveFavs(newFavs);
        }
    }

    function saveFavs(favs) {
        localStorage.setItem("cart", JSON.stringify(favs));
        location.reload()
    }
});

function createTotal(total) {
        let temp = cartItems.map(function(item){
        return parseFloat(item.price);
    });

    var sum = temp.reduce(function(prev, next){
        return prev + next;

    }, 0);
    total.innerHTML = `Price: ${sum}$`;
}
createTotal(total);
