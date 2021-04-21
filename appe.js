/*let httpRequest = new XMLHttpRequest()

httpRequest.onreadystatechange = function () {
console.log(httpRequest)
}

httpRequest.open('GET', 'http://localhost:3000/api/furniture', true)
httpRequest.send()*/



/* MISE EN ROUTE SERVEUR 3000 :
PS C:\Users\yvang\Desktop\OpenClassrooms\P5\Orinoco> cd .\back-end\
PS C:\Users\yvang\Desktop\OpenClassrooms\P5\Orinoco\back-end> node .\server.js */


const ALL_DATA_ENDPOINT = 'http://localhost:3000/api/furniture';
  
// Get Function
async function getData(endpoint) {
    let response = await fetch(endpoint);
    return await response.json();
}

getData(ALL_DATA_ENDPOINT + '/5be9cc611c9d440000c1421e')
    .then(data => {
         console.log(data);
         displayProduct(data);
         })
    .catch(error => console.error(error))



// Display Products
function displayProduct(product) {
    console.log(product);
    let container = document.getElementById("allProducts");
    console.log(container);
    /*container.innerHTML += '<div class="card" style="width: 18rem;">';
    container.innerHTML += ` <img src=${product.imageUrl} class="card-img-top" alt="${product.name}">`;
    container.innerHTML += '<div class="card-body">';
    container.innerHTML += '<h5 class="card-title">'+ product.name + '</h5>';
    container.innerHTML += '<p class="card-text">' +product.description  + '</p>';
    container.innerHTML += '<a href="#" class="btn btn-primary">Go somewhere</a>';
    container.innerHTML += '</div>';
    container.innerHTML += '</div>';*/

   let template = `<div class="card" style="width: 18rem;">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">${product.price} Dogecoins</p>
                        <a href="#" class="btn btn-primary">Ce meuble est cool ! Jeleveu</a>
                        </div>
                    </div>`;
    container.innerHTML += template
}