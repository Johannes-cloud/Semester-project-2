export function getExistingFavs() {
    const favs = localStorage.getItem("cart");

    if (favs === null) {
        return [];
    } else {
        return JSON.parse(favs);
    }
}