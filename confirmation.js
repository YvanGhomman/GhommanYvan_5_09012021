const confirm = document.getElementById("confirmation");

//récuperation contact du client et id confirmation du serveur
let confirmationCommande = JSON.parse(localStorage.getItem("confirm"));
console.log(confirmationCommande);

//récupération id confirmation du serveur
let orderNumber = confirmationCommande.idConfirmation;

//récuperation coordonnées client
let customerFirstName = confirmationCommande.contact.firstName;
let customerLastName = confirmationCommande.contact.lastName;
let customerCity = confirmationCommande.contact.city;

//récupération prix total dans localStorage
let totalPrice = localStorage.getItem("TotalPrice");
console.log(totalPrice);

displayConfirmation();

//affichage texte
function displayConfirmation(){
    confirm.innerHTML = `<div>
        <h1 class="text-center col-10 offset-1">Merci ${customerFirstName} ${customerLastName} pour votre achat !</h1>
        <p class="text-center col-10 offset-1">Votre commande est la n°<span class="bold">${orderNumber}</span> et son montant est de <span class="bold">${totalPrice}€</span></p>
        <p class="text-center col-10 offset-1">Votre colis est en cours de préparation et arrivera à ${customerCity} au plus vite !</p>
        <h2><i class="text-center col-10 offset-1 far fa-check-circle check"></i></h2>
    </div> `
}
