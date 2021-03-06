$(function () {
  var layer = layui.layer

  //点击按钮 实现退出功能
  $('#btnLogout').on('click', function () {
    // layer提示框  提示用户是否确认退出
    layer.confirm(
      '确定退出登录？',
      { icon: 6, title: '提示' },
      function (index) {
        // 1.清空本地存储的 token
        localStorage.removeItem('token')
        // 2.重新跳转到登录页面
        location.href = '/login.html'
        //关闭confirm询问框
        layer.close(index)
      }
    )
  })

  getUserInfo()
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers 就是请求头配置对象
    // headers: {
    //     // Authorization: localStorage.token
    //     Authorization:localStorage.getItem('token') || ""
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取用户信息失败')
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data)
    },
    // 不论成功还是失败，最终都会调用 complete 回调函数
    // 挂载到 baseAPI
    // complete: function ({responseJSON:{status,message}}) {
    //     // console.log(res);
    //     // 对象解构
    //     // const { status,message} = responseJSON
    //     // 在 complete 回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
    //     if(status === 1 && message === "身份认证失败！"){
    //         // 强制清空 token
    //         localStorage.removeItem('token')
    //         // 强制跳转到登录页面
    //     location.href = '/login.html'
    //     }
    // }
  })
}

// 渲染用户头像

function renderAvatar(user) {
  // 获取用户的名称
  var name = user.nickname || user.username
  // 设置欢迎的文本
  $('#welcome')
    .html('欢迎&nbsp;&nbsp' + name)
    .show()
  // 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide()
    const first = name.charAt(0).toUpperCase() //或者 直接 name[0]
    $('.text-avatar').html(first).show()
  }
}
