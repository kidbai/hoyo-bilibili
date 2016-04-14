define(function (){
    var baseUrl = 'http://220.167.40.5/hooyoo';
　   return {
        registerUrl : baseUrl + '/loginRegister/register.do',
        loginUrl : baseUrl + '/loginRegister/login.do',
        videoUrl : baseUrl + '/indexContents.do',
        videoDetails : baseUrl + '/videoManage/videoInfo.do',
        upload : baseUrl + '/videoManage/uploadv2.do',
        follow : baseUrl + '/personalCenter/concern.do',
        videoList : baseUrl + '/personalCenter/videoList.do'
    };
});
