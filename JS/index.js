// Request pour afficher toutes les caméras dans l'index // 

function displayAllCameras() {
  ajax({ url: '/', method: 'GET', status: 200, data: null }).then(result => {
    let cameraList = document.getElementById('cameraList');
    JSON.parse(result).forEach((camera) => {
      cameraList.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="${camera.imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${camera.name}</h5>
          <p class="card-text">${camera.description}</p>
          <p class="card-text">${(camera.price / 100).toFixed(2)} EUR</p>
          <a href="product.html?id=${camera._id}" class="btn btn-primary">Détails</a>
        </div>
      </div>
      `;
    });
  })
    .catch(error => {
      alert(error);
    })
}
displayAllCameras();