// récupération des items du localStorage si il y en a . sinon créer un tableau vide //

function getBasket() {
    return (localStorage.getItem("basketCameras") != null) ? JSON.parse(localStorage.getItem("basketCameras")) : [];
}


// vider le panier

function deleteBasket() {
    localStorage.clear();
    location.reload();
}

// si le produit n'est pas présent, on le push dans le panier, sinon on iterre pour augmenter la quantity //

function addProduct(id) {
    let basket = getBasket();
    let product = basket.find(product => product.id == id);

    if (product == undefined) {
        basket.push({ id: id, quantity: 1 });
        alert('Ajouté au panier');
    }
    else {
        product.quantity++;
        alert('Ajouté au panier');
    }
    saveBasket(basket);
}

// setItem pour sauvegarder les items récupérés par getItem //

function saveBasket(basket) {
    localStorage.setItem("basketCameras", JSON.stringify(basket));
}

