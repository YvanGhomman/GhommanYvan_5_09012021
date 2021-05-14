const displayStore = document.getElementById("displayFurnitureStore");
const validation = document.getElementById("validate");
const prixTotalCommande = document.getElementById("totalPriceCart");
const formulaire = document.getElementById("formulaire");





// récuperation données stockées dans le localStorage 
function getBackFurnitures(){
    let furnitureStore = JSON.parse(localStorage.getItem("furnitureInCart"));
    if (furnitureStore === null || furnitureStore === "undefined"){
        furnitureStore = [];
    }
    return furnitureStore;  
};

let furnitureStore = getBackFurnitures();
console.log(furnitureStore);


// fonction pour afficher les produits selectionnés
// si le panier est vide :
if (furnitureStore.length === 0 || furnitureStore === null) {
    validation.style.display =" none";
    let panierVide = `<h1 class="offset-1 col-10 text-center" >Votre panier est vide ! :/</h1>
    <a href="index.html" class="offset-3 col-6 center btn btn-dark"><span class="white" >Retour à l'accueil</span></a> `
    displayStore.innerHTML += panierVide;
    
// s'il y a des produits dans le panier : 
} else {

    let mainEmpty =  document.getElementById('main');
    mainEmpty.classList.remove('main-empty');
    let footerEmpty =  document.getElementById('footer');
    footerEmpty.classList.remove('footer-empty');

    const displayFurniture = () => {
        const furnitureStoreMap = furnitureStore.map((furni , index) => {
            return createFurnitureElement(furni, index);
        });
        displayStore.innerHTML =" ";
        // j'utilise l'operateur spread pour retourner une liste et pas un tableau
        displayStore.append(...furnitureStoreMap);
    };



//fonction pour créer formulaire
function templateForm(){
let templateFormulaire = `<form class="row" id="checked">
<div class="space-form col-12 col-md-6">
  <input type="text" class="form-control" id="inputNom" placeholder="Nom" aria-label="Nom" required>
</div>
<div class="space-form col-12 col-md-6">
  <input type="text" class="form-control" id="inputPrenom" placeholder="Prénom" aria-label="Prenom" required>
</div>
<div class="space-form col-12">
  <input type="text" class="form-control" id="inputAdresse" placeholder="Adresse" aria-label="Adresse" required>
</div>
<div class="space-form col-12 col-md-6">
  <input type="text" class="form-control" id="inputVille" placeholder="Ville" aria-label="Ville" required>
</div>
<div class="space-form col-12 col-md-6">
  <input type="text" class="form-control" id="inputPostal" placeholder="Code Postal" aria-label="Code postal" required>
</div>
<div class="space-form col-12">
  <input type="email" class="form-control" id="inputEmail" placeholder="E-mail" aria-label="Email" required>
</div>
<div class="space-form col-12">
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="gridCheck" required>
    <label class="form-check-label" for="gridCheck">
      J'accepte les mentions légales
    </label>
  </div>
</div>
</form>`
formulaire.innerHTML += templateFormulaire;
};

// Appel formulaire
templateForm();

// fonction pour creer l'element furni 
const createFurnitureElement = (furni , index) =>{
    let prod = document.createElement('div');
    prod.innerHTML = 
    `<div class="container-fluid  card-cart ">
        <div class="col-12">
            <p class="article-title">${furni.furnitureName} </p>
            <img class="image-panier" src="${furni.furnitureImage}">
            <p class="bold">Vernis</p>
            <p>${furni.furnitureVarnish}</p>
        </div>
        <div class="row">
            <div class="col-6 col-md-3 "><span class="bold">Quantité</span>
                <p class="center">${furni.furnitureQuantite}</p>
            </div>
            <div class="col-6 col-md-3 "><span class="bold">Prix unitaire</span>
                <p>${furni.furniturePrice}€</p>
            </div>
            <div class="col-6 col-md-3 "><span class="bold">Prix total</span>
                <p>${furni.totalPrice}€</p>
            </div>
            <div class="col-6 col-md-3 "><span class="bold">Supprimer</span>
                <p> <button class="deleteBtn"><i class="far fa-trash-alt"></i></button></p>
            </div>
        </div>
    </div> `;
   const btnDelete = prod.querySelector('.deleteBtn');
   btnDelete.addEventListener('click', ()=>{

      // on delete le furni sinon on recharge la page du panier
        if (window.confirm(`Voulez-vous vraiment supprimer cet article de votre panier ?`)) {
            deleteFurni(index);
            window.location.href = "panier.html";
        } else {
            window.location.href = "panier.html";
        };
      //}
    });
    return prod;
};

// fonction deleteFurni qui sera appelé à l'interieur de l'évenement btnDelete
const deleteFurni = (index)=>{
    furnitureStore.splice(index,1);
    localStorage.setItem("furnitureInCart", JSON.stringify(furnitureStore)) 
    JSON.parse(localStorage.getItem("furnitureInCart"));
    displayFurniture();
    compteurPrixTotal();
};


// Calcul du prix total de la commande:
const compteurPrixTotal = () =>{

    let arrayPrixTotal =[];
    for (const furniInStore of furnitureStore) {
      let prix = furniInStore.totalPrice;
      arrayPrixTotal.push(prix);
    }
    console.log(arrayPrixTotal);

    if (arrayPrixTotal.length === 0) {
        location.assign('panier.html');
    } else {
    let prixTotal = arrayPrixTotal.reduce((accumulator, currentValue) => accumulator + currentValue);
    prixTotalCommande.innerHTML= `<div class="center">
        <h2>PRIX TOTAL: ${prixTotal}€</h2>
    </div>`;
    localStorage.setItem("TotalPrice", prixTotal);
    console.log(localStorage);
    }  
    
};


compteurPrixTotal();
displayFurniture();




validation.addEventListener('click', (e)=>{
    e.preventDefault;
    sendOrderCustomer();
});



function sendOrderCustomer(){

    let Checked = document.getElementById('gridCheck').value;
    let FormValid = document.getElementById('checked').checkValidity();


    if (FormValid == false ) {

        alert(`Vous n'avez pas rempli tous les champs requis pour valider votre commande !`);

    }else{
     
        let contact = {
            firstName : document.getElementById('inputPrenom').value,
            lastName : document.getElementById('inputNom').value,
            address : document.getElementById('inputAdresse').value,
            city : document.getElementById('inputVille').value,
            email : document.getElementById('inputEmail').value
        }; 
        console.log(contact);


        let products = [];
        console.log(furnitureStore);
         for (let i=0; i<furnitureStore.length; i++){ //boucle pour recuperer les id 
            products.push(furnitureStore[i].furnitureId);//envoie des id dans la variable produits
            console.log(products);
        }; 


        let order = {contact, products};
        console.log(order);


        const envoi = fetch("http://localhost:3000/api/furniture/order", {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        envoi.then(async response =>{
            try{
                console.log(response);
                let confirmation = await response.json();
                console.log(confirmation);
                let idConfirmation = confirmation.orderId;
                console.log(idConfirmation);

                let result = {
                    idConfirmation: idConfirmation,
                    contact: contact
                }
                console.log(result);

                if (typeof localStorage != "undefined") {
                    localStorage.setItem("confirm", JSON.stringify(result));
                    localStorage.setItem("furnitureInCart",JSON.stringify([]));

                   window.location.href ="confirmation.html";
                   

                } else {
                    
                     alert("localStorage n'est pas supporté");
                }

            } catch (error) {
                console.log(error);
                alert("Un problème est survenu, merci de réessayer plus tard");
            }
        });
    };
}
};
