//Mise en place des constantes
const urlFurnitures = 'http://localhost:3000/api/furniture/';
const searchParam = new URLSearchParams(window.location.search).get("id");
const urlApiId = urlFurnitures + searchParam;
const furnitureContainer = document.getElementById("ProduitFurniture");
console.log(urlApiId);

let btn = document.querySelector(".add-to-cart");
console.log(btn);


// fonction pour la quantité
function compteur() {
    let Quantite = document.getElementById("quantite");
    for (let nbr = 1; nbr <= 5; nbr++) {
       let newQuantite = document.createElement("option");
       newQuantite.innerText += nbr;
       Quantite.append(newQuantite);
     }
  };

// fonction pour afficher les options de vernis.
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
                            <label for="quantité">Choisissez une quantité (<em> Dans la limite de 5 meubles </em>)</label>
                            <select class="form-control" id="quantite" name="quantité"></select>
                        </div>
                        <div class="form-group">
                            <label>Choisissez un vernis</label>
                            <select class="form-control" id="choix-vernis"></select>
                        </div>
                    </form>
                </div>`;
        furnitureContainer.innerHTML += furnitureElement;
        compteur();
        choixVernis(data);

        })
    )
    .catch((err) => console.log('Erreur : ' + err));

