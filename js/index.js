import { displayMessage } from "./ui/displayMessage.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const herourl = "http://localhost:1337/home";

const postsContainer = document.querySelector(".heroimg");

async function getPosts() {

    try {
        const response = await fetch(herourl);
        const home = await response.json();
        createHtml(home);
    }
    catch (error) {
        console.log(error);
        displayMessage("error", error, ".heroimg");
    }
};

getPosts();

function createHtml(home) {
    postsContainer.innerHTML = `
    <img src="http://localhost:1337${home.hero_banner.url}" class="img-fluid" alt="${home.hero_banner_alt_text}">`;
};

createMenu();

const url = "http://localhost:1337/products/";

async function getProducts() {
    try {
        const response = await fetch(url);
        const products = await response.json();
        featuredProducts(products);
    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".row");
    }
}

getProducts();

function featuredProducts(productsToRender) {
    const productContainer = document.querySelector(".row");
    productContainer.innerHTML = "";
    productsToRender.forEach(function (product) {
        if (product.featured === true) {
            productContainer.innerHTML += `<div class="col">
            <div class="featured-card" style="width: 18rem;">
                <a href="details.html?id=${product.id}">
                    <img src="http://localhost:1337${product.image.url}" class="featured-card-img" alt="${product.image.alternativeText}">
                    <div class="featured-card-body">
                        <h5 class="featured-card-title">${product.title}</h5>
                        <p class="featuredcard-tetx">${product.price}$</p>
                    </div>
                </a>
            </div>
        </div>`;
        }
    });
}

var nav = document.querySelector('nav');

window.addEventListener('scroll', function () {
  if (window.pageYOffset > 100) {
    nav.classList.add('bg-dark', 'shadow');
  } else {
    nav.classList.remove('bg-dark', 'shadow');
  }
});
