const api = "http://localhost:3000/api/cameras";

async function getCameras() { 

  const myInit = {
    method: 'GET',
  };
  const myRequest = new Request(api, myInit);

  try {
    const response = await fetch(myRequest);
    const cameras = await response.json();
    console.log('cameras', cameras);
    camerasDisplay(cameras);
  }
  catch (error) {
    console.log('error', error)
  }
}

getCameras()

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
