const displayOrderId = document.getElementById('orderId')
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log('id', id);
displayOrderId.innerHTML = `Votre commande s'est bien passé, Votre numéro de commande est le :</br> <span>${id}</span> `