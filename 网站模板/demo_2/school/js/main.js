var swiper1 = new Swiper('.swiper-container1',{
    autoplay : 5000,//自动滑动
    speed:2000,
    loop : true,//是否开启循环
    pagination : '.pagination',
    paginationClickable :true,
    calculateHeight :true,
    autoplayDisableOnInteraction : false,
    noSwiping : true
})

var swiper2 = new Swiper('.swiper-container2',{
    autoplay : 3200,//自动滑动
    speed:1500,
    loop : true,//是否开启循环
    slidesPerView : 3,
    calculateHeight :true,
    autoplayDisableOnInteraction : false,
    noSwiping : true
})

$('.news_btn_box .left').on('click', function(e){
    e.preventDefault()
    swiper2.swipePrev()
})
$('.news_btn_box .right').on('click', function(e){
    e.preventDefault()
    swiper2.swipeNext()
})

var swiper3 = new Swiper('.swiper-container3',{
    autoplay:3000,
    loop : true,//是否开启循环
    speed:1000,
    slidesPerView : 4,
    slidesPerGroup : 4,
    calculateHeight :true,
    autoplayDisableOnInteraction : false,
    noSwiping : true
})

$('.exhibition_info_left').off('click').on('click', function(e){
    e.preventDefault()
    swiper3.swipePrev()
    console.log(swiper3);
    console.log(swiper3.loop);
})
$('.exhibition_info_right').off('click').on('click', function(e){
    e.preventDefault()
    swiper3.swipeNext()
})

var swiper4 = new Swiper('.swiper-container4',{
    autoplay : 3000,//自动滑动
    loop : true,//是否开启循环
    calculateHeight :true,
    autoplayDisableOnInteraction : false,
    noSwiping : true
})

$('.people_info_left').off('click').on('click', function(e){
    e.preventDefault()
    swiper4.swipePrev()
})
$('.people_info_right').off('click').on('click', function(e){
    e.preventDefault()
    swiper4.swipeNext()
})

