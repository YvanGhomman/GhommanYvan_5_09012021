


function createTag(tag, className, content, parent, attributes){
    const element = document.createElement(tag)
    element.className = className
    element.innerHTML = content
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
    parent.appendChild(element)
    return element
};


function furnituresNumber(){
    const furnitureStore = JSON.parse(localStorage.getItem("furnitureInCart"));
    const cartFurnitures = document.getElementById("cart_furniture")
    if (furnitureStore) {
        let count = furnitureStore.reduce((sum, item) => sum += item.furnitureQuantite, 0)
        let counter = createTag('span', 'd-none d-sm-block bg-dark text-light px-2 rounded-circle', count, cartFurnitures, null)
    }
};
furnituresNumber();