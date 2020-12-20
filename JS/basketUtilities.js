function getBasket() {
    return (localStorage.getItem("basketCameras") != null) ? JSON.parse(localStorage.getItem("basketCameras")) : [];
}

function deleteProduct(id) {
    let basket = getBasket();
    let product = basket.find(product => product.id == id);

    if (product.quantity == 1) {
        basket = basket.filter(product => product.id != id);
    }
    else {
        product.quantity--;
    }
    saveBasket(basket);
}

function addProduct(id) {
    let basket = getBasket();
    let product = basket.find(product => product.id == id);

    if (product == undefined) {
        basket.push({ id: id, quantity: 1 });
        alert('Ajouté au panier')
    }
    else {
        product.quantity++;
        alert('Ajouté au panier')
    }
    saveBasket(basket);
}

function saveBasket(basket) {
    localStorage.setItem("basketCameras", JSON.stringify(basket));
}

