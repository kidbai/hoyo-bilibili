require.config({
    paths: {
        "ejs": '../template/ejs_production',
        "jquery": "../jquery/jquery.min",
        "jquery.unslider": '../jquery/unslider.min',
        "jquery.shCircleLoader": "../jquery/jquery.shCircleLoader",
        "sco.tooltip": "../jquery/sco.tooltip",
        "colpick": "../jquery/colpick",
        "jquery.danmu": "../jquery/jquery.danmu",
        "danmu": "../jquery/danmu",
        "router": '../common/router'
    },
    shim: {
        "jquery.unslider": {
            deps: ["jquery"]
        },
        "jquery.shCircleLoader": {
            deps: ["jquery"]
        },
        "sco.tooltip": {
            deps: ["jquery"]
        },
        "colpick": {
            deps: ["jquery"]
        },
        "jquery.danmu": {
            deps: ["jquery"]
        },
        "danmu": {
            deps: ["jquery"]
        },
        "router": {
            deps: ["jquery", "ejs", "jquery.unslider"]
        }


    }
});
//
// require.config({
//     paths: {
//         'require-config': './require-config',
//     }
// })

require(["jquery", "danmu", "router", "ejs", "jquery.unslider", "jquery.shCircleLoader", "sco.tooltip", "colpick", "jquery.danmu"], function($, DanmuPlayer){

    $(function (){

        // console.log(router.route);
        //注册路由

        //
        // $(".nav .menu li > a").on('click', function(event) {
        //     event.preventDefault();
        //     /* Act on the event */
        //     var url = $(this).attr('href');
        //     location.hash = url;
        //     console.log(location.hash);
        // });




        //
        // $.ajax({
        //     type: 'GET',
        //     url: '../../data.json',
        //     data: {},
        //     dataType: 'json',
        //     success: function (data) {
        //         console.log(data);
        //         // var html = new EJS({url: '../views/template/index.ejs'}).render(data);
        //         // console.log(html);
        //         // $("#area").html(html);
        //     }
        // });

        // $("#danmup").DanmuPlayer({
        //     src:"../src/level5.mp4",
        //     height: "480px", //区域的高度
        //     width: "800px" //区域的宽度
        //     ,urlToGetDanmu:"../src/query.php"
        //     ,urlToPostDanmu:"../src/stone.php"
        //   });
        //
        //   $("#danmup .danmu-div").danmu("addDanmu",[
        //     { "text":"这是滚动弹幕" ,color:"white",size:1,position:0,time:2}
        //     ,{ "text":"我是帽子绿" ,color:"green",size:1,position:0,time:3}
        //     ,{ "text":"哈哈哈啊哈" ,color:"black",size:1,position:0,time:10}
        //     ,{ "text":"这是顶部弹幕" ,color:"yellow" ,size:1,position:1,time:3}
        //     ,{ "text":"这是底部弹幕" , color:"red" ,size:1,position:2,time:9}
        //     ,{ "text":"大家好，我是伊藤橙" ,color:"orange",size:1,position:1,time:3}
        //
        //   ])
    });
});
