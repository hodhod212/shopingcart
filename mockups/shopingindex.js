var listOfProducts;
function loadProducts() {
    fetch("products.json")
    .then(function(response) {
    return response.json();
    })
    .then(function(products) {
    listOfProducts = products;
    addProductsToWebpage();
});
};
function initSite() {
loadProducts();}
function addProductsToWebpage() {
    var ul = document.createElement('ul');
    for ( i in listOfProducts) {
        var li = document.createElement('li');
        var h2 = document.createElement('h2');
        h2.innerText = listOfProducts[i].title;
        h2.setAttribute('style','text-align: center;')
        var p = document.createElement('p');
        p.innerText = listOfProducts[i].description;
        p.setAttribute('style','text-align: center;')
        var myImage = document.createElement('img');
        myImage.setAttribute('src','assets/'+listOfProducts[i].image);
        myImage.setAttribute('style','display: block; margin-left: auto; margin-right: auto;width: 200px;');
        var h4 = document.createElement('h4');
        h4.innerText = listOfProducts[i].price+' kr';
        h4.setAttribute('style', 'margin-left:35%;margin-right:35%;')
        var Button = document.createElement('button');
        Button.setAttribute('data-name', listOfProducts[i].title);
        Button.setAttribute('data-price', listOfProducts[i].price);
        Button.setAttribute('src','assets/'+listOfProducts[i].image);
        Button.setAttribute('class', 'add-to-cart');
        Button.innerHTML = '<i class="fa fa-cart-arrow-down" style="font-size:22px;color:white;margin-right:4px;"></i>lägg till kundvägnen';
        Button.setAttribute('style','border-radius:5px;color:white;background-color: #5596F5;')
        h4.appendChild(Button);
        p.appendChild(myImage);
        p.appendChild(h4)
        li.appendChild(h2);
        li.appendChild(p);
        document.body.appendChild(li); }      
    //jquery
$(".add-to-cart").click(function(event) {
        event.preventDefault();
        var name = $(this).attr("data-name");
        var price = Number($(this).attr("data-price"));
        shoppingCart.addItemToCart(name,price,1);
        displayCart();
    });
    $("#clear-cart").click(function(event){
        shoppingCart.ClearCart();
        displayCart();
    });
     function  displayCart() {
        var cartArray = shoppingCart.listCart();
        var output = "";
        for (var i in cartArray) {
            output +="<div style='font-size:smaller;border-radius:5px; border:1px solid blue;display:inline-block;color:black;margin:4px;'>" 
                + '<img src="'+'assets/'+cartArray[i].price+'.png">'+'<br>'
                +'<h4>'+listOfProducts[i].title +'</h4>'
                +" <input class='item-count' type = 'number' style='width:33px;height:19px;border-radius:3px;' data-name ='"  
                +cartArray[i].name
                + "' value ='" +  cartArray[i].count+ "' >"
                + " x " + cartArray[i].price
                +  " = " + cartArray[i].total.toFixed(2)
                + " kr "+'<br>'
                + "<button style='background-color:red;color:white;border-radius:5px 0 0 5px;' class='plus-item' data-name='"
                +cartArray[i].name+"' >+</button>"
                + "<button style='background-color:red;color:white;' class='subtract-item' data-name='"
                +cartArray[i].name+"' >-</button>"
                + "<button class='delete-item' style='background-color:red;color:white;border-radius:0 5px 5px 0;' data-name='"
                +cartArray[i].name+"' ><i class='fa fa-trash-o' style='font-size:16px;color:white'></i> Ta bort</button>" 
                + "</div>"
         }                
        $("#show-cart").html(output);
        $("#count-cart").html(shoppingCart.countCart());
        $("#total-cart").html(shoppingCart.totalCart());
    }
    $("#show-cart").on("click", ".delete-item", function(event){
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
    });
    $("#show-cart").on("click", ".subtract-item", function(event){
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCart(name);
    displayCart();
    });
    $("#show-cart").on("click", ".plus-item", function(event){
    var name = $(this).attr("data-name");
    shoppingCart.addItemToCart(name,0,1);
    displayCart();
    });
    $("#show-cart").on("change", ".item-count", function(event) {
        var name = $(this).attr("data-name");
        var count =Number($(this).val());
        shoppingCart.setCountForItem(name,count);
        displayCart();
    })   
} 
    displayCart();
   
