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

require(["jquery", "danmu", "router", "ejs", "jquery.unslider", "jquery.shCircleLoader", "sco.tooltip", "colpick", "jquery.danmu"], function($, DanmuPlayer){
});