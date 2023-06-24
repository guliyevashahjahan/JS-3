$(function(){
    $('img').css({
        'width' : '200px',
        'margin' : '20px',
'cursor':'pointer'
    })
    $('img:odd ').css('float', 'right');
    $('img:even').css('float','left');


$('img').click(function(){
 let source =   $(this).attr('src');
 console.log(source)
 $('.bg').css({
    'display': 'block',
    'background-image' : `url('${source}')`
 })
})
 
$('.bg').click(function(){
$(this).css('display','none')
})


})