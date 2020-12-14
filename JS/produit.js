const usp = new URLSearchParams(document.location.search);
const id = usp.get('id');
const api = `http://localhost:3000/api/cameras/${id}`;

async function getProduct() {

  const requestProduct = new Request(api);
  try {
    const response = await fetch(requestProduct);
    const product = await response.json();
    console.log('product', product)
    cardProduct(product);
  }
  catch (error) {
    console.log('error', error);
  }
}

getProduct();

function cardProduct(product) {
  product.forEach(cardProduct)
};

function getLenses(lenses) {
  let options = '';
  lenses.forEach(lense => {
    options += `<option value="${lense}">${lense}</option>`;
  });
  return options;
};

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


  buttonProduct = document.getElementById('productBtn');
  buttonProduct.addEventListener('click', () => {
    const storageCameras = JSON.parse(localStorage.getItem('basketCameras'));
    if (storageCameras) { // 
      let cameraExistsInBasket = false;
      storageCameras.forEach(cameraIdInStorage => {
        if (cameraIdInStorage === product._id) {
          cameraExistsInBasket = true;
        }
      })
      if (cameraExistsInBasket) {
        alert('Article déja présent dans le panier')
        console.log(JSON.stringify([product._id]));
      } else { //
        alert('ajouté au panier')
        storageCameras.push(product._id)
        console.log(JSON.stringify([product._id]));
        localStorage.setItem('basketCameras', JSON.stringify(storageCameras));
      }
    } else {
      alert('ajouté au panier')
      console.log(JSON.stringify([product._id]));
      localStorage.setItem('basketCameras', JSON.stringify([product._id]));
    }
  })
}