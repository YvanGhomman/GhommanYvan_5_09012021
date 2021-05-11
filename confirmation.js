const confirm = document.getElementById("confirmation");


//let confirmationCommande = JSON.parse(localStorage.getItem("confirm"));
let confirmContact = JSON.parse(localStorage.getItem("contact"));

//console.log(confirmationCommande);
console.log(confirmContact);

//let numeroCommande = confirmationCommande.orderId;
let customerFirstName = confirmContact.firstName;
let customerLastName = confirmContact.lastName;
let totalPrice = localStorage.getItem("TotalPrice");
console.log(totalPrice);

displayConfirmation();

function displayConfirmation(){
    confirm.innerHTML = `<div>
        <h2 class="center">Prix total : ${totalPrice}€</h2>
        <p class="center">Merci ${customerFirstName} ${customerLastName}</p>
    </div> ` //de votre commande n°${numeroCommande}`

}
