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
        "router": '../common/router',
        "ajaxUrl": "../common/ajaxUrl"
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
        },
    }
});

require(["jquery", "ajaxUrl", "ejs", "router"], function($, ajaxUrl){

    function loadNav(navStatus) {
        var url;
        switch (navStatus) {
            case "home/":
                    url = ajaxUrl.videoUrl;break;
            case "anime/":
                    url = ajaxUrl.videoUrl;break;
            case "music/":
                    url = ajaxUrl.videoUrl;break;
            case "ent/":
                    url = ajaxUrl.videoUrl;break;
            case "tech/":
                    url = ajaxUrl.videoUrl;break;
            case "movies/":
                    url = ajaxUrl.videoUrl;break;
            case "other/":
                    url = ajaxUrl.videoUrl;break;
                            break;
            default:

        }
        $.ajax({
            url: ajaxUrl.videoUrl,
            type: 'GET',
            dataType: 'json',
        })
        .done(function(data) {
            console.log(data.small[0].id);
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



        //导航
        Router.route({
            path: ["home/", "anime/", "music/", "game/", "ent/", "tech/", "movies/", "other/"]}, function () {
                console.log(location.hash.slice(1));
                if(location.hash === ''){
                    location.hash = "#home/";
                }
                loadNav(location.hash.slice(1));
        });

        //注册
        Router.route({
            path: "reg/",}, function () {
                var data = {};
                var html = new EJS({url: '../views/template/reg.ejs'}).render(data);
                $("#area > div").remove();
                $("#area").html(html);

                $("body").on('click', "#reg-btn", function(event) {
                    var username = $("#username").val();
                    var nickname = $("#nickname").val();
                    var password = $("#password").val();
                    console.log(username);
                    console.log(nickname);
                    console.log(password);
                    console.log(ajaxUrl.registerUrl);
                    $.ajax({
                        url: ajaxUrl.registerUrl,
                        type: 'post',
                        dataType: 'json',
                        data: {username: username, nickname: nickname, password: password}
                    })
                    .done(function(data) {
                        console.log(data);
                        console.log(data.code);
                        if(data.code === "200"){
                            alert('注册成功,请登录');

                            window.location.hash = "#login/";
                        }
                        if(data.code === "500"){
                            alert('注册失败');
                        }
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });

                });


        });

        //登陆
        Router.route({
            path: "login/",}, function () {

                var data = {};
                var html = new EJS({url: '../views/template/login.ejs'}).render(data);
                $("#area > div").remove();
                $("#area").html(html);

                $("body").on('click', '.login-btn ', function(event) {
                    event.preventDefault();
                    var username = $("#username").val();
                    var password = $("#password").val();
                    $.ajax({
                        url: ajaxUrl.loginUrl,
                        type: 'post',
                        dataType: 'json',
                        data: {username: username, password: password}
                    })
                    .done(function(data) {
                        console.log("success");
                        console.log(data);
                        if(data.code === "200"){
                            console.log('login');
                            sessionStorage.setItem('user_status', 'host');
                            sessionStorage.setItem('user_name', data.data.nickname);
                            sessionStorage.setItem('user_id', data.data.id);
                            window.location.hash = "#home/";
                            window.location.reload();
                        }
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });
                });
        });

        //视频
        Router.route({
            path: "video/:id",}, function () {

                var id = location.hash.slice(location.hash.indexOf(":") + 1); //视频id
                console.log(id);
                $.ajax({
                    url: ajaxUrl.videoDetails,
                    type: 'GET',
                    dataType: 'json',
                    data: {videoId: id}
                })
                .done(function(data) {
                    console.log(data);
                    console.log("success");
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

                $("body").on('click', '.follow-btn', function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    var id = $(".up-name").data('id');
                    console.log('click');
                    $.ajax({
                        url: ajaxUrl.follow,
                        type: 'get',
                        dataType: 'json',
                        data: {id: id}
                    })
                    .done(function() {
                        console.log("success");
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });

                });


                // 收藏功能
                $("body").on('click', ".b-icon-show", function(event) {
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

        //个人中心
        Router.route({
            path: ["personal-center/", "personal-center/msg/", "personal-center/my-video/", "personal-center/follow/", "personal-center/collection/"]}, function () {
                var data = {};
                var html = new EJS({url: '../views/template/personal-center.ejs'}).render(data);
                $("#area > div").remove();
                $("#area").html(html);

                $("#username").text(sessionStorage.getItem('user_name'));

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
                    formData.append('file', $(this)[0].files[0]);
                    if($(this)[0].files[0].type.indexOf('video') == -1){
                        $(".v-name").text("上传格式不符合视频要求").addClass('error');
                    }else {
                        $(".v-name").text($(this)[0].files[0].name);
                    }
                });

                $("body").on('click', '.upload-btn .btn', function(event) {
                    event.preventDefault();
                    if($(".v-name").text().trim() === ''){
                        alert('请上传视频');
                        return false;
                    }
                    var v_name = $(".upload-name input").val();
                    if(v_name === ''){
                        alert('请输入视频名称');
                        return false;
                    }
                    formData.append('title', v_name);
                    $.ajax({
                        url: ajaxUrl.upload,
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
                        $.ajax({
                            url: ajaxUrl.videoList,
                            type: 'get',
                            dataType: 'json',
                        })
                        .done(function(data) {
                            console.log("success");
                        })
                        .fail(function() {
                            console.log("error");
                        })
                        .always(function() {
                            console.log("complete");
                        });

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


    });
});
