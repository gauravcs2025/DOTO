var selectedItems = localStorage?.getItem('selectedItems');
var childrenArray=[];
var products=[];


document.querySelectorAll(".product").forEach((item,index)=>{
  var children = item.children;
  for(let i=0;i<children.length;i++){
  if(children[i].getAttribute("class") === "product-title"){
      !selectedItems.includes(children[i].textContent)?item.classList.add("hide"):"";
      selectedItems.includes(children[i].textContent)?childrenArray.push(item):"";
    }
  }

});

document.querySelectorAll(".product-button").forEach((item,index)=>{
    item.addEventListener("click",(element)=>{
       item.parentElement.classList.add("hide");
       var children = item.parentNode.children;
       for(let i = 0;i<children.length;i++){
             children[i].getAttribute("class") === "product-title"?title=children[i].textContent: children[i].getAttribute("class") === "product-price"? price=children[i].textContent:"";
             }
             products= products.filter((i)=>i.productName!=title);
             adobeDataLayer.push({
                "event":"aa-cartRemoval",
                "cart": {
                    "productCategory":title==="HP Pavilion"?"Hp Laptops":"dell Laptops",
                    "productId":title==="HP Pavilion"?"15678905432":"2132342456",
                    "quantity":"1",
                    "productPrice":price,
                    "productName":title
            },
                "metric": "aa-cartRemoval"
              
              }) 
    });
});

window.addEventListener('load',()=>{

        childrenArray.forEach((item)=>{
            var children = item.children;
      for(let i = 0;i<children.length;i++){
            children[i].getAttribute("class") === "product-title"?title=children[i].textContent: children[i].getAttribute("class") === "product-price"? price=children[i].textContent:"";
            }
            var obj={
                    "productCategory":title==="HP Pavilion"?"Hp Laptops":"dell Laptops",
                    "productId":title==="HP Pavilion"?"15678905432":"2132342456",
                    "quantity":"1",
                    "productPrice":price,
                    "productName":title
            };
           products.push(obj);
            
    });

    if(products.length===0){
        return;
    }

    adobeDataLayer.push({
        "event":"aa-cartView",
        "products": products,
        "metric": "aa-cartView"
      
      })   


});

document.getElementById("purchase").addEventListener('click',(e)=>{
    adobeDataLayer.push({
        "event":"aa-purchase",
        "products": products,
        "metric": "aa-purchase"    
      }); 
      alert("purchase complete");
      e.target.classList.add("hide");
});

