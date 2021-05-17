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
    <a href="../index.html" class="offset-3 col-6 center btn btn-dark"><span class="white" >Retour à l'accueil</span></a> `
    displayStore.innerHTML += panierVide;
    
// s'il y a des produits dans le panier : 
} else {

// On enlève les classes du main et du footer qui correspondent au panier vide
    let mainEmpty =  document.getElementById('main');
    mainEmpty.classList.remove('main-empty');
    let footerEmpty =  document.getElementById('footer');
    footerEmpty.classList.remove('footer-empty');


// fonction pour afficher le meuble selectionné
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
        // Alert box (delete furni ET rechargement de la page ou redirection vers le panier)
            if (window.confirm(`Voulez-vous vraiment supprimer cet article de votre panier ?`)) {
                deleteFurni(index);
                window.location.href = "../HTML/panier.html";
            } else {
                window.location.href = "../HTML/panier.html";
            };
        });
        return prod;
    };
   
// fonction deleteFurni qui sera appelé à l'interieur de l'évenement btnDelete
    const deleteFurni = (index)=>{
    //Suppression de l'index (tout l'affichage du meuble selectionné)
        furnitureStore.splice(index,1);
    //Redefinition du localStorage
        localStorage.setItem("furnitureInCart", JSON.stringify(furnitureStore));
    //On récupere les données du localStorage recemment mis à jour et on affiche de nouveau les meubles sélectionnés et le compteur de prix total
        JSON.parse(localStorage.getItem("furnitureInCart"));
        displayFurniture();
        compteurPrixTotal();
    };    


//Affichage des meubles selectionnés selon les données recueillies
    const displayFurniture = () => {
        const furnitureStoreMap = furnitureStore.map((furni , index) => {
        //Appel de la fonction d'affichage
            return createFurnitureElement(furni, index);
        });
        displayStore.innerHTML =" ";
    // ajout des differents affichage de meubles à la suite 
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


// Calcul du prix total de la commande:
    const compteurPrixTotal = () =>{

    //On fait un tableau où vont etre mis tous les prix des meubles selectionnés
        let arrayPrixTotal =[];
    //boucle pour récuperer tous les prix et les mettre dans le tableau
        for (const furniInStore of furnitureStore) {
        let prix = furniInStore.totalPrice;
        arrayPrixTotal.push(prix);
        }
        console.log(arrayPrixTotal);
    
    //Si le tableau est vide on renvoit à la page du panier vide
        if (arrayPrixTotal.length === 0) {
            location.assign('../HTML/panier.html');
        } else {
        //On accumule les valeurs du tableau pour faire la somme
            let prixTotal = arrayPrixTotal.reduce((accumulator, currentValue) => accumulator + currentValue);
        //Injection de la valeur sur la page
            prixTotalCommande.innerHTML= `<div class="center">
                <h2>PRIX TOTAL: ${prixTotal}€</h2>
            </div>`;
        //Injection de la valeur dans le localStorage
            localStorage.setItem("TotalPrice", prixTotal);
            console.log(localStorage);
        }  
        
    };

//Appel Compteur prix total
    compteurPrixTotal();

//Appel affichage meuble
    displayFurniture();

//Appel formulaire de contact
    templateForm();

//Écoute du clic de la validation de commande
    validation.addEventListener('click', (e)=>{
        e.preventDefault;
        sendOrderCustomer();
    });



    function sendOrderCustomer(){

    //on verifie que la checkbox est checked
        let Checked = document.getElementById('gridCheck').value;
    //on vérifie que tout le formulaire est conforme
        let FormValid = document.getElementById('checked').checkValidity();

    //si formulaire pas conforme, alert le client
        if (FormValid == false ) {

            alert(`Vous n'avez pas rempli tous les champs requis pour valider votre commande !`);
    //sinon
        }else{
        
        //variable qui reccueille les infos de contact du client
            let contact = {
                firstName : document.getElementById('inputPrenom').value,
                lastName : document.getElementById('inputNom').value,
                address : document.getElementById('inputAdresse').value,
                city : document.getElementById('inputVille').value,
                email : document.getElementById('inputEmail').value
            }; 
            console.log(contact);

        //tableau qui répertorie les produits selectionnés
            let products = [];
            console.log(furnitureStore);
            for (let i=0; i<furnitureStore.length; i++){ //boucle pour récuperer les id des produits sélectionnés
                products.push(furnitureStore[i].furnitureId);//envoie des id dans le tableau
                console.log(products);
            }; 

        //variable qui reccueille le contact et les produits
            let order = {contact, products};
            console.log(order);

        //on POST les infos reccueillies au serveur
            const envoi = fetch("http://localhost:3000/api/furniture/order", {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        //traitement de la réponse du serveur
            envoi.then(async response =>{
                try{
                    console.log(response);
                //récupération de la réponse du serveur
                    let confirmation = await response.json();
                    console.log(confirmation);
                //récupération de l'Id de la validation de prise en compte de la commande du serveur
                    let idConfirmation = confirmation.orderId;
                    console.log(idConfirmation);
                //variable qui reccueille le contact du client et l'Id de confirmation de commande
                    let result = {
                        idConfirmation: idConfirmation,
                        contact: contact
                    }
                    console.log(result);

                //Si le localStorage est rempli
                    if (typeof localStorage != "undefined") {
                    //on ajoute contact et id de confirmation au localSorage
                        localStorage.setItem("confirm", JSON.stringify(result));
                    //on vide la selection de meubles du localStorage
                        localStorage.setItem("furnitureInCart",JSON.stringify([]));
                    //redirection vers la page de confirmation
                        window.location.href ="../HTML/confirmation.html";
                    
                //sinon alerte le client d'une erreur
                    } else {
                        alert("localStorage n'est pas supporté");
                    }
            //traitement des erreurs
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            });
        };
    }
};
