const confirm = document.getElementById("confirmation");


let confirmationCommande = JSON.parse(localStorage.getItem("confirm"));
//let confirmContact = JSON.parse(localStorage.getItem("contact"));

console.log(confirmationCommande);
//console.log(confirmContact);

let orderNumber = confirmationCommande.idConfirmation;
let customerFirstName = confirmationCommande.contact.firstName;
let customerLastName = confirmationCommande.contact.lastName;
let customerCity = confirmationCommande.contact.city;
let totalPrice = localStorage.getItem("TotalPrice");
console.log(totalPrice);

displayConfirmation();

function displayConfirmation(){
    confirm.innerHTML = `<div>
        <h1 class="text-center col-10 offset-1">Merci ${customerFirstName} ${customerLastName} pour votre achat !</h1>
        <p class="text-center col-10 offset-1">Votre commande est la n°<span class="bold">${orderNumber}</span> et son montant est de <span class="bold">${totalPrice}€</span></p>
        <p class="text-center col-10 offset-1">Votre colis est en cours de préparation et arrivera à ${customerCity} au plus vite !</p>
        <h2><i class="text-center col-10 offset-1 far fa-check-circle check"></i></h2>
    </div> `
}
