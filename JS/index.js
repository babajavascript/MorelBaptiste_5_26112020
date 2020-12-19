const api = "http://localhost:3000/api/cameras";

/* Function getCameras qui permet d'excecuter la request */
/* Les promesses fetch et response.json() sont AWAIT pour attendre
la résolution de la promesse */

 async function getCameras() {
  const myInit = {
    method: "GET",
  }
  const camerasRequest = new Request(api, myInit);
  const response =  await fetch(camerasRequest);
  const cameras =  await response.json();
  camerasDisplay(cameras);
  console.table(cameras)
}

getCameras();

/* Boucle forEach sur toutes les caméras de l'api */
/* jusqu'a ce qu'il n'y en est plus */

function camerasDisplay(cameras) {
  cameras.forEach(allCamerasDisplay);
}

/* Function qui permet d'afficher les caméras dans l'index */

function allCamerasDisplay(cameras) {
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