// Si le panier est vide ( if ) j'affiche panier vide, sinon (else) : 
// Récupération de l'id et de la quantity => request url ID du produit, 
// affichage des produits dans le panier ( name price etc ... ) et button supprimer 
// calcul du prix Total

function displayBasket() {
    let basketItems = getBasket();
    const basket = document.getElementById("panier");
    let totalPrice = document.getElementById('totalPrice');
    totalPrice.innerHTML = ``;
    if (basketItems.length === 0) {
        basket.innerHTML = `<p id="emptyBasketP">Votre panier est vide</p>`;
    } else {
        const basketTable = document.getElementById("basketTable");
        let total = 0;
        basketItems.forEach((item) => {
            const cameraId = item.id;
            const quantity = item.quantity;
            ajax({ url: `/${cameraId}`, method: 'GET', status: 200, data: null })
                .then((result) => {
                    const cameraDetails = JSON.parse(result);
                    basketTable.innerHTML += `
                <tr>
                    <td><img id="imageProduct" src="${cameraDetails.imageUrl}"></td>
                    <td id="descriptionProduct">${cameraDetails.name}</td>
                    <td id="priceProduct">${(cameraDetails.price / 100).toFixed(2)} EUR</td>
                    <td id="quantity">${quantity}</td>
                </td>
                </tr>`
                    let btn = document.getElementById('deleteBasket')
                    btn.addEventListener('click', () => {
                        deleteBasket();
                    })
                    total += cameraDetails.price * quantity;
                    totalPrice.innerHTML = `<p id="totalP">Prix total : ${(total / 100).toFixed(2)} EUR</p>`;
                })
        })

        // Gestion du formulaire ( validation des données USER avant commande )
        // SI ok => storage Clear et redirection va la page de confirmation , 
        // sinon alert info pour user 

        function validForm() {
            const form = document.querySelector('.needs-validation');
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                event.stopPropagation();
                cameraIds = getBasket().map(item => { return item.id });
                let formIsInvalid = "";
                let firstName = document.getElementById("firstName").value;
                let lastName = document.getElementById("lastName").value;
                let address = document.getElementById("adress").value;
                let city = document.getElementById("city").value;
                let email = document.getElementById("email").value;

                if (/[0-9]/.test(firstName) || /[§!@#$%^&*().?":{}|<>]/.test(firstName) || !firstName)
                    formIsInvalid += "Votre prénom est invalide \n";
                if (/[0-9]/.test(lastName) || /[§!@#$%^&*().?":{}|<>]/.test(lastName) || !lastName)
                    formIsInvalid += "Votre nom de famille est invalide \n";
                if (!address)
                    formIsInvalid += "Votre adresse est invalide \n";
                if (/[0-9]/.test(city) || !city)
                    formIsInvalid += "Votre ville est invalide \n";
                    if (!/[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,10}/.test(email) || !email)
                    formIsInvalid += "Votre mail est invalide \n";
                if (formIsInvalid)
                    alert("Erreur : \n" + formIsInvalid);
                else {
                    let contact = {
                        email: document.getElementById('email').value,
                        firstName: document.getElementById('firstName').value,
                        lastName: document.getElementById('lastName').value,
                        address: document.getElementById('adress').value,
                        city: document.getElementById('city').value,
                    }


                    createOrder(contact, cameraIds, (order, error) => {
                        if (error) {
                            alert('Merci de remplir le formulaire');


                        } else {
                            localStorage.clear();
                            location.assign(`confirmation.html?id=${order.orderId}`)
                        }
                        form.classList.add('was-validated');
                    })
                }
            })
        }
        validForm();
    }
}
displayBasket();
// Request AJAX post pour envoyer les infos au serveur 
function createOrder(contact, products, callback) {
    const data = {
        contact,
        products,
    }
    ajax({ url: '/order', method: 'POST', status: 201, data }).then(result => {
        const order = JSON.parse(result);
        console.log('order', order);
        callback(order, null);
    })
        .catch(error => {
            console.log('error', error);
            callback(null, error);
        })
}