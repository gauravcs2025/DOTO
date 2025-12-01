var productCount = 0;
var selectedItems = [];
var title;
var price;
localStorage.setItem('selectedItems', "");

if (productCount === 0) {
    document.getElementById("cartButton").classList.add("hide");
}

document.querySelectorAll(".product-button").forEach((item, index) => {
    item.addEventListener('click', (e) => {
        item.style.display = "none";
        productCount = productCount + 1;
        document.getElementById("cartButton").classList.remove("hide");
        document.getElementById('productCount').textContent = productCount;
        
        var children = e.target.parentNode.children;
        for (let i = 0; i < children.length; i++) {
            children[i].getAttribute("class") === "product-title" ? title = children[i].textContent : children[i].getAttribute("class") === "product-price" ? price = children[i].textContent : "";
        }
        
        selectedItems.push(title);

        // --- CHANGE 1: GET EMAIL FROM STORAGE ---
        // Assuming you saved it as 'user_email' in the previous step
        var userEmail = localStorage.getItem("user_email"); 

        adobeDataLayer.push({
            "event": "aa-addToCart",
            "metric": "aa-addToCart",
            // --- CHANGE 2: ADD USER INFO TO DATA LAYER ---
            "user": {
                "email": userEmail
            },
            "cart": {
                "productCategory": title === "HP Pavilion" ? "Hp Laptops" : "dell Laptops",
                "productId": title === "HP Pavilion" ? "15678905432" : "2132342456",
                "quantity": "1",
                "productPrice": price,
                "productName": title
            }
        });

        localStorage.setItem('selectedItems', selectedItems);
    });
});