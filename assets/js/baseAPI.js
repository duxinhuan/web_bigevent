// 注意：每次调用$.get()或$.post()或$.ajax()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到给Ajax提供的配置对象

$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    options.url = "http://api-breakingnews-web.itheima.net"+options.url
})