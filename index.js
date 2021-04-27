//Mise en place des constantes
const urlFurnitures = 'http://localhost:3000/api/furniture';
//let furnituresArray = "[]";
const furnituresContainer = document.getElementById("furnitures-container");

// Get Function with Fetch

fetch(urlFurnitures)
    .then((response) =>
        response.json()
    .then((data) => {
        console.log(data);
        let furnitureElement = '';
        for (let furniture of data){
            furnitureElement += `<div class="card col-12 col-sm-5 col-lg-3 col-xl-2 space test">
                <img src="${furniture.imageUrl}" class="card-img-top" alt="${furniture.name}">
                <div class="card-body">
                <h5 class="card-title">${furniture.name}</h5>
                <p class="card-text">${furniture.description}</p>
                <p class="card-text">${furniture.price/100} Dogecoins</p>
                <a href="product.html?id=${furniture._id}" class="btn btn-primary">Kilébo ! Jeleveu ♥</a>
                </div>
                </div>`;
        }
        furnituresContainer.innerHTML += furnitureElement;
        })
    )
    .catch((err) => console.log('Erreur : ' + err));
    