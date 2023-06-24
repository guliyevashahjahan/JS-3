$(function(){


$.get('https://fakestoreapi.com/products/categories',function(data,status){
    let li = ''
data.forEach(element => {
    li+= ` <li><a class="dropdown-item" href="#!">${element}</a></li>`
});
$('.category').html(li);


})
$.get('https://fakestoreapi.com/products',function(data,status){
 
let products ='';


data.forEach(element => {
    star = '';


    products+= `<div class="col mb-5">
    <div class="card h-100">
        <!-- Sale badge-->
        <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
        <!-- Product image-->
        <img class="card-img-top" src="${element.image}" alt="..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${element.title}</h5>
                <!-- Product reviews-->
                <div class="d-flex justify-content-center small text-warning mb-2 stars">
                   
                </div>
                <!-- Product price-->
                <span class="text-muted text-decoration-line-through">${element.price}</span>
                $18.00
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
        </div>
    </div>
</div>
`




let rate = Math.round(element.rating.rate);

for (let index = 0; index < rate; index++) {
    star+=`<div class="bi-star-fill"></div>`
   
    
}


});
$('.products').html(products)
$('.stars').html( star)

})

})