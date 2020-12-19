/* Récupération de l'ID product , ajout dans l'URL */

const usp = new URLSearchParams(document.location.search);
const id = usp.get('id');
const api = `http://localhost:3000/api/cameras/${id}`;

/* Function getProduct qui permet d'excecuter la request */
/* Les promesses fetch et response.json() sont AWAIT pour attendre
la résolution de la promesse */

async function getProduct() {

  const requestProduct = new Request(api);
  const response = await fetch(requestProduct);
  const product = await response.json();
  cardProduct(product);
  console.log(product)
}

getProduct();

/* Fonction pour afficher les options (Objectifs disponibles) */

function getLenses(lenses) {
  let options = '';
  lenses.forEach(lense => {
    options += `<option value="${lense}">${lense}</option>`;
  });
  return options;
};

/* Function qui permet d'afficher la caméra correspondante à l'ID */

function cardProduct(product) {
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

  /* au clique sur Ajouter au panier, l'article va dans le 
  localStorage avec une alerte pour prevenir l'utilisateur */

  buttonProduct = document.getElementById('productBtn');
  buttonProduct.addEventListener('click', () => {
    const storageCameras = localStorage.getItem('basketCameras') ? JSON.parse(localStorage.getItem('basketCameras')) : [];
    storageCameras.push(product._id)
    alert('Ajouté au panier')
    localStorage.setItem('basketCameras', JSON.stringify(storageCameras));
  })
}