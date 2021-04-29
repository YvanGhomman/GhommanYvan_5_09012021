const displayStore = document.getElementById("displayFurnitureStore");
const validation = document.getElementById("validate");
const prixTotalCommande = document.getElementById("totalPriceCart");


// récuperation données stockées dans le localStorage 
function getBackFurnitures() {
    let furnitureStore = JSON.parse(localStorage.getItem("furnitureInCart"));
    if (furnitureStore === null || furnitureStore === "undefined") {
        furnitureStore = [];
    }
    return furnitureStore;  
};

let furnitureStore = getBackFurnitures();
console.log(furnitureStore);


// fonction pour afficher les produits selectionnés
// si le panier est vide :
if (furnitureStore.length === 0 || furnitureStore === null /*&& getComputedStyle(validation).display == "block"*/) {
    validation.style.display =" none";
    let panierVide = `<h1 class="offset-3 col-6 offset-3 text-center" >Votre panier est vide ! :/</h1>
    <a href="index.html" class="offset-3 col-6 offset-3 center btn btn-primary"><span class="white" >Retour à l'accueil</span></a> `
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
};

// fonction pour creer l'element  furni 
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
       //pb suppression (faire modal)
      //const result = alert(`Voulez-vous vraiment supprimer cet article?`);
      //pb suppression (faire modal)
      //console.log(result);
      // si la promesse est resolue, on delete le furni sinon on ne fait rien
      //if (result) {
        deleteFurni(index);
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
}


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
    //let compteurPanier = arrayCompteurPanier.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
    //let itemInCart = document.querySelector('#cart-qte');
    //itemInCart.innerHTML=`${compteurPanier}`;}
    let prixTotal = arrayPrixTotal.reduce((accumulator, currentValue)=> accumulator+ currentValue);
    prixTotalCommande.innerHTML= `PRIX TOTAL: ${prixTotal}€`;
    localStorage.setItem("TotalPrice", prixTotal);
    console.log(localStorage);  
}}

compteurPanierPrixTotal();
displayFurniture();
};
