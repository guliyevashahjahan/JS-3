import { setStorage, getStorage } from "./storage.js";


$(function () {
  let totalAmount = document.querySelector('.totalAmount');
  let basketContainer = document.querySelector(".cart-items");
  let quantity = document.querySelector(".quantity");
  let form = document.querySelector('.product-form')

  let basketArr = getStorage('products') || [];
  

$('.filter-icon').click(function(){
  $('.product-filter').toggleClass('product-filter-click')


})



  ListBasket();
  onload = GetProducts();
  document.addEventListener('DOMContentLoaded' , function (){
ListBasket();
  })
 
  form.addEventListener('submit', function(e){
e.preventDefault();
let search = form.elements["search"].value;
GetProducts(search);
  })

 
  $.get(
    "https://fakestoreapi.com/products/categories",
    function (data, status) {
      let li = "";
      data.forEach((element) => {
        li += ` <li><a class="dropdown-item" href="#!">${element}</a></li>`;
      });
      $(".category").html(li);
    }
  );
  
  function ListBasket() {

    let totalPrices = basketArr.reduce(
      (accumulator, product) => accumulator + (product.price * product.count),
      0
    );

    totalAmount.textContent = '$ '+ totalPrices.toFixed(2);
    let decrement = document.getElementsByClassName("decrement")
    let increment = document.getElementsByClassName("increment")
    basketContainer.innerHTML = "";
    basketArr.forEach((product) => {
        let totalPrice = product.count * product.price;
      let star = "";
      let rate = Math.round(product.rating.rate);

      for (let index = 0; index < rate; index++) {
        star += `<div style="color:#ffc107;" class="bi-star-fill"></div>`;
      }
      basketContainer.innerHTML += ` <li style="border: 1px solid rgba(0, 0, 0, 0.3); border-radius: 3px; padding: 10px; margin-bottom:10px;  ">
      <b>   ${product.title}</b> </br> <span style="font-size:16px;"> $${product.price} </span> </br><span style ="font-size: 20px; font-weight:600">  x${product.count} </span> <div style="display:inline;" data-id='${product.id}'>  <button  class="decrement cart-button"">-</button>   <button class="increment cart-button">+</button> </div> </br> <div class="d-flex"> ${star} </div> <span style="font-size:22px;"> $${totalPrice.toFixed(2)} </span></li>
      `;
    });
    let totalCount = basketArr.reduce(
      (accumulator, product) => accumulator + product.count,
      0
    );
    if (totalCount != 0) {
      $(".shopping-cart").removeClass("d-none");
    }
    quantity.textContent = totalCount;
    for (const element of decrement) {
        element.addEventListener('click',Decrement);
    }
for (const element of increment) {
    
    element.addEventListener('click',Increment)
}


   
  }

  function Decrement(e){
    let id = Number (e.target.parentElement.dataset.id)
    let isInBasket = basketArr.find((x) => x.id == id);
    let index = basketArr.findIndex((x) => x.id == id);
    if (isInBasket.count==1) {
       
        basketArr=basketArr.filter(x => x.id != id)
      
      
      }
    
    else{
       let updatedElement = { ...isInBasket, count: --isInBasket.count };
       basketArr.slice(index, 1, updatedElement);
    }
    setStorage('products',basketArr);
    ListBasket();
     }
   
     function Increment(e){
     let id = Number (  e.target.parentElement.dataset.id)
     let isInBasket = basketArr.find((x) => x.id == id);
     let index = basketArr.findIndex((x) => x.id == id);
     if (isInBasket) {
       let updatedElement = { ...isInBasket, count: ++isInBasket.count };
       basketArr.slice(index, 1, updatedElement);
      
     }
     setStorage('products',basketArr);
     ListBasket();
     }


  async function GetProducts(search) {
    if(search) {
      console.log(1);
        await $.get("https://fakestoreapi.com/products", function (data, status) {
          if (data != null) { 
            $(".spinner").addClass("d-none");
          }
    
          let products = "";
    
          data.filter(x => x.title.toUpperCase().includes(search.toUpperCase())).forEach((element) => {  
            let star = "";
            let rate = Math.round(element.rating.rate);
    
            for (let index = 0; index < rate; index++) {
              star += `<div class="bi-star-fill"></div>`;
            }
            products += `<div class="col mb-5">
        <div class="card h-100">
            <!-- Sale badge-->
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${element.category}</div>
            <!-- Product image-->
            <img class="card-img-top" src="${element.image}" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${element.title}</h5>
                    <!-- Product reviews-->
                    <div class="d-flex justify-content-center small text-warning mb-2 ">
                       ${star}
                    </div>
                    <!-- Product price-->
                    
                    $${element.price}
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"><button data-id='${element.id}' class="btn btn-outline-dark mt-auto add-to-cart">Add to cart</button></div>
            </div>
        </div>
    </div>
    `;
          });
          $(".products").html(products);
        });
    
        $(".cart").click(function (e) {
          e.preventDefault();
          $(".shopping-cart").toggleClass("d-none");
        });
        $(".close").click(function () {
          $(".shopping-cart").addClass("d-none");
        });
    
        let buttons = document.getElementsByClassName("add-to-cart");
        for (const button of buttons) {
          button.addEventListener("click", AddToCart);
        }
       
        function AddToCart(e) {
          $.get("https://fakestoreapi.com/products", function (data, status) {
            let productsArr = data;
    
            let id = Number(e.target.dataset.id);
            let findedElement = productsArr.find((product) => product.id == id);
    
            let isInBasket = basketArr.find((x) => x.id == id);
            let index = basketArr.findIndex((x) => x.id == id);
            if (isInBasket) {
              let updatedElement = { ...isInBasket, count: ++isInBasket.count };
              basketArr.slice(index, 1, updatedElement);
            } else {
              basketArr.push({ ...findedElement, count: 1 });
              
            }
            setStorage('products', basketArr)
            ListBasket();
          });
        }
      
    
    }
    else {
    await $.get("https://fakestoreapi.com/products", function (data, status) {
      if (data != null) { 
        $(".spinner").addClass("d-none");
      }

      let products = "";

      data.forEach((element) => {  
        let star = "";
        let rate = Math.round(element.rating.rate);

        for (let index = 0; index < rate; index++) {
          star += `<div class="bi-star-fill"></div>`;
        }
        products += `<div class="col mb-5">
    <div class="card h-100">
        <!-- Sale badge-->
        <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${element.category}</div>
        <!-- Product image-->
        <img class="card-img-top" src="${element.image}" alt="..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${element.title}</h5>
                <!-- Product reviews-->
                <div class="d-flex justify-content-center small text-warning mb-2 ">
                   ${star}
                </div>
                <!-- Product price-->
                
                $${element.price}
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><button data-id='${element.id}' class="btn btn-outline-dark mt-auto add-to-cart">Add to cart</button></div>
        </div>
    </div>
</div>
`;
      });
      $(".products").html(products);
    });

    $(".cart").click(function (e) {
      e.preventDefault();
      $(".shopping-cart").toggleClass("d-none");
    });
    $(".close").click(function () {
      $(".shopping-cart").addClass("d-none");
    });

    let buttons = document.getElementsByClassName("add-to-cart");
    for (const button of buttons) {
      button.addEventListener("click", AddToCart);
    }
   
    function AddToCart(e) {
      $.get("https://fakestoreapi.com/products", function (data, status) {
        let productsArr = data;

        let id = Number(e.target.dataset.id);
        let findedElement = productsArr.find((product) => product.id == id);

        let isInBasket = basketArr.find((x) => x.id == id);
        let index = basketArr.findIndex((x) => x.id == id);
        if (isInBasket) {
          let updatedElement = { ...isInBasket, count: ++isInBasket.count };
          basketArr.slice(index, 1, updatedElement);
        } else {
          basketArr.push({ ...findedElement, count: 1 });
          
        }
        setStorage('products', basketArr)
        ListBasket();
      });
    }
  }



 
  }
});

