import { getUsername } from "../../utils/storage.js";
import { onLogout } from "../../logout.js";

export default function createMenu() {
    const { pathname } = document.location;

    const container = document.querySelector(".navbar");

    const username = getUsername();

    let authLink = `<a class="nav-link" href="login.html">Login</a>`;

    if (username) {
        authLink = `<li class="nav-item"><a class="nav-link" href="add.html">Add Product</a></li>
                    <li class="nav-link">Signed in as: ${username}</li>
                    <li class="nav-item"><button class="btn btn-primary" id="logout">Logout</button></li>`;
    }

    container.innerHTML = `<div class="container-fluid">
                                <a class="navbar-brand" href="/index.html">N(ot)IKE</a>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item">
                                            <a class="nav-link" href="index.html">Home</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="products.html">Products</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="cart.html">Cart</a>
                                        </li>
                                            ${authLink}
                                        </li>
                                    </ul>
                                </div>
                            </div>`;
    const logoutButton = document.querySelector("button#logout");

    if (logoutButton) {
        logoutButton.addEventListener("click", onLogout);
    }
}