 // fetch('products.json')
 //            .then( function (response) {
 //                return response.json();
 //            })
 //            .then(function (data) {
 //                appendData(data);
 //            })
 //            .catch(function (err) {
 //                console.log('error: ' + err);
 //            });
 //        function appendData(data) {
 //            var mainContainer = document.getElementById("myData");
 //            for (var i = 0; i < data.length; i++) {
 //                var div = document.createElement("div");
 //                div.innerHTML = 'Name: ' + data[i].title + ' ' + data[i].price;
 //                mainContainer.appendChild(div);
 //            }
 //        }
 // 

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for Shopping!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">DELETE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = Number(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
// // 
//  $(function() {

 //  $.getJSON('products.json', function(data) {
 //      $.each(data, function(key, val) {
 //        const title = val.title ;
 //        const description = val.description ;
 //        const price = val.price ;
 //        const img = val.img ;

 //        newitem = document.getElementById("newitem");
 //        if (newitem!==null){
 //          newitem = newitem.content.querySelector("div");
 //          a = document.importNode(newitem, true);
 //          a.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("h5")[0].innerHTML = title;
 //          a.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML = description;
 //          a.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("p")[1].innerHTML = price;
 //          a.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML = key;
 //          pageimg = a.getElementsByTagName("div")[0].getElementsByTagName("img")[0]
 //          pageimg.src = img;
 //          pageimg.style.width = "18rem";
 //          pageimg.style.height = "18rem";

 //          var rows = document.getElementsByClassName("row");
 //          var lastrow = rows[ rows.length - 1];
 //          if (lastrow.getElementsByClassName("item").length == 4){
 //            newrow = document.getElementById("newrow").content.querySelector(".row");
 //            tmp = document.importNode(newrow, true);
 //            document.getElementById("products").appendChild(tmp);
 //            rows = document.getElementsByClassName("row");
 //            lastrow = rows[ rows.length - 1];
 //          }

 //          lastrow.appendChild(a);     // change [0] to [-1]
 //        }
 //    });

//   });

// });
