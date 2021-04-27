/* MISE EN ROUTE SERVEUR 3000 :
PS C:\Users\yvang\Desktop\OpenClassrooms\P5\Orinoco> cd .\back-end\
PS C:\Users\yvang\Desktop\OpenClassrooms\P5\Orinoco\back-end> node .\server.js */


const ALL_DATA_ENDPOINT = 'http://localhost:3000/api/furniture';

// Get Function with Fetch
async function getData(endpoint) {
    let response = await fetch(endpoint);
    return await response.json();
};

//Template pour produits
function template(product) {
    return `<div class="card">
                     <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                     <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">${product.price/100} Dogecoins</p>`                 
};

//Application de getData avec chacun des produits + mise en place du Template dans l'Id-Html correspondant
getData('http://localhost:3000/api/furniture/5be9cc611c9d440000c1421e')
.then(data => {
    function displayProduct(data) {
        document.getElementById("Produit1").innerHTML += template(data) + `<a href="produit1.html" class="btn btn-primary">Kilébo ! Jeleveu ♥</a>
        </div>
        </div>`;
    }
        displayProduct(data);
        
        })
.catch(error => console.error(error));


getData('http://localhost:3000/api/furniture/5beaadda1c9d440000a57d98')
.then(data => {
    function displayProduct(data) {
        document.getElementById("Produit2").innerHTML += template(data) + `<a href="produit2.html" class="btn btn-primary">Kilébo ! Jeleveu ♥</a>
        </div>
        </div>`;
    }
        displayProduct(data);
        })
.catch(error => console.error(error));


getData('http://localhost:3000/api/furniture/5beaae361c9d440000a57d99')
.then(data => {
    function displayProduct(data) {
        document.getElementById("Produit3").innerHTML += template(data) + `<a href="produit3.html" class="btn btn-primary">Kilébo ! Jeleveu ♥</a>
        </div>
        </div>`;
    }
        displayProduct(data);
        })
.catch(error => console.error(error));


getData('http://localhost:3000/api/furniture/5beaaf2e1c9d440000a57d9a')
.then(data => {
    function displayProduct(data) {
        document.getElementById("Produit4").innerHTML += template(data) + `<a href="produit4.html" class="btn btn-primary">Kilébo ! Jeleveu ♥</a>
        </div>
        </div>`;
    }
        displayProduct(data);
        })
.catch(error => console.error(error));


getData('http://localhost:3000/api/furniture/5beab2061c9d440000a57d9b')
.then(data => {
    function displayProduct(data) {
        document.getElementById("Produit5").innerHTML += template(data) + `<a href="produit5.html" class="btn btn-primary">Kilébo ! Jeleveu ♥</a>
        </div>
        </div>`;
    }
        displayProduct(data);
        })
.catch(error => console.error(error));



/*
function Go(data){
return getData(data.adress)
.then(data => {
    function displayProduct(data) {
        data.htmlId.innerHTML += template(data);
    }
    return displayProduct(data);
        })
.catch(error => console.error(error));
};

Go(furniture1);
Go(furniture2);
Go(furniture3);
Go(furniture4);
Go(furniture5);
*/


/*
const furniture1 = {
    adress : 'http://localhost:3000/api/furniture/5be9cc611c9d440000c1421e',
    htmlId : 
};
const furniture2 = {
    adress :'' ,
    
};
const furniture3 = {
    adress : ,
    htmlId :document.getElementById("Produit3")
};
const furniture4 = {
    adress : ,
    htmlId :document.getElementById("Produit4")
};
const furniture5 = {
    adress : ,
    htmlId :document.getElementById("Produit5")
};
*/

/*
// Display Products
function displayProduct(product) {
    console.log(product);
    let container = document.getElementById("Produit1");
    console.log(container);
    container.innerHTML += template(product)
}*/

