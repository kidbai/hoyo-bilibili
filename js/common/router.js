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

        var url;
        // console.log(location.hash);

        //过滤掉:id
        var pos = location.hash.indexOf(":");
        if(pos != -1) {
            url = location.hash.slice(1, 8) + "id";
        }else {
            url = location.hash.slice(1) || 'home/';
        }

        // load 加载

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

            $("body").unbind("click");
            $("body").unbind("change");
            //过滤掉:id
            var pos = location.hash.indexOf(":");
            if(pos != -1) {
                url = location.hash.slice(1, 8) + "id";
            }else {
                url = location.hash.slice(1) || 'home/';
            }
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




// window.onhashchange = function () {
//     console.log(url);
//     console.log(path);
//     url = location.hash.slice(1) || 'home/';
//     if( url === path) {
//         callback && callback();
//     }
// }
