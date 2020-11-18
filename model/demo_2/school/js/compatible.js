/*浏览器兼容*/
var isIE8 = navigator.appVersion.indexOf("MSIE 8.0")>0;
var isIE9 = navigator.appVersion.indexOf("MSIE 9.0")>0;
/*悬浮导航栏*/
$(function(){
    var nav=$(".banner"); //得到导航对象
    var head=$(".head");
    var win=$(window); //得到窗口对象
    var sc=$(document);//得到document文档对象。
    if(isIE8){
        nav.addClass('banner_ie')
    }
    win.scroll(function(){
        if(sc.scrollTop()>=165){
            nav.addClass("banner_suspension");
            nav.removeClass('banner');
            head.addClass("head_sus"); 
            if(isIE8||isIE9){
                $(".banner_suspension").stop(true,false).animate({top:'0px'},'slow');     
            }else{
                $('.banner_suspension').css('top','0px');
                
                $('img').css('animation-play-state','running')
            }
        }else{
            if(isIE8||isIE9){
                $(".banner_suspension").stop(true,false).animate({top:'-50px'},'slow');     
            }else{
                $('.banner_suspension').css('top','-50px');
            }
            nav.removeClass("banner_suspension");
            nav.addClass('banner');
            head.removeClass("head_sus");
        }
        //加载动画
        var winH = win.height();
        var scrollH = win.scrollTop();    
        $('.load').each(function(){
            var domH=$(this).offset().top;
            if((domH-winH<scrollH)&&(domH>winH)){
                $(this).addClass('animated zoomIn')                
            }            
        })
    })  
})
/*导航栏渐隐动画*/
if(isIE8||isIE9){
    $('.nav_list_info').addClass('nav_list_info_ie');
    $('.nav_list').hover(function(){
        $(this).find('.nav_list_info').stop(true,true).fadeIn(200)
    },function(){
        $(this).find('.nav_list_info').stop(true,true).fadeOut(200)
    })
}

/*教师介绍IE8*/
if(isIE8){
    var txt=$('.exhibition_info_title_box');
    var info=$('.exhibition_info_detail');
    txt.addClass('exhibition_info_title_box_ie').removeClass('exhibition_info_title_box');
    info.addClass('exhibition_info_detail_ie');
}

