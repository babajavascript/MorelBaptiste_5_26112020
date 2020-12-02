const urlApi = "http://localhost:3000/api/cameras";
let cameras = [];

let request = new XMLHttpRequest;
request.open("GET", urlApi);
request.responseType = 'json';
request.send()

request.onload = function () {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200 || request.status === 201) {
        cameras = request.response;
        console.log(cameras)
        camerasDisplay();
    }
    else {
        alert("error")
    }
}

function camerasDisplay() {
    cameras.forEach(camerasDisplayed);
}
function camerasDisplayed(cameras) {
    let cameraList = document.getElementById('cameraList')
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
