(function () {

    // 检测是否浏览器是否支持 onhashchange
    if ("onhashchange" in window) {
        console.log("The browser supports the hashchange event!");
    }else {
        console.error('not supports');
    }

    function Router() {}
    Router.prototype.route = function ( config , callback ) {
        var config = $.extend({
            path: null,
            // template: null
        }, config);

        // console.log(typeof(config.path));
        // console.log(config.path.length);
        // console.log(config.path);
        // console.log(config.path instanceof Array);

        if(config.path === null || config.template === null){
            console.error('path or template is undefined');
        }


        // load 加载
        var url = location.hash.slice(1) || 'home/';
        // console.log(url);
        if(config.path instanceof Array){
            for (var i in config.path) {
                if(config.path[i] === url){
                    callback && callback();
                    console.log('callback')
                }
            }
        }else if ( url == config.path ) {
            callback&&callback();
        }
        // hash变化时的处理
        window.addEventListener('hashchange', function () {
            console.log(location.hash);
            url = location.hash.slice(1) || 'home/';
            if(config.path instanceof Array){
                for (var i in config.path) {
                    if(config.path[i] === url){
                        callback && callback();
                        console.log('callback')
                    }
                }
            }else if ( url == config.path ) {
                callback&&callback();
                console.log('callback')
            }
        }, false);


    };

    window.Router = new Router();
})();

Router.route({
    path: ["home/", "anime/", "music/", "game/", "ent/", "tech/", "movies/", "other/"]}, function () {
        console.log(location.hash.slice(1));
        var data = {};
        var html = new EJS({url: '../views/template/index.ejs'}).render(data);
        $("#area > div").remove();
        $("#area").html(html);
        $('.banner').unslider({
            speed: 500,               //  The speed to animate each slide (in milliseconds)
        	delay: 3000,              //  The delay between slide animations (in milliseconds)
            autoplay: true,
            arrows: {
                prev: '<a class="unslider-arrow prev"><</a>',
                next: '<a class="unslider-arrow next">></a>',
            }
        });
});

Router.route({
    path: "login/",}, function () {
        var data = {};
        var html = new EJS({url: '../views/template/login.ejs'}).render(data);
        $("#area > div").remove();
        $("#area").html(html);
});

Router.route({
    path: "reg/",}, function () {
        var data = {};
        var html = new EJS({url: '../views/template/reg.ejs'}).render(data);
        $("#area > div").remove();
        $("#area").html(html);
});

Router.route({
    path: ["personal-center/", "personal-center/msg/", "personal-center/my-video/"]}, function () {
        var data = {};
        var html = new EJS({url: '../views/template/personal-center.ejs'}).render(data);
        $("#area > div").remove();
        $("#area").html(html);


        $.each($(".user-nav > a"), function(index, el) {
            $el = $(el);
            if($el.attr('href') === location.hash){
                console.log($el);
                $el.addClass('active');
            }
        });

        //根据hash加载子界面
        switch (location.hash.slice(1)) {
            case "personal-center/":
                var data = {};
                var html = new EJS({url: '../views/template/my-video.ejs'}).render(data);
                $("#user-status > div").remove();
                $("#user-status").html(html);
                break;
            case "personal-center/my-video/":
                var data = {};
                var html = new EJS({url: '../views/template/my-video.ejs'}).render(data);
                $("#user-status > div").remove();
                $("#user-status").html(html);
                break;
            case "personal-center/msg/":
                var data = {};
                var html = new EJS({url: '../views/template/msg.ejs'}).render(data);
                $("#user-status > div").remove();
                $("#user-status").html(html);
                break;
            default:

        }

        $(".user-nav > a").on('click', function(event) {
        });
});

// window.onhashchange = function () {
//     console.log(url);
//     console.log(path);
//     url = location.hash.slice(1) || 'home/';
//     if( url === path) {
//         callback && callback();
//     }
// }
