/**
 * 2019/1/14
 *  */

function ajax(option){
    // 判断传参与否  并且 是否为对象
    if ( !(option && typeof option === 'object') ){
        return;
    }
    var url = option.url;
    // 判断是否传入了请求地址, 若无 就没必要执行下一步
    if ( !url ) {
        return;
    }
    var type = option.type === 'post' ? 'post' : 'get';
    // 如果 type默认get
    // type = type === 'post' ? 'post' : 'get';
    var data = option.data || {};
    // 是否异步  默认是true     (传入是true 或 这 不传 两种情况)
    var async = option.async == false ? false : true;
    
    var xhr = new XMLHttpRequest();
    
    // 要把 data 这个对象, 拼接成键值对的字符串
    // 遍历对象 
    var arr = [];
    for ( var k in data ){
        arr.push( k + '=' + data[k] );
    } 
    
    // console.log (arr);
    data = arr.join('&');
    
    // 设置请求行
    if ( type === 'get' ){
        url += '?' + data;
        data = null;
    }
    xhr.open( type, url, async );

    // 设置请求头 
    if ( type === 'post' ){
        xhr.setRequestHeader( 'content-type', 'application/x-www-form-urlencoded' );
    }
    // 设置请求主体并且发送数据
    xhr.send(data);

    xhr.onreadystatechange = function(){
        if( xhr.readyState == 4 ){
            if ( xhr.status == 200 ){
                if ( option.dataType === 'json' ){
                    var res = xhr .responseText;
                    res = JSON.parse ( res );
                }else if( option.dataType === 'xml' ){
                    var res = xhr.responseXML;
                }else{
                    var res = xhr.responseText;
                }

                option.success(res);
            }else{
                option.error();
            }
        }
    }
    
}


// 第一步 渲染 菜单
ajax({
        url : 'http://127.0.1.110:9090/api/getindexmenu',
        // data: {mz : 'zy', age : 24},
        type:'get',
        dataType: 'json',
        error: function() {
            alert('请求失败');
        },
        success: function( info ) {
            console.log( info );
            // 模板引擎渲染 
            // 1. 引包 2. 准备模板 3. 渲染数据
            var htmlStr = template('menuTpl',info);
            // console.log(htmlStr);
            var menu = document.querySelector('.mm_menu ul');
            // console.log(menu);
            menu.innerHTML = htmlStr;
            // 第二步 默认 展示2 行 点击'更多' 展示3行
            var more = menu.querySelectorAll('li')[7];
            // console.log(more);
            more.addEventListener('click',function(){
                // console.log(this.className);
                // console.log(this);
                // this.className = 'clearfix';
                if (menu.className == 'clearfix') {
                    // menu.className = 'clearfix' + ' '+'current';
                    menu.classList.add('current');
                }else {
                    menu.className = 'clearfix';
                }  
            });
        }
})


// 第二步 渲染 商品列表
ajax({
    url: 'http://127.0.1.110:9090/api/getmoneyctrl',
    dataType: 'json',
    success: function(info) {
        // console.log(info);
        // 模板引擎渲染
        var htmlStr = template('advTpl',info);
        var advertisement = document.querySelector('.mm_advertisement ul');
        // console.log(advertisement);
        advertisement.innerHTML = htmlStr;
        
    }
})


