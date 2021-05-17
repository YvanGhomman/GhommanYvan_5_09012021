
//Fonction pour compter le nombre d'articles dans le panier

function furnituresNumber(){
    
    //recuperation article dans localstorage
    const furnitureStore = JSON.parse(localStorage.getItem("furnitureInCart"));
    //récupération de l'id où va être injecté counter
    const cartFurnitures = document.getElementById("cart_furniture");
    
    if (furnitureStore){
        // fonction qui compte le nombre d'articles du panier
        let count = furnitureStore.reduce((sum, item) => sum += item.furnitureQuantite, 0);
        //texte affiché
        let counter = `<span class= "text-light px-2">${count}</span>`;
        //injection du texte dans l'id
        cartFurnitures.innerHTML += counter;
    }
};
furnituresNumber();