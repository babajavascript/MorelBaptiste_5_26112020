const api = 'http://localhost:3000/api/cameras/';

/*  Récupération ( GET ITEM ) du localStorage ( clé : basketCameras) */

function getCameraIds() {
    return JSON.parse(localStorage.getItem("basketCameras")) || [];
}

/* Function getCameraDetails qui permet d'excecuter la request */
/* Les promesses fetch et response.json() sont AWAIT pour attendre
la résolution de la promesse */

async function getCameraDetails(cameraId) {
    const requestProduct = new Request(api + cameraId);

    const response = await fetch(requestProduct,);
    const product = await response.json();

    return product
}

/* Function affichage des elements dans le panier || panier vide */

async function displayBasket() {
    let cameraIds = getCameraIds()
    const basket = document.getElementById("panier");

    if (cameraIds.length === 0) {
        basket.innerHTML = `<p>Votre panier est vide</p>`
    } else {
        /* On crée un tableau vide qui va contenir toutes les promesses en attente */
        const promises = [];

        /* On itere sur chaque Id de camera */
        cameraIds.forEach(cameraId => {
            /* On ajoute au tableau des promesses la requete lié au camera id*/
            promises.push(getCameraDetails(cameraId))
        })

        /* On attend toutes les promesses qui sont lancées */
        const allCameraDetails = await Promise.all(promises);

        /* On ajoute les item au panier en parcourant AllCameraDetails qui contient les promesses*/

        const basketTable = document.getElementById("basketTable");
        console.log('allCameraDetails', allCameraDetails)
        allCameraDetails.forEach((cameraDetails, index) => {
            basketTable.innerHTML += `
            <tr>
                <td><img id="imageProduct" src="${cameraDetails.imageUrl}"></td>
                <td id="descriptionProduct">${cameraDetails.name}</td>
                <td id="priceProduct">${(cameraDetails.price / 100).toFixed(2)}</td>
                <td><button id="deleteButton-${index}">Supprimer</button></td>
            </td>
            </tr>
            `})
        /* au clique sur supprimer ( index ) on supprime l'élément du tableau dans le panier */

        allCameraDetails.forEach((cameraDetails, index) => {
            const basketTable = document.getElementById("basketTable");
            buttonProduct = document.getElementById(`deleteButton-${index}`);
            buttonProduct.addEventListener('click', () => {
                const storageCameras = JSON.parse(localStorage.getItem('basketCameras'));
                const indexToDelete = storageCameras.indexOf(cameraDetails._id);
                storageCameras.splice(indexToDelete, 1);
                localStorage.setItem('basketCameras', JSON.stringify(storageCameras));
                basketTable.innerHTML = ``;
                displayBasket();

            })
        })

        /* Utilisation de reduce pour calculer le total */
        let total = (allCameraDetails.reduce((accumulateur, camera) => { return accumulateur + camera.price }, 0) / 100).toFixed(2);
        console.log('total', total);
        let totalPrice = document.getElementById('totalPrice');
        totalPrice.innerHTML= `<p>Prix total : ${total}</p>`

        /* à la validation du formulaire on crée la commande */
        const form = document.querySelector('.needs-validation')
        form.addEventListener('submit', async function (event) {
            event.preventDefault()
            event.stopPropagation()
            cameraIds = getCameraIds()
            const contact = {
                email: document.getElementById("email").value,
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                city: document.getElementById("city").value,
                address: document.getElementById("adress").value,
                
            }
            /* si il n'y a rien dans le panier = ne rien faire
            si il y a qq chose dans le panier = clear local storage et redirection
            si le formulaire n'est pas rempli on passe dans le ELSE et 
            le message alert s'affiche */
            
            const order = await createOrder(contact, cameraIds)
            form.classList.add('was-validated');
            if (order !== null && contact.email.length !== 0) {
                localStorage.clear();
                location.assign(`confirmation.html?id=${order.orderId}`)
            }
            else {
                alert('Merci de remplir le formulaire')
            }
        })
    }
}
displayBasket();


/* request async POST pour envoyer les information du body au serveur 
et recevoir l'ORDER ID */
async function createOrder(contact, products) {
    const body = {
        contact,
        products,
    }

    const requestCreateOrder = new Request(api + 'order');
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
}
