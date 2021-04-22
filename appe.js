/* MISE EN ROUTE SERVEUR 3000 :
PS C:\Users\yvang\Desktop\OpenClassrooms\P5\Orinoco> cd .\back-end\
PS C:\Users\yvang\Desktop\OpenClassrooms\P5\Orinoco\back-end> node .\server.js */


const ALL_DATA_ENDPOINT = 'http://localhost:3000/api/furniture';
const furniture1 = {
    adress : 'http://localhost:3000/api/furniture/5be9cc611c9d440000c1421e',
    htmlId : document.getElementById("Produit1")
};
const furniture2 = {
    adress :'http://localhost:3000/api/furniture/5beaadda1c9d440000a57d98' ,
    htmlId :document.getElementById("Produit2")
};
const furniture3 = {
    adress :'http://localhost:3000/api/furniture/5beaae361c9d440000a57d99' ,
    htmlId :document.getElementById("Produit3")
};
const furniture4 = {
    adress : 'http://localhost:3000/api/furniture/5beaaf2e1c9d440000a57d9a',
    htmlId :document.getElementById("Produit4")
};
const furniture5 = {
    adress :'http://localhost:3000/api/furniture/5beab2061c9d440000a57d9b' ,
    htmlId :document.getElementById("Produit5")
};


// Get Function
async function getData(endpoint) {
    let response = await fetch(endpoint);
    return await response.json();
};

function template(product) {
    return `<div class="card">
                     <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                     <div class="card-body">
                     <h5 class="card-title">${product.name}</h5>
                     <p class="card-text">${product.description}</p>
                     <p class="card-text">${product.price} Dogecoins</p>
                     <a href="#" class="btn btn-primary">Kilébo ! Jeleveu ♥</a>
                     </div>
                 </div>`;
};

/*
function Go(data){
getData(data.adress)
.then(data => {
    function displayProduct(data) {
        data.htmlId.innerHTML += template(data);
    }
        displayProduct(data);
        })
.catch(error => console.error(error));
};

Go(furniture1);
Go(furniture2);
Go(furniture3);
Go(furniture4);
Go(furniture5);
*/


getData(furniture1.adress)
.then(data => {
    function displayProduct(data) {
        furniture1.htmlId.innerHTML += template(data);
    }
        displayProduct(data);
        })
.catch(error => console.error(error));


getData(furniture2.adress)
.then(data => {
    function displayProduct(data) {
        furniture2.htmlId.innerHTML += template(data);
    }
        displayProduct(data);
        })
.catch(error => console.error(error));


getData(furniture3.adress)
.then(data => {
    function displayProduct(data) {
        furniture3.htmlId.innerHTML += template(data);
    }
        displayProduct(data);
        })
.catch(error => console.error(error));


getData(furniture4.adress)
.then(data => {
    function displayProduct(data) {
        furniture4.htmlId.innerHTML += template(data);
    }
        displayProduct(data);
        })
.catch(error => console.error(error));


getData(furniture5.adress)
.then(data => {
    function displayProduct(data) {
        furniture5.htmlId.innerHTML += template(data);
    }
        displayProduct(data);
        })
.catch(error => console.error(error));



/*
// Display Products
function displayProduct(product) {
    console.log(product);
    let container = document.getElementById("Produit1");
    console.log(container);
    container.innerHTML += template(product)
}*/






