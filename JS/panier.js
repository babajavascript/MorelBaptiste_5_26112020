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
        
        const form = document.querySelector('.needs-validation')
        console.log(form)

        form.addEventListener('submit', async function (event) {
            event.preventDefault()
            event.stopPropagation()

            const contact = {
                email: document.getElementById("email").value,
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                city: document.getElementById("city").value,
                address: document.getElementById("adress").value,
            }


            console.log('contact', contact)
            const order = await createOrder(contact, cameraIds)
            if (order !== null) {
                location.replace('confirmation.html')
            } else {
                /* afficher une erreur */
            }
            form.classList.add('was-validated');
        })
    }
}

displayBasket();


/* MODELE DE DONNEES
{
    "contact": {
        "firstName": "baptiste",
        "lastName": "morel",
        "address": "133 rue de Paris",
        "city": "lille",
        "email": "test@gmail.com"
    },
    "products": ["5be1ed3f1c9d44000030b061"]
}
*/


async function createOrder(contact, products) {
    const body = {
        contact,
        products,
    }

    const requestCreateOrder = new Request(api + 'order');

    try {
        const response = await fetch(requestCreateOrder, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body),
        });

        const order = await response.json();
        console.log('order', order);
        return order;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}