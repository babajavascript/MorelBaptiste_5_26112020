
let params = new URLSearchParams(document.location.search);
let id = params.get("id");

let requestProduct = new XMLHttpRequest();
requestProduct.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200 || this.status == 201) {
        let product = JSON.parse(this.responseText);
        let cardProd = document.getElementById('cardProduct');
        cardProd.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${product.imageUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">${(product.price / 100).toFixed(2)} EUR</p>
            <select name="pets" id="pet-select">
                <option value="">Choisissez votre objectif</option>
                <option value="dog">${product.lenses[0]}</option>
                <option value="cat">${product.lenses[1]}</option>
                <option value="cat">${product.lenses[2]}</option>
            </select>
            
                
            <a href="produit.html?id=${product._id}" id="btn" class="btn btn-primary">Ajouter au panier</a>  
          </div>
        </div>
        `;
    }
}


requestProduct.open("GET", `http://localhost:3000/api/cameras/${id}`);
requestProduct.send();