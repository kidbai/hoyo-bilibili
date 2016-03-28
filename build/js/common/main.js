//  js依赖
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
            deps: ["jquery", "jquery.danmu"]
        },
        "router": {
            deps: ["jquery", "ejs", "jquery.unslider", "jquery.shCircleLoader", "sco.tooltip", "colpick", "jquery.danmu", "danmu"]
        }


    }
});

require(["jquery", "ejs", "router"], function($){
    $(function (){
        //判断登陆状态
        var user_status = sessionStorage.getItem('user_status');
        var user_name = sessionStorage.getItem('user_name');
        console.log(user_status);
        var data = {};
        data['user_status'] = user_status;
        data['user_name'] = user_name;
        console.log(data);
        var html = new EJS({url: '../views/template/user-status.ejs'}).render(data);
        $("#login-status > *").remove();
        $("#login-status").html(html);
    });
});
