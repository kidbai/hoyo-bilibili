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
        console.log(config.path instanceof Array);

        if(config.path === null || config.template === null){
            console.error('path or template is undefined');
        }


        // load 加载
        var url = location.hash.slice(1) || 'home/';
        // console.log(url);
        if(config.path instanceof Array){
            for (var i in config.path) {
                console.log(config.path[i]);
                if(config.path[i] === url){
                    callback && callback();
                }
            }
        }else if ( url == config.path ) {
            console.log('callback');
            callback&&callback();
        }
        // hash变化时的处理
        window.addEventListener('hashchange', function () {
            url = location.hash.slice(1) || 'home/';
            if(config.path instanceof Array){
                for (var i in config.path) {
                    console.log(config.path[i]);
                    if(config.path[i] === url){
                        callback && callback();
                    }
                }
            }else if ( url == config.path ) {
                console.log('callback');
                callback&&callback();
            }
        }, false);


    };

    window.Router = new Router();
})();

Router.route({
    path: ["home/", "anime/", "music/", "game/", "ent/", "tech/", "movies/", "other/"]}, function () {
    // this.Router.template();
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



// window.onhashchange = function () {
//     console.log(url);
//     console.log(path);
//     url = location.hash.slice(1) || 'home/';
//     if( url === path) {
//         callback && callback();
//     }
// }
