import { getExistingFavs } from "./utils/favFunctions.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const productContainer = document.querySelector(".product-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "http://localhost:1337/products/" + id;

async function getDetails() {
    try {
        const response = await fetch(url);
        const products = await response.json();
        createHtml(products);
    }
    catch(error) {
        console.log(error);
    }
}

getDetails();

const favourites = getExistingFavs();

function createHtml(product) {
    let cssClass = "far fa-shopping-cart";

    const doesObjectExist = favourites.find(function (fav) {
        return parseInt(fav.id) === product.id;
    });

    if (doesObjectExist) {
        cssClass = "fa fa-times";
    }
    productContainer.innerHTML = `<div class="product">
                                    <img src="http://localhost:1337${product.image.url}" class="details-img" alt="${product.image.alternativeText}">
                                    <h1>${product.title}</h1>
                                    <p>${product.description}</p>
                                    <p>${product.price}$</p>
                                    <i class="${cssClass}" aria-hidden="true" data-id="${product.id}" data-name="${product.title}" data-price="${product.price}" data-image="${product.image.url}" data-alt="${product.image.alternativeText}"></i>
                                </div>`;

    const favButtons = document.querySelectorAll(".product i");

    favButtons.forEach((button) => {
        button.addEventListener("click", handleClick);
    });

    function handleClick() {
        this.classList.toggle("fa-check");

        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = this.dataset.price;
        const image = this.dataset.image;
        const alt = this.dataset.alt;

        const currentFavs = getExistingFavs();

        const productExists = currentFavs.find(function (fav) {
            return fav.id === id;
        });

        if (productExists === undefined) {
            const product = { id: id, name: name, price: price, image: image, alt: alt };
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
}

createHtml();