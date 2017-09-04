$(function(){
    $('#index_header .a_right').click(function() {
        $('#details_information').css('display','block');
        $('.false').css('display','block');
        $('.index_list').css('display','block');
        $('#index_header p').html('店铺信息');
    });
    $('.false img').click(function() {
        $('#details_information').css('display','none');
        $('.false').css('display','none');
        $('.index_list').css('display','none');
        $('#index_header p').html('菲拓餐饮');
    });
    $('.list_total_left img').click(function(){
        $('.list_zz').css('display','block');
        $('.gwc').css('display','block');
    })

    // $('#index_footer .tab-item').each(function(i, e) {
    //     var tp=$(this).index()+1;
    //     $(e).click(function() {
    //         $(e).find('.tab-label').css('color','#fbd01f');
    //         $(e).siblings().find('.tab-label').css('color','#929292');
    //         $(e).find('img').attr('src', '../images/'+tp+'_y.png');
    //         $(e).siblings().find('img').attr('src', '../images/'+tp+'.png');
    //     });
    // });
})