export function renderProducts(productsToRender) {
    const productContainer = document.querySelector(".row");
    productContainer.innerHTML = "";
    productsToRender.forEach(function (product) {
        productContainer.innerHTML += `<div class="col">
                                            <div class="card" style="width: 18rem;">
                                                <a href="details.html?id=${product.id}">
                                                    <img src="http://localhost:1337${product.image.url}" class="card-img-top" alt="${product.image.alternativeText}">
                                                    <div class="card-body">
                                                        <h5 class="card-title">${product.title}</h5>
                                                        <p class="card-tetx">${product.price}$</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>`;
    });
}