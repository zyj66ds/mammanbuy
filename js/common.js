// 封装了一个方法, 专门用于处理获取地址栏的传参
function getSearch( k ) {
    // 利用 location.search 获取地址栏参数
    var str = location.search;
  
    // 进行中文解码
    str = decodeURI( str );   //  ?name=pp&age=18&desc=帅
  
    // 去掉问号
    // start从哪开始, end到哪结束, 包括start, 不包括endl
    // 如果, end不传, 表示从 start 开始, 截取到最后
    // str.slice(start, end)
    str = str.slice( 1 );     //  name=pp&age=18&desc=帅
  
    // 根据 & 进行分割
    var arr = str.split("&");   // ["name=pp", "age=18", "desc=帅"]
  
    var obj = {};
  
    // 遍历数组, 获取键和值
    arr.forEach(function( v, i ) {    // v  "age=18"
      var key = v.split("=")[0]; // age
      var value = v.split("=")[1]; // 18
      obj[ key ] = value;
    });
  
    return obj[ k ];
  }