$(function(){
    var id = getSearch('productId');
    console.log(id);
    $.ajax({
        url: 'http://127.0.1.110:9090/api/getcategorybyid',
        dataType: 'json',
        data:{
            categoryid:id
        },
        success: function(info) {
            console.log(info)
            // var htmlStr = template('category',info);
            // $('.mm_categories').html(htmlStr);
        }
    })
})