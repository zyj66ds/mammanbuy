
// 获取 数据 模板 渲染
$(function(){
    $.ajax({
        url: 'http://127.0.1.110:9090/api/getcategorytitle',
        dataType: 'json',
        success: function(info) {
            var htmlStr = template('category',info);
            $('.mm_categories').html(htmlStr);
        }
    })


    $('.mm_categories').on('click','caption',function() {
        var id = this.dataset.id;
        renderById(id);
        $(this).parent().toggleClass('current');
    })

    function renderById(id) {
        $.ajax({
            url: 'http://127.0.1.110:9090/api/getcategory',
            dataType: 'json',
            data: {titleid:id},
            success: function(info) {
                // console.log(info);
                var htmlStr = template('list',info);
                $('td').html(htmlStr)
            }
        })
    }



})
