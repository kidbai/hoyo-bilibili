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
            deps: ["jquery"]
        },
        "router": {
            deps: ["jquery", "ejs", "jquery.unslider"]
        }


    }
});

require(["jquery", "ejs", "router"], function($){
    $(function (){
        var user_status = sessionStorage.getItem('user_status')
        if(user_status === null || user_status === 'guest') {

        }
    });
});
