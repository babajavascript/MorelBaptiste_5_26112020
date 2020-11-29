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
                <a href="Product.html?id=${camera._id}" class="btn btn-primary">Détails</a>
              </div>
            </div>
            `;
        });
    }
}
request.open("GET", "http://localhost:3000/api/cameras");
request.send();