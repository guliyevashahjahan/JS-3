$(function(){


$.get('https://fakestoreapi.com/products/categories',function(data,status){
    let li = ''
data.forEach(element => {
    li+= ` <li><a class="dropdown-item" href="#!">${element}</a></li>`
});
$('.category').html(li);


})
$.get('https://fakestoreapi.com/products',function(data,status){
 
if(data!=null){
    $('.spinner').addClass('d-none');
}

let products ='';



data.forEach(element => {
 let   star = '';
let rate = Math.round(element.rating.rate);

for (let index = 0; index < rate; index++) {
    star+=`<div class="bi-star-fill"></div>`
   
    
}



    products+= `<div class="col mb-5">
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
            <div class="text-center"><button class="btn btn-outline-dark mt-auto add-to-cart">Add to cart</button></div>
        </div>
    </div>
</div>
`


});
$('.products').html(products)
})

$('.cart').click(function(){
    $('.shopping-cart').removeClass('d-none')
})
$('.close').click(function(){
    $('.shopping-cart').addClass('d-none')

})

$('.add-to-cart').click(function(){
    console.log('test');
})





})


