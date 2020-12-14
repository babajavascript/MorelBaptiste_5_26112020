const api = 'http://localhost:3000/api/cameras/';


function getCameraIds() {
    return JSON.parse(localStorage.getItem("basketCameras")) || [];
}

async function getCameraDetails(cameraId) {
    const requestProduct = new Request(api + cameraId);

    try {
        const response = await fetch(requestProduct,);
        const product = await response.json();

        return product
    }
    catch (error) {
        console.log('error', error)
        return null;
    }
}

async function displayBasket() {
    const cameraIds = getCameraIds();

    /* SI cameraIds.length === 0 => afficher panier vide */
    const basket = document.getElementById("panier");

    if (cameraIds.length === 0) {
        basket.innerHTML = `<p>Votre panier est vide</p>`
    } else {
        const promises = []; /* On crée un tableau vide qui va contenir toutes les promesses en attente */

        cameraIds.forEach(cameraId => { /* On itere sur chaque Id de camera */
            promises.push(getCameraDetails(cameraId)) /* On ajoute au tableau des promesses la requete lié au camera id*/
        })

        const allCameraDetails = await Promise.all(promises); /* On attend toutes les promesses qui sont lancées */

        const basketTable = document.getElementById("basketTable");
        console.log('allCameraDetails', allCameraDetails)
        allCameraDetails.forEach((cameraDetails, index) => {
            basketTable.innerHTML += `
            <tr>
                <td><img id="imageProduct" src="${cameraDetails.imageUrl}"></td>
                <td id="descriptionProduct">${cameraDetails.name}</td>
                <td id="priceProduct">${(cameraDetails.price / 100).toFixed(2)}</td>
                <td><button id="button-${index}">Supprimer</button></td>
            </td>
            </tr>
            `})
        allCameraDetails.forEach((cameraDetails, index) => {
            const basketTable = document.getElementById("basketTable");
            buttonProduct = document.getElementById(`button-${index}`);
            buttonProduct.addEventListener('click', () => {
                const storageCameras = JSON.parse(localStorage.getItem('basketCameras'));
                const newStorageCameras = storageCameras.filter(currentCameraId => { return currentCameraId !== cameraDetails._id })
                localStorage.setItem('basketCameras', JSON.stringify(newStorageCameras));

                basketTable.innerHTML = ``;
                displayBasket();
            })
        })

    };
}

displayBasket();

function orderFunk() {
    const cameraIds = getCameraIds();
    buttonOrder = document.getElementById('buyBtn')
    buttonOrder.addEventListener('click', () => {
        if (cameraIds.length >= 1)
            console.log('Commande possible')

        else if (cameraIds.length === 0) {
            console.log('Rien à commander')
        }
    })
}

orderFunk();





// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()