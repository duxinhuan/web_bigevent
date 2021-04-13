// 注意：每次调用$.get()或$.post()或$.ajax()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到给Ajax提供的配置对象

$.ajaxPrefilter(function (options) {
  // console.log(options.url);
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url

  // 给包含 "/my/" 的接口添加headers 因为只有验证token 才能使用该接口
  if (options.url.includes('/my/')) {
    options.headers = {
      // 获取登录时提交的 token
      Authorization: localStorage.token || '',
    }
  }
  // 不论成功还是失败，最终都会调用 complete 回调函数
  options.complete = function ({ responseJSON: { status, message } }) {
    //  console.log(res);
    // 对象解构
    //  const { status,message} = responseJSON
    // 在 complete 回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
    if (status === 1 && message === '身份认证失败！') {
      // 强制清空 token
      localStorage.removeItem('token')
      // 强制跳转到登录页面
      location.href = '/login.html'
    }
  }
})
