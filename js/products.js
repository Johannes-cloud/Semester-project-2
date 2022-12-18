import { renderProducts } from "./ui/renderProducts.js";
import { searchProducts } from "./ui/searchProducts.js";
import { displayMessage } from "./ui/displayMessage.js";
import createMenu from "./components/common/createMenu.js";

const url = "http://localhost:1337/products/";

async function getProducts() {
    try {
        const response = await fetch(url);
        const products = await response.json();
        renderProducts(products);
        searchProducts(products);
    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".product-container");
    }
}

createMenu();
getProducts();