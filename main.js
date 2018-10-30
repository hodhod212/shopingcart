var cart = [];
var item= function(name,price,count) {
    this.name = name;
    this.price = price;
    this.count = count;
};
function addItemToCart(name,price,count) {
    for (var i in cart) {
        if (cart[i].name ===name) {
            car[i].count +=count;
            return;
        }
    }
    var item = new Item(name,price,count);
    cart.push(item);
}
addItemToCart('Apple',1.22,3);
addItemToCart('Apple',1.22,1);
addItemToCart('Pear',1.72,3);
function removeItemFromCart(name) {
    for (var i in cart) {
        if (cart[i].name ===name) {
            cart[i].count --;
            
        
            if (cart[i].count === 0) {
            cart.splice(i,1);
            }
            break;
        }
    }
}
console.log(cart[0].count);
