product : 

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

        let params = new URLSearchParams(document.location.search);
        let id = params.get("id");

        requestProduct.open("GET", `http://localhost:3000/api/cameras/${id}`);
        requestProduct.send();



    ///Request GET API and display all camera from the array on index page///

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200 || this.status == 201) {
        let cameras = JSON.parse(this.responseText);
        let cameraList = document.getElementById('cameraList');
        cameras.forEach(camera => {
          cameraList.innerHTML += `
                <div class="card" style="width: 18rem;">
                  <img src="${camera.imageUrl}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${camera.name}</h5>
                    <p class="card-text">${camera.description}</p>
                    <p class="card-text">${(camera.price / 100).toFixed(2)} EUR</p>
                    <a href="produit.html?id=${camera._id}" class="btn btn-primary">Détails</a>
                  </div>
                </div>
                `;
        });
      }
    }
    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();




  // new request try ::
  
  const api = "http://localhost:3000/api/cameras";

  // let request = new XMLHttpRequest;
  
  // request.onload = function () { // Ecoute la réponse de la requete
  //   if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
  //       cameras = request.response;
  //       // console.log(cameras);
  //       camerasDisplay();
  //   }
  //   else {
  //       alert("error");
  //   }
  // }
  
  // request.open("GET", api); // Crée une requete
  // request.responseType = 'json'; // Dis que la réponse doit etre du JSON
  // request.send(); // Envoie la requete
  
  
  function getCameras() {
    const myInit = {
      method: 'GET',
    };
  
    const myRequest = new Request(api, myInit);
  
    const response = fetch(myRequest)
     .then(function(response) {
         return response.json();
     })
     .then(cameras => camerasDisplay(cameras))
  }
  
  getCameras()
  
  
  function createPromise() {
    return new Promise((resolve, reject) => {
      if (resolve){
        resolve('ok')
      }
      else{
        reject('not ok')
      }
    })
  }
  
  function usePromise() 
  {
    const promesse /* Promise */ = createPromise()
    promesse.then(message => { console.log(message) } )
    console.log('promesse', promesse)
  }
  
  usePromise()
  
  
  
  function camerasDisplay(cameras) {
      cameras.forEach(camerasDisplayed);
  }
  
  function camerasDisplayed(cameras) {
      let cameraList = document.getElementById('cameraList');
      cameraList.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="${cameras.imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${cameras.name}</h5>
          <p class="card-text">${cameras.description}</p>
          <p class="card-text">${(cameras.price / 100).toFixed(2)} EUR</p>
          <a href="produit.html?id=${cameras._id}" class="btn btn-primary">Détails</a>
        </div>
      </div>
      `;
  };

  // COURS 

  /* scope parente */
const a = 3;
let b = 2;
console.log(b) /* > 2*/
console.log(a) /* > 3*/
{
  /* scope enfant */
  const a = 2; /* redefinition */
  console.log(a) /* > 2*/

  b = 3; /* réassignation */
  console.log(b) /* > 3*/
}
console.log(a) /* > 3*/
console.log(b) /* > 3*/


let counter = 0;

function incrementCounter()
{
  counter++;
}

const obj /*adresse vers un espace mémoire*/ = {
  nom: 'Baptiste',
}

obj.nom = 'Vincent'; //Marche

obj = {
  nom: 'Vincent' //Marche pas
}

const tab = [1,2,3];

tab = [1,2,3,4]; //Marche pas

tab.push(4) //Marche !

const nombre = 3;
nombre++; // nombre = nombre + 1; marche pas

// suite 

const myPromise = new Promise((resolve /* fonction en cas de succes */, reject /* fonction en cas d'erreur */) => {
  fetch(myRequest, (response, error) => {
    if (error) {
      reject('error');
    }
    else {
      reject(response);
    }
  })
});

myPromise.then((message) => {
  console.log(message);
})
  .catch((message) => {
    console.log(message)
  });

  try {
    const numbers = [1, 2, 3];
  
    for (let i = 0; i < 10; i++) {
      if (i == 4) {
        throw new Error('Message');
      }
      console.log('i', i);
    }
    console.log('resultat', a); // Throw une erreur
    console.log('Le code s\'est bien déroulé');
  
  } catch (e) {
    console.log('error!!!', e);
  }
      /* Chainage */
    // fetch(myRequest)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(cameras => {
    //     camerasDisplay(cameras);
    //     console.table(cameras);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })

     /* procédurale */

     // Début innerHTML panier pour afficher product

     buttonProduct = document.getElementById('productBtn');
     buttonProduct.addEventListener('click', () => {
       const basketProductsFromLocalStorage = JSON.parse(localStorage.getItem('basketProducts')); // On récup le localStorage et on le transforme en tableau utilisable
       if (basketProductsFromLocalStorage) { // Check si on a déjà des produits dans le local storage
         let productExistsInBasket = false;
         basketProductsFromLocalStorage.forEach(productId => { // Parcourir les produits du local storage pour verifié que le produit qu'on veut ajouter n'existe pas
           if (productId === product._id) {
             productExistsInBasket = true;
           }
         })
         if (productExistsInBasket) { // s'il existe on balance une alert
             alert('Product Already Exists')
         } else { // on push le product._id dans les product_id du local storage
             basketProductsFromLocalStorage.push(product._id)
             localStorage.setItem('basketProducts', JSON.stringify(basketProductsFromLocalStorage));
         }
       } else { // Si les produits sont pas définis on crée le tableau avec le product._id et on le set dans le local storage
           alert('ajouté au panier')
           console.log(JSON.stringify([product._id]));
           localStorage.setItem('basketProducts', JSON.stringify([product._id]));
       }
     })
 }
 
 //localStorage actuel ['4324343', '4324232, ...]
 
 //localStorage pour compter le nombre de produits [{ id: '32423432', quantity: 1}, { id: '32423432', quantity: 1}]
 
 