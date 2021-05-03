//Mise en place des constantes
const urlFurnitures = 'http://localhost:3000/api/furniture/';
const searchParam = new URLSearchParams(window.location.search).get("id");
const urlApiId = urlFurnitures + searchParam;
const furnitureContainer = document.getElementById("ProduitFurniture");
console.log(urlApiId);

let btn = document.querySelector(".cart");
console.log(btn);


//fonction pour la quantité
//utiliser input type nbr a place select

// PROBLEME DETECTION NEGATIF OU NAN    

function compteur() {
    let qt = document.querySelector('input[name="quantité"]');
    let nbr = qt.value;
    function doThing(){
        if (nbr < 0 || nbr > 100 || nbr === NaN || nbr === "NaN" || nbr === "undefined" || nbr === null){
            alert("arrête ça de suite !")
        }else{
            let newQuantite = '';
            newQuantite.innerText += nbr;
            qt += newQuantite;
        }
    };        
    qt.addEventListener("change", doThing);
    console.log(qt);
};

// fonction pour afficher les options de vernis
function choixVernis(data) {
    let choixVernis = document.getElementById("choix-vernis")
    for (let i = 0; i < data.varnish.length; i++) {
      let newChoixVernis = document.createElement("option")
      newChoixVernis.innerText = data.varnish[i];
      choixVernis.append(newChoixVernis);
    }
};


// Get Function with Fetch
fetch(urlApiId)
    .then((response) =>
        response.json()
    .then((data) => {
        console.log(data);
        let furnitureElement = '';
            furnitureElement += `<div class="card contrecol col-12 col-sm-8 space">
                <img src="${data.imageUrl}" class="card-img-top" alt="${data.name}">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.description}</p>
                    <p class="card-text">${data.price/100} Dogecoins</p>
                </div>
                <div class="card-footer text-muted">
                    <form class="offset-1 col-10 offset-1 ">
                        <div class="form-group">
                            <label for="quantité">Choisissez une quantité</label>
                            <input type="number" class="form-control" id="quantite" name="quantité" min="1" max="100" value ="1" required></input>
                        </div>
                        <div class="form-group">
                            <label>Choisissez un vernis</label>
                            <select class="form-control" id="choix-vernis" required></select>
                        </div>
                    </form>
                </div>`;
        furnitureContainer.innerHTML += furnitureElement;
        compteur();
        choixVernis(data);
        btn.addEventListener("click",()=>{
            let furnitureChoice = {
                furnitureName : data.name,
                furnitureId   : data._id,
                furnitureImage: data.imageUrl,
                furniturePrice: data.price/100,
                furnitureVarnish: document.getElementById("choix-vernis").value,
                furnitureQuantite : parseInt(document.getElementById("quantite").value),
                get totalPrice (){
                    return this.furniturePrice * this.furnitureQuantite;
                }   
            };
            // Détection
            if (typeof localStorage != "undefined"){
            // on recupère la valeur dans le Web Storage
                let furnitureStore = JSON.parse(localStorage.getItem("furnitureInCart"));
                if (furnitureStore === null || furnitureStore === "undefined"){
                    furnitureStore = []; // on crée le tableau 
                } else {
                    furnitureStore.push(furnitureChoice); // si le tableau existe on push le choix du meuble
                }
                localStorage.setItem("furnitureInCart", JSON.stringify(furnitureStore));
                if (window.confirm(`Vous avez ajouté ${furnitureChoice.furnitureQuantite} ${data.name} à votre panier ! Souhaitez-vous continuer vos achats ? `)) {
                    window.location.href = "index.html";
                } else {
                    window.location.href = "panier.html";
                };

            } else {
                alert("Nos excuses, une erreur est survenue :(");
            }    
        });
    })
    .catch((err) => console.log('Erreur : ' + err)));

