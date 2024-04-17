$(document).ready(function() {
    
    /*검색 포커싱*/
    $('.main_search .search_input > input').focus(function(e){
        $(this).parents('.main_search').addClass('focus');
    });
    $('.main_search .search_input > input').blur(function(e){
        $(this).parents('.main_search').removeClass('focus');
    });
    $(document).on('click','.main_search .close',function(){
        $(this).parents('.result_box').css('display','none');
    });
    /*탭메뉴*/ 
    $(document).on('click','.tab_group .list_btn > button',function(){
        var idx = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $(this).closest('.tab_group').find("> .content > .box:eq("+ idx +")").addClass('on').siblings().removeClass('on');
    });
    /*검색이력*/
    $(document).on('click','.modal .trigger_modal',function(){
        $(this).toggleClass('on');
        $(this).siblings('.btn_modal').toggleClass('on');
    });

    /*검색이력 > 닫기 버튼*/
    $(document).on('click','.record_list .list_box .inr .close_btn',function(){
        $(this).parents('.record_list').children("button").removeClass('on');
        $(this).parents('.list_box').removeClass('on');
    });

    /*우측 모달팝업*/ 
    $(document).on('click','.record_list > button',function(){
        $(this).toggleClass('on');
        $(this).siblings('.list_box').toggleClass('on');
    });

    /*팝업닫기*/ 
    $(document).on('click','.popup_content .btn_group .close',function(){
        $(this).parents('.p_footer').parents('.popup_content').css('display','none');
        $(this).parents('.popup_content').siblings('.dim').css('display','none');
    });
    /*화면 하단 팝업 닫기버튼 작동*/
    $(document).on('click','.s_alret > button',function(){
        $(this).parents('.s_alret').removeClass('on');
    });

    /*셀렉트박스 커스텀*/ 
    $(document).on('click','.select_box > button',function(){
        $(this).toggleClass('active');
        $(this).siblings('.option_list').toggleClass('active');
    });
    $(document).on('mouseleave','.select_box .option_list',function(){
        $(this).removeClass('active');
        $(this).siblings('button').removeClass('active');
    });
    $(document).on('focusout','.select_box .option_list li:last-child',function(){
        $(this).parent('.option_list').removeClass('active');
        $(this).parent('.option_list').siblings('button').removeClass('active');
    });
});