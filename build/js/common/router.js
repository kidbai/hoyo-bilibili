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

function loadNav(navStatus) {
    var url;
    switch (navStatus) {
        case "home/":
                url = "../../home.json";break;
        case "anime/":
                url = "../../anime.json";break;
        case "music/":
                url = "../../music.json";break;
        case "ent/":
                url = "../../ent.json";break;
        case "tech/":
                url = "../../tech.json";break;
        case "movies/":
                url = "../../movies.json";break;
        case "other/":
                url = "../../other.json";break;
                        break;
        default:

    }
    $.ajax({
        url: '../../home.json',
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data) {
        console.log(data);
        console.log(data.total[0].content[0].id);
        console.log("success");
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
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}

//导航
Router.route({
    path: ["home/", "anime/", "music/", "game/", "ent/", "tech/", "movies/", "other/"]}, function () {
        console.log(location.hash.slice(1));
        if(location.hash === ''){
            location.hash = "#home/";
        }
        loadNav(location.hash.slice(1));
});

//登陆
Router.route({
    path: "login/",}, function () {
        var data = {};
        var html = new EJS({url: '../views/template/login.ejs'}).render(data);
        $("#area > div").remove();
        $("#area").html(html);
});

//注册
Router.route({
    path: "reg/",}, function () {
        var data = {};
        var html = new EJS({url: '../views/template/reg.ejs'}).render(data);
        $("#area > div").remove();
        $("#area").html(html);
});

//个人中心
Router.route({
    path: ["personal-center/", "personal-center/msg/", "personal-center/my-video/", "personal-center/follow/", "personal-center/collection/"]}, function () {
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
        if(location.hash.slice(1) == 'personal-center/'){
                $(".user-nav > a").eq(0).addClass('active');
        }

        var formData = new FormData();

        $('body').on('change', '.upload input[type="file"]', function(event) {
            event.preventDefault();
            /* Act on the event */
            formData.append('v_file', $(this)[0].files[0]);
            if($(this)[0].files[0].type.indexOf('video') == -1){
                $(".v-name").text("上传格式不符合视频要求").addClass('error');
            }else {
                $(".v-name").text($(this)[0].files[0].name);
            }
        });

        $("body").on('click', '.upload-btn .btn', function(event) {
            event.preventDefault();
            var v_name = $(".upload-name input").val();
            formData.append('v_name', v_name);
            $.ajax({
                url: 'upload',
                type: 'post',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
            })
            .done(function(data) {
                console.log(data);
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

        });

        //修改头像
        $("body").on('change', '.avatar input[type="file"]', function(event) {
            var formData = new FormData();
            formData.append('avatar', $(this)[0].files[0]);
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
            case "personal-center/follow/":
                var data = {};
                var html = new EJS({url: '../views/template/follow.ejs'}).render(data);
                $("#user-status > div").remove();
                $("#user-status").html(html);
                break;
            case "personal-center/collection/":
                var data = {};
                var html = new EJS({url: '../views/template/collection.ejs'}).render(data);
                $("#user-status > div").remove();
                $("#user-status").html(html);
                break;
            default:

        }

        $(".user-nav > a").on('click', function(event) {
        });
});

//视频
Router.route({
    path: "video/:id",}, function () {
        var id = location.hash.slice(location.hash.indexOf(":") + 1); //视频id
        console.log(id);
        $.ajax({
            url: '../../video.json',
            type: 'POST',
            dataType: 'json',
            data: {id: id}
        })
        .done(function(data) {
            console.log(data);
            console.log("success");
            var data = {};
            var html = new EJS({url: '../views/template/video.ejs'}).render(data);
            $("#area > div").remove();
            $("#area").html(html);
            // 加载视频
            $("#danmup").DanmuPlayer({
                src:"../src/level5.mp4",
                height: "480px", //区域的高度
                width: "800px" //区域的宽度
                ,urlToPostDanmu:"../src/stone.php" //发送弹幕请求
            });

            //加载弹幕
            $("#danmup .danmu-div").danmu("addDanmu",[
                { "text":"这是滚动弹幕" ,color:"white",size:1,position:0,time:2}
                ,{ "text":"我是帽子绿" ,color:"green",size:1,position:0,time:3}
                ,{ "text":"哈哈哈啊哈" ,color:"black",size:1,position:0,time:10}
                ,{ "text":"这是顶部弹幕" ,color:"yellow" ,size:1,position:1,time:3}
                ,{ "text":"这是底部弹幕" , color:"red" ,size:1,position:2,time:9}
                ,{ "text":"大家好，我是伊藤橙" ,color:"orange",size:1,position:1,time:3}

            ])
            $("#danmup").attr("data_id", id);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });



        // 收藏功能
        $(".b-icon-show").on('click', function(event) {
            event.preventDefault();
            /* Act on the event */
            if($(this).hasClass('active')){
                // 取消收藏
                $(this).removeClass('active');
            }else {
                // 收藏
                $(this).addClass('active');
            }

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
