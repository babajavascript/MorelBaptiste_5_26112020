function displayBasket() {
    let basketItems = getBasket()
    const basket = document.getElementById("panier");

    if (basketItems.length === 0) {
        basket.innerHTML = `<p>Votre panier est vide</p>`
    } else {
        const basketTable = document.getElementById("basketTable");
        let total = 0;
        basketItems.forEach((item, index) => {
            const cameraId = item.id
            const quantity = item.quantity
            ajax({ url: `/cameras/${cameraId}`, method: 'GET', status: 200, data: null })
                .then((result) => {
                    const cameraDetails = JSON.parse(result)
                    basketTable.innerHTML += `
                <tr>
                    <td><img id="imageProduct" src="${cameraDetails.imageUrl}"></td>
                    <td id="descriptionProduct">${cameraDetails.name}</td>
                    <td id="priceProduct">${(cameraDetails.price / 100).toFixed(2)}</td>
                    <td id="quantity">${quantity}</td>
                    <td><button id="deleteButton-${index}">Supprimer</button></td>
                </td>
                </tr>`
                    buttonProduct = document.getElementById(`deleteButton-${index}`);
                    buttonProduct.addEventListener('click', () => {
                        deleteProduct(cameraId);
                        basketTable.innerHTML = ``;
                        displayBasket();
                    })
                    total += cameraDetails.price * quantity
                    let totalPrice = document.getElementById('totalPrice');
                    totalPrice.innerHTML = `<p>Prix total : ${(total / 100).toFixed(2)}</p>`
                });
        })
        
        const form = document.querySelector('.needs-validation')
        form.addEventListener('submit', async function (event) {
            event.preventDefault()
            event.stopPropagation()
            cameraIds = getBasket().map(item => { return item.id })
            const contact = {
                email: document.getElementById("email").value,
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                city: document.getElementById("city").value,
                address: document.getElementById("adress").value,

            }

            createOrder(contact, cameraIds, (order, error) => {
                if (error) {
                    alert('Merci de remplir le formulaire')
                } else {
                    localStorage.clear();
                    location.assign(`confirmation.html?id=${order.orderId}`)
                }
                form.classList.add('was-validated');
            })
        })
    }
}
displayBasket();

function createOrder(contact, products, callback) {
    const data = {
        contact,
        products,
    }

    ajax({ url: '/cameras/order', method: 'POST', status: 201, data })
        .then(result => {
            const order = JSON.parse(result)
            console.log('order', order);
            callback(order, null);
        })
        .catch(error => {
            console.log('error', error)
            callback(null, error)
        })
}