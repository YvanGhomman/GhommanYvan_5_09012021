const displayStore = document.getElementById("displayFurnitureStore");
const validation = document.getElementById("validate");
const prixTotalCommande = document.getElementById("totalPriceCart");
const formulaire = document.getElementById("formulaire");
class Contact {
    constructor(firstName, lastName, address, city, zip, email){
        this.firstName = firstName,
        this.lastName = lastName,
        this.address = address,
        this.city = city,
        this.zip = zip,
        this.email = email        
    }
};
class EnvoiPanier{
    async SendProducts(url, contact, products){
        const options = {
            method: 'POST',
            body: JSON.stringify({
                contact : contact,
                products: products 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            let response = await fetch(url, options);
            let result = await response.json();
            return result
                     
        } catch (error) {
            console.log (error)           
        }
    }
};



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
    <a href="index.html" class="offset-3 col-6 center btn btn-primary"><span class="white" >Retour à l'accueil</span></a> `
    displayStore.innerHTML += panierVide;
    
// s'il y a des produits dans le panier : 
} else {
const displayFurniture = () => {
    const furnitureStoreMap = furnitureStore.map((furni , index) => {
        return createFurnitureElement(furni, index);
    });
    displayStore.innerHTML =" ";
    // j'utilise l'operateur spread pour retourner une liste et pas un tableau
    displayStore.append(...furnitureStoreMap);
    templateForm();
};

//fonction pour créer formulaire
function templateForm(){
let templateFormulaire = `<form class="row g-3" id="checked">
<div class="col-md-6">
  <label for="inputNom" class="form-label">Nom</label>
  <input type="text" class="form-control" id="inputNom" placeholder="Torrez" required>
</div>
<div class="col-md-6">
  <label for="inputPrenom" class="form-label">Prénom</label>
  <input type="text" class="form-control" id="inputPrenom" placeholder="Fabien" required>
</div>
<div class="col-12">
  <label for="inputAdresse" class="form-label">Adresse</label>
  <input type="text" class="form-control" id="inputAdresse" placeholder="12 chemin des Vignes" required>
</div>
<div class="col-md-6">
  <label for="inputVille" class="form-label">Ville</label>
  <input type="text" class="form-control" id="inputVille" placeholder="Avignon" required>
</div>
<div class="col-md-6">
  <label for="inputPostal" class="form-label">Code Postal</label>
  <input type="text" class="form-control" id="inputPostal" placeholder="84000" required>
</div>
<div class="col-12">
  <label for="inputEmail" class="form-label">Email</label>
  <input type="email" class="form-control" id="inputEmail" placeholder="appelezmoifab@gmail.com" required>
</div>
<div class="col-12">
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="gridCheck" required>
    <label class="form-check-label" for="gridCheck">
      J'accepte les conditions légales
    </label>
  </div>
</div>
</form>`
formulaire.innerHTML += templateFormulaire;
};

// fonction pour creer l'element furni 
const createFurnitureElement = (furni , index) =>{
    const ul = document.createElement('ul');
    ul.setAttribute("class","ulDisposition");
    ul.innerHTML = `
    <div class="liDisp">Article
        <ul>
            <li>${furni.furnitureName} </li>
            <li><img src="${furni.furnitureImage}" width= 80px height= 80px></li>
            <li>${furni.furnitureVarnish}</li>
        </ul>
    </div>
    <div class="liDisp">Quantité
        <ul>
            <li>${furni.furnitureQuantite}</li>
        </ul>
    </div>
    <div class="liDisp">Prix unitaire
        <ul>
            <li>${furni.furniturePrice}</li>
        </ul>
    </div>
    <div class="liDisp">Prix total
        <ul>
            <li>${furni.totalPrice}</li>
        </ul>
    </div>
    <div class="liDisp">Supprimer
        <ul>
            <li> <button class="deleteBtn"><i class="far fa-trash-alt"></i></button></li>
        </ul>
    </div> `;
   const btnDelete = ul.querySelector('.deleteBtn');
   btnDelete.addEventListener('click', ()=>{

      // on delete le furni sinon on recharge la page du panier
        if (window.confirm(`Voulez-vous vraiment supprimer cet article de votre panier ?`)) {
            deleteFurni(index);
        } else {
            window.location.href = "panier.html";
        };
      //}
    });
    return ul;
};

// fonction deleteFurni qui sera appelé à l'interieur de l'évenement btnDelete
const deleteFurni = (index)=>{
    furnitureStore.splice(index,1);
    localStorage.setItem("furnitureInCart", JSON.stringify(furnitureStore)) 
    JSON.parse(localStorage.getItem("furnitureInCart"));
    displayFurniture();
    compteurPanierPrixTotal();
};


// incrementation du panier et calcul du prix total de la commande:
const compteurPanierPrixTotal = () =>{
    let arrayCompteurPanier =[] ;
    let arrayPrixTotal =[];
    for (const furniInStore of furnitureStore) {
      let itemQte = furniInStore.furnitureQuantite;
      arrayCompteurPanier.push(itemQte); 
      console.log(arrayCompteurPanier);

      let prix = furniInStore.totalPrice;
      arrayPrixTotal.push(prix);
    }
    console.log(arrayPrixTotal);

    if (arrayCompteurPanier.length === 0 ) {
        location.assign('panier.html');
    }else{

    let prixTotal = arrayPrixTotal.reduce((accumulator, currentValue)=> accumulator+ currentValue);
    prixTotalCommande.innerHTML= `PRIX TOTAL: ${prixTotal}€`;
    localStorage.setItem("TotalPrice", prixTotal);
    console.log(localStorage);  
}};


compteurPanierPrixTotal();
displayFurniture();

validation.addEventListener('click', (e)=>{
    e.preventDefault;
    let Nom = document.getElementById('inputNom').value;
    let Prenom = document.getElementById('inputPrenom').value;
    let Adresse = document.getElementById('inputAdresse').value;
    let Ville = document.getElementById('inputVille').value;
    let Postal = document.getElementById('inputPostal').value;
    let Email = document.getElementById('inputEmail').value;
    let Checked = document.getElementById('gridCheck').value;
    let FormValid = document.getElementById('checked').checkValidity();

    if (FormValid == false ) {
        alert(`Vous n'avez pas rempli tous les champs requis pour valider votre commande !`);
        document.location.href='panier.html';
    }else{
    
    function SendToServer(){
        let contact = new Contact(Nom, Prenom, Adresse, Ville, Postal, Email);
        let produits = [];
        for (let i=0; i< furnitureStore.length; i++){ //boucle pour recuperer les id 
            produits.push(furnitureStore[i].id) //envoie des id dans la variable products
        };
        
        let urlOrderApi = "http://localhost:3000/api/furniture/order"
        let sendCart = new EnvoiPanier // instance de la classe EnvoiPanier      
        sendCart.SendProducts(urlOrderApi, contact, produits) //appel de la fonction SendProducts avec les arguments
        .then (result => {
              //création d'une variable dans le sessionStorage pour y sauvegarder les données au serveur dans le but de les utiliser pour la page confirmation
              var  order = JSON.parse(sessionStorage.getItem('orderId')); 
              order = []
              order.push(result)
              console.log(order)
              sessionStorage.setItem('orderConfirm', JSON.stringify(order));
              // redirection vers la page confirmation
              document.location.href='confirmation.html';
          })
      }
        
      SendToServer();
    }});

};
