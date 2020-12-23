// Récupération du produit et affichage sur la page avec l'URL de l'id du produit //

function getProduct() {
  const usp = new URLSearchParams(document.location.search);
  const id = usp.get('id');
  const url = `/${id}`;
  ajax({ url, method: 'GET', status: 200, data: null }).then(result => {
    const product = JSON.parse(result);
    const cardProd = document.getElementById('cardProduct');
    cardProd.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${product.imageUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">${(product.price / 100).toFixed(2)} EUR</p>
            <select name="cameras" id="cameras-select">
                <option value="">Choisissez votre objectif</option>
                ${getLenses(product.lenses)}
            </select>
            <button id="productBtn" class="btn btn-primary btn-product">Ajouter au panier</button>  
          </div>
        </div>
        `;

    /* ajouter au panier */

    buttonProduct = document.getElementById('productBtn');
    buttonProduct.addEventListener('click', () => {
      addProduct(product._id);
    })
  })
}

getProduct();

function getLenses(lenses) {
  let options = '';
  lenses.forEach(lense => {
    options += `<option value="${lense}">${lense}</option>`;
  });
  return options;
  
};


