define(function (){
    var baseUrl = 'http://222.210.113.118/hooyoo';
　   return {
        registerUrl : baseUrl + '/loginRegister/register.do',
        loginUrl : baseUrl + '/loginRegister/login.do',
        videoUrl : baseUrl + '/indexContents.do',
        videoDetails : baseUrl + '/videoManage/videoInfo.do',
        upload : baseUrl + '/videoManage/uploadv2.do',
        follow : baseUrl + '/personalCenter/concern.do',
        unfollow : baseUrl + '/personalCenter/noconcern.do',
        videoList : baseUrl + '/personalCenter/videoList.do',
        msgList : baseUrl + '/personalCenter/notification.do',
        collection : baseUrl + '/personalCenter/stars.do',
        followList : baseUrl + '/personalCenter/followee.do'
    };
});
